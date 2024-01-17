const { Raw } = require("eleventy-hast-jsx");
const { readFileSync } = require("fs");

/**
 * @param {{ active: 'home' | 'bookmarks' }} props
 */
exports.default = ({ active }) => (
  <nav class="max-w-2xl mx-auto">
    <ul class="flex flex-wrap gap-2 p-4">
      <li>
        <NavItem href="/" active={active === "home"}>
          inicio
        </NavItem>
      </li>
      <li>
        <NavItem href="/" active={active === "bookmarks"}>
          bookmarks
        </NavItem>
      </li>
    </ul>
    <Raw html={readFileSync("./src/_includes/buscador.html", "utf-8")} />
  </nav>
);

/**
 * @param {{ active: boolean, href: string, children: any }} props
 */
const NavItem = ({ active, href, children }) => {
  const defaultC = "block p-2";
  const classs = active ? "rounded bg-neutral-100" : "underline";
  return (
    <a href={href} class={`${defaultC} ${classs}`}>
      {children}
    </a>
  );
};
