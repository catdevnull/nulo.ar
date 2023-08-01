Un CRDT es una estructura de datos que puede ser modificada y luego asincronicamente sincronizada sin conflictos (es un "Conflict-free replicated data type", tipos de datos replicados sin conflicto) ([Wikipedia](https://es.wikipedia.org/wiki/CRDT_(Tipos_de_datos_replicados_sin_conflicto))

- [You might not need a CRDT](https://driftingin.space/posts/you-might-not-need-a-crdt)

## Performance

- [I was wrong. CRDTs are the future](https://josephg.com/blog/crdts-are-the-future/)
  - [5000x faster CRDTs: An adventure in optimization](https://josephg.com/blog/crdts-go-brrr/) (a.k.a. CRDTs go brrr)

    > That silly academic paper I read all those years ago says some CRDTs and OT algorithms are slow. And everyone believed the paper, because it was Published Science. But the paper was wrong. As I've shown, we can make CRDTs fast. We can make them crazy fast if we get creative with our implementation strategies. With the right approach, we can make CRDTs so fast that we can compete with the performance of native strings. The performance numbers in that paper weren't just wrong. They were "a billionaire guessing a banana costs $1000" kind of wrong.


