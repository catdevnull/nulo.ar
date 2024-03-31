---
title: Optimizing SQLite for servers
url: https://archive.is/Xfjh6
tags:
  - sqlite
  - hosting
date: 2024-03-31
---

## TL;DR?

```
PRAGMA journal_mode = WAL;
PRAGMA busy_timeout = 5000;
PRAGMA synchronous = NORMAL;
PRAGMA cache_size = 1000000000;
PRAGMA foreign_keys = true;
PRAGMA temp_store = memory;
```
