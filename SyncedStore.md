## Gotchas

Sadly, SyncedStore has a ton of gotchas that, due to the nature of the types that it has, TypeScript can't catch.

### Array items don't exist after being removed

```js
let normalArray = [{ a: "a" }, { b: "b" }, { c: "c" }];
const item = normalArray[1]; // is {b:'b'}
normalArray.splice(2);
item; // is still {b:'b'}
```

while in SyncedStore land...

```js
const anormalArray = $store.array;
const item = anormalArray[1]; // is {b:'b'}
anormalArray.splice(2);
item; // is undefined :(
```
