Hay varios proyectos con el objetivo de hacer distribuciones de Android seguras. Algunas de ellas:

-   [GrapheneOS](https://grapheneos.org/): el OG. Solo soporta celulares Google Pixel (por temas de seguridad). Antes conocido como CopperheadOS (ese nombre [ahora es usado por otra gente mandafruta](https://grapheneos.org/history/copperheados)). No soporta MicroG pero si [Play Services sandboxeados](https://grapheneos.org/usage#sandboxed-google-play).
-   [DivestOS](https://divestos.org/): Soft fork de LineageOS. Trae muchas cosas de GrapheneOS. Soporta dispositivos que GrapheneOS y hasta LineageOS no soportan. Hace cosas interesantes para hacerlos "lo más seguro posible", como un [patcher de CVEs del kernel](https://gitlab.com/divested-mobile/cve_checker). No soporta MicroG (aunque tiene la opción al momento de compilar) ni Play Services.
-   [CalyxOS](https://calyxos.org/): Fork de GrapheneOS con muchas funcionalidades de seguridad removidas. Solo soporta Google Pixels y Xiaomi Redmi A2 ([betas para OnePlus nuevos y FairPhone 4](https://calyxos.org/news/2022/05/04/fp-op-may-update/)). Incluye MicroG opcional.

## Dump

-   [Plexus](https://plexus.techlore.tech/): Base de datos de aplicaciones que funcionan sin Play Services o con MicroG.
-   [Problemas con F-Droid según Daniel Micay](https://github.com/GrapheneOS/Camera/issues/227#issuecomment-1147386415)

## Conflictos actuales

CalyxOS (¿junto a MicroG?) está peleado con GrapheneOS ([hilo de Twitter de GrapheneOS](https://web.archive.org/web/20220430044111/https://twitter.com/GrapheneOS/status/1520193441770188810), [hilo de GitHub sobre la seguridad de MicroG con Daniel Micay (desarrollador de Graphene)](https://web.archive.org/web/20210808002006/https://github.com/microg/GmsCore/issues/1467)).

GrapheneOS acusa a CalyxOS de decir haber creado SeedVault (ver hilo de Twitter). No se que es verdad, [el primer commit](https://github.com/seedvault-app/seedvault/commits/android12?after=e26081fcfa61231b01ee80c102d61999e3ab03f3+629&branch=android12&qualified_name=refs%2Fheads%2Fandroid12) es de "Steve Soltys" que no veo directamente asociado a GrapheneOS ni a Calyx y [el mayor contribuidor](https://github.com/seedvault-app/seedvault/graphs/contributors) ("Torsten Grote") tampoco.

Hay mucho lore y drama, [este video de 53 minutos(!) habla más sobre este](https://vid.puffyan.us/watch?v=Dx7CZ-2Bajg) aparentemente desde la perspectiva de Calyx, pero no tengo ganas de verlo. Daniel Micay (strcat) conspira en que fue hecho junto a Calyx:

>```
>23:08 strcat[m] well, you folks at Calyx
>23:08 strcat[m] have participated in bullying and harassment of me
>23:08 strcat[m] including in collaboration with techlore
>23:08 strcat[m] and I will be publicly calling you out on that and your attempt at projecting what your community has been doing onto me
>23:09 strcat[m] your dishonest personal attack on me there
>23:09 strcat[m] kicking us out of the organization
>```

[logs](https://web.archive.org/web/20210403012439/https://freenode.logbot.info/AOSPAlliance/20201211)

Dump de links relacionados:
-   [What is the history of seedvault? Who created it? : r/PrivacyGuides](https://old.reddit.com/r/PrivacyGuides/comments/t8moav/what_is_the_history_of_seedvault_who_created_it/)
-   [More drama around GrapheneOS and CalyxOS - midwest.social](https://midwest.social/post/2467)
-   [replace AOSP keyboard with FlorisBoard when it has Direct Boot support and more baseline features · Issue #579 · GrapheneOS/os-issue-tracker · GitHub](https://github.com/GrapheneOS/os-issue-tracker/issues/579) - GrapheneOS no acepta (A)GPL
-   [Daniel Micay on Twitter: "Someone posting across platforms in threads that aren't even about GrapheneOS bringing up my name and claiming I'm crazy/delusional thinks that they're the victim because we archived it and posted a response in those threads. They're trying to turn it into some kind of drama now." / Twitter](https://mobile.twitter.com/DanielMicay/status/1520227741374812161)
-   [Daniel Micay on Twitter: "https://t.co/ZYbEFgDjsA People engaging in this are not somehow victims because they were banned from our community. Very strange to see them pretending as if they've been wronged by being banned for such highly abusive and underhanded behavior which has been ongoing for years." / Twitter](https://mobile.twitter.com/DanielMicay/status/1518262412482334722)
-   [Daniel Micay on Twitter: "Some developers create these issues on their own by not using separate app ids for different variants of their apps, but many are handling this properly and most don't have incompatible variants available. F-Droid is the elephant in the room making this a common real world issue." / Twitter](https://mobile.twitter.com/DanielMicay/status/1517191368338456581)
-   [Daniel Micay on Twitter: "Today they've been alternating between spreading libel, anti-semitic attacks and pretending to be a GrapheneOS user who needs help in an attempt to waste the time of our community members and developers who are very willing to spend substantial time helping people." / Twitter](https://mobile.twitter.com/DanielMicay/status/1511641020089479175)
