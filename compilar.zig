const std = @import("std");
const c = @cImport({
    @cInclude("cmark.h");
});
const endsWith = std.mem.endsWith;

fn stripExtension(file_name: []const u8) ![]const u8 {
    const index = std.mem.lastIndexOfLinear(u8, file_name, ".");
    if (index) |i| {
        return file_name[0..i];
    } else return error.NoExtension;
}

const HeaderOptions = struct {
    // Si esto es true, se muestra un botón para volver al index.
    ir_al_inicio: bool = true,
    // Si esto es true, se muestra un <header>.
    header: bool = true,
    // Si esto es true, se muestra un link a #conexiones en el header.
    has_connections: bool = false,
};
fn header(
    writer: std.fs.File.Writer,
    title: []const u8,
    src_name: []const u8,
    options: HeaderOptions,
) !void {
    // TODO: deshardcodear base_uri
    try writer.print(
        \\<!doctype html>
        \\<meta charset=utf-8>
        \\<meta name=viewport content="width=device-width, initial-scale=1.0">
        \\<meta name=author content=Nulo>
        \\<meta property=og:title content="{0s}">
        \\<meta property=og:type content=website>
        \\<meta property=og:url content="https://nulo.in/{1s}.html">
        \\<meta property=og:image content=cowboy.svg>
        \\<link rel=stylesheet href=drip.css>
        \\<link rel=icon href=cowboy.svg>
        \\<title>{0s}</title>
        \\
    , .{ title, src_name });
    // if test "$mirror" = true; then
    // 	echo "<p style=color:darkred>Ojo: este sitio es un espejo (mirror). <a href=https://nulo.in>nulo.in</a> es la fuente.</p>"
    // fi
    if (options.ir_al_inicio) {
        try writer.writeAll("<a href=.>☚ Volver al inicio</a>\n");
    }
    if (options.header) {
        try writer.print(
            \\<header>
            \\<h1>{s}</h1>
            \\<a href="https://gitea.nulo.in/Nulo/sitio/commits/branch/ANTIFASCISTA/{s}">Historial</a>
            \\
        , .{ title, src_name });
        if (options.has_connections) {
            try writer.print(
                \\/
                \\<a href="#conexiones">Conexiones</a>
            , .{});
        }
        try writer.print(
            \\</header>
            \\
        , .{});
    }
}

const Connection = struct {
    linker: []const u8,
    linked: []const u8,
    pub fn make(allocator: std.mem.Allocator, linker: []const u8, linked: []const u8) !Connection {
        return Connection{
            .linker = try allocator.dupe(u8, linker),
            .linked = try allocator.dupe(u8, linked),
        };
    }
};

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var connections = std.ArrayList(Connection).init(allocator);
    defer connections.deinit();
    defer for (connections.items) |connection| {
        allocator.free(connection.linker);
        allocator.free(connection.linked);
    };

    var page_list = std.ArrayList([]const u8).init(allocator);
    defer page_list.deinit();
    defer for (page_list.items) |item| allocator.free(item);

    var cwd = try std.fs.cwd().openDir(".", .{ .iterate = true });
    defer cwd.close();
    var cwd_iterator = cwd.iterate();

    var build_dir = try cwd.makeOpenPath("build", .{});
    defer build_dir.close();

    while (try cwd_iterator.next()) |entry| {
        if (entry.kind != .File) continue;
        if (endsWith(u8, entry.name, ".md"))
            try scanForConnections(allocator, cwd, &connections, entry.name);
    }

    cwd_iterator = cwd.iterate();

    while (try cwd_iterator.next()) |entry| {
        if (entry.kind != .File) continue;

        // Autocopiarnos :)
        if (endsWith(u8, entry.name, ".zig") or
            endsWith(u8, entry.name, ".md") or
            endsWith(u8, entry.name, ".css") or
            endsWith(u8, entry.name, ".png") or
            endsWith(u8, entry.name, ".jpg") or
            endsWith(u8, entry.name, ".mp4") or
            endsWith(u8, entry.name, ".svg") or
            endsWith(u8, entry.name, ".html"))
        {
            try cwd.copyFile(entry.name, build_dir, entry.name, .{});
        }

        if (endsWith(u8, entry.name, ".md") or endsWith(u8, entry.name, ".gen")) {
            try page_list.append(try allocator.dupe(u8, try stripExtension(entry.name)));
        }

        if (endsWith(u8, entry.name, ".md"))
            try generateMarkdown(allocator, cwd, entry.name, build_dir, connections);
        if (endsWith(u8, entry.name, ".gen"))
            try generateExecutable(allocator, cwd, entry.name, build_dir);
    }

    try generatePageList(allocator, build_dir, page_list.items);
}

const Writer = std.io.BufferedWriter(4096, std.fs.File.Writer).Writer;

fn scanForConnections(
    allocator: std.mem.Allocator,
    cwd: std.fs.Dir,
    connections: *std.ArrayList(Connection),
    file_name: []const u8,
) !void {
    var file = try cwd.openFile(file_name, .{});
    defer file.close();

    const name = try stripExtension(file_name);

    const markdown = try file.readToEndAllocOptions(
        allocator,
        69696969,
        null,
        @alignOf(u32),
        0,
    );
    defer allocator.free(markdown);
    var iter = std.mem.split(u8, markdown, "\n");

    while (iter.next()) |line| {
        var index: usize = 0;
        while (index < line.len) : (index += 1) {
            const rest = line[index..];

            if (std.mem.startsWith(u8, rest, "[[")) {
                if (std.mem.indexOf(u8, rest, "]]")) |end| {
                    const linked = rest[2..end];
                    index += 2 + linked.len + 2 - 1;
                    try connections.append(try Connection.make(allocator, name, linked));
                    continue;
                }
            }
        }
    }
}

fn hackilyTransformHtml(input: []const u8, writer: Writer) !void {
    var iter = std.mem.split(u8, input, "\n");
    while (iter.next()) |line| {
        var index: usize = 0;

        while (index < line.len) : (index += 1) {
            const rest = line[index..];

            const link_marker = "<a h";
            if (std.ascii.startsWithIgnoreCase(rest, link_marker)) {
                index += link_marker.len - 1;
                try writer.writeAll("<a rel='noopener noreferrer' h");
                continue;
            }

            if (std.mem.startsWith(u8, rest, "[[")) {
                if (std.mem.indexOf(u8, rest, "]]")) |end| {
                    const name = rest[2..end];
                    index += 2 + name.len + 2 - 1;
                    try writer.print(
                        \\<a href="{0s}.html">{0s}</a>
                    , .{name});
                    continue;
                }
            }

            try writer.writeByte(line[index]);
        }

        try writer.writeByte('\n');
    }
}

fn generateMarkdown(
    allocator: std.mem.Allocator,
    cwd: std.fs.Dir,
    src_name: []const u8,
    build_dir: std.fs.Dir,
    connections: std.ArrayList(Connection),
) !void {
    var file = try cwd.openFile(src_name, .{});
    defer file.close();
    const markdown = try file.readToEndAllocOptions(
        allocator,
        69696969,
        null,
        @alignOf(u32),
        0,
    );
    defer allocator.free(markdown);
    const html = c.cmark_markdown_to_html(
        markdown.ptr,
        markdown.len,
        c.CMARK_OPT_UNSAFE | c.CMARK_OPT_SMART,
    );
    defer std.c.free(html);

    const output_file_name = try std.fmt.allocPrint(
        allocator,
        "{s}.html",
        .{try stripExtension(src_name)},
    );
    defer allocator.free(output_file_name);

    const is_index = std.ascii.eqlIgnoreCase(src_name, "index.md");

    const title = if (is_index)
        "nulo.in"
    else
        try stripExtension(src_name);

    var connection_count: u16 = 0;
    for (connections.items) |connection| {
        if (std.mem.eql(u8, try stripExtension(src_name), connection.linked))
            connection_count += 1;
    }

    var output = try build_dir.createFile(output_file_name, .{});
    defer output.close();
    try header(output.writer(), title, src_name, .{
        .ir_al_inicio = !is_index,
        .header = !is_index,
        .has_connections = connection_count > 0,
    });
    var buffered_writer = std.io.bufferedWriter(output.writer());
    try hackilyTransformHtml(
        std.mem.span(html),
        buffered_writer.writer(),
    );

    if (connection_count > 0) {
        try buffered_writer.writer().print(
            \\<section id=conexiones>
            \\<h2>⥆ Conexiones ({})</h2>
            \\<ul>
        , .{connection_count});
        for (connections.items) |connection|
            if (std.mem.eql(u8, try stripExtension(src_name), connection.linked))
                try buffered_writer.writer().print(
                    \\<li><a href="{0s}.html">{0s}</a></li>
                , .{connection.linker});
        try buffered_writer.writer().print(
            \\</ul>
            \\</section>
        , .{});
    }
    try buffered_writer.flush();
}

fn generateExecutable(
    allocator: std.mem.Allocator,
    cwd: std.fs.Dir,
    src_name: []const u8,
    build_dir: std.fs.Dir,
) !void {
    _ = cwd;
    const output_file_name = try std.fmt.allocPrint(
        allocator,
        "{s}.html",
        .{try stripExtension(src_name)},
    );
    defer allocator.free(output_file_name);

    const title = try stripExtension(src_name);

    var output = try build_dir.createFile(output_file_name, .{});
    defer output.close();
    try header(output.writer(), title, src_name, .{});

    const executable_name = try std.fmt.allocPrint(allocator, "./{s}", .{src_name});
    defer allocator.free(executable_name);

    // const process = try std.ChildProcess.init(&.{executable_name}, allocator);
    // defer process.deinit();
    // process.stdout_behavior = .Ignore;
    // process.stdout = output;
    // const term = try process.spawnAndWait();
    const result = try std.ChildProcess.exec(.{
        .allocator = allocator,
        .argv = &.{executable_name},
    });
    defer allocator.free(result.stdout);
    defer allocator.free(result.stderr);
    if (result.stderr.len > 0) {
        std.log.err("{s} stderr: {s}", .{ src_name, result.stderr });
    }
    switch (result.term) {
        .Exited => |status| {
            if (status != 0) return error.ProcessFailed;
        },
        else => unreachable,
    }
    try output.writeAll(result.stdout);
}

fn generatePageList(
    allocator: std.mem.Allocator,
    build_dir: std.fs.Dir,
    page_list: []const []const u8,
) !void {
    _ = allocator;
    const name = "Lista de páginas";
    var output = try build_dir.createFile(name ++ ".html", .{});
    defer output.close();
    try header(output.writer(), name, "compilar.zig", .{});

    try output.writeAll("<ul>");
    for (page_list) |page| {
        try output.writer().print(
            \\<li><a href="{0s}.html">{0s}</a></li>
        , .{page});
    }
    try output.writeAll("</ul>");
}
