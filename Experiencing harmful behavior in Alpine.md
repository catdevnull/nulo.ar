I'm a new contributor to aports/Alpine. Recently, [I took maintainership of `telegram-desktop` (and the related `tg_owt`)](https://gitlab.alpinelinux.org/alpine/aports/-/merge_requests/28864) after [upgrading it for a few versions](https://gitlab.alpinelinux.org/alpine/aports/-/merge_requests/27025) and generally improving the situation of the package by using some packaged dependencies instead of bundled ones.

The MR for the change of maintainership also contained many changes to the APKBUILD with the help of psykose and mps. Along with it, I added some comments that explained where dependencies were taken from, which were bundled with the package, which were patched out, etc. This was in the hope of making it easier to check for new dependencies in newer releases. I also added a `TODO` comment [as suggested by CODINGSTYLE.md](https://gitlab.alpinelinux.org/alpine/aports/-/blob/4cded765f8b08139a36a01cdf327776571ced825/CODINGSTYLE.md#todo-comments) stating the need to eventually upgrade the package to Qt6.

Because of this, I had a conflict with mps.

I'm writing this post to have it documented publicly in the hopes that it doesn't happen again and if it does, that it can be pointed to this to show it's not a first occurrence. These types of abuse are usually lost in IRC logs and mailing list archives.

Before merging the MR, mps asked me in #alpine-devel to remove comments. I disagreed, saying that the comments were there for a good reason (this is pretty long):

<details>
<summary>IRC Log</summary>

```
2021-12-30 15:43:34 <mps> Nulo: MR is ok but please remove so much not needed comments from APKBUILD, those which are needed add to git commit msg
2021-12-30 15:44:12 <Nulo> mps, which comments do you find are not needed?
2021-12-30 15:44:41 <mps> mentioning qt6
2021-12-30 15:45:00 <Nulo> I wanted to leave info about why each dependency is bundled or not and how to easily check for new dependencies according to the wiki page (because upstream doesn't like mentioning new dependencies in changelogs)
2021-12-30 15:45:01 <psykose> qt6 comment is fine
2021-12-30 15:45:43 <Nulo> It's just one line :') and it's a TODO, I tried to follow CODINGSTYLE.md
2021-12-30 15:45:44 <mps> psykose: why it can't be fine in commit msg
2021-12-30 15:45:57 <psykose> because when someone opens the apkbuild they don't see the commit messages
2021-12-30 15:46:16 <mps> so git log is complicated
2021-12-30 15:46:32 <psykose> idk about you but i don't have the time to read the 30 prior commits of every package i touch
2021-12-30 15:46:45 <psykose> a todo: in the apkbuild is extremely clear on the other hand
2021-12-30 15:46:47 <mps> then you should
2021-12-30 15:47:36 <mps> if someone doesn't have time then s/he shouldn't work on pkg
2021-12-30 15:47:46 <psykose> it is literally the same thing but takes more time to find
2021-12-30 15:47:53 <psykose> and is more likely to be missed
2021-12-30 15:47:56 <Nulo> To be clear, I added comments because it's the sort of info I wished I had when I started "maintaining" the package. "Why is Qt6 not enabled? Should it be enabled?" (actually, that was my change, but I couldn't understand why Void had done it)
2021-12-30 15:48:02 <psykose> for absolutely no benefit aside from... saving 1 line in a 100 line file
2021-12-30 15:48:03 <psykose> get real
2021-12-30 15:48:09 <ikke> I typically put information both in comments and in the commit message
2021-12-30 15:48:46 <mps> every character saved is worth thing
2021-12-30 15:48:48 <Hello71> commit messages should be used for information that was relevant at the time, but is likely to expire soon. comments should be used for information which is likely to remain relevant
2021-12-30 15:49:11 <Hello71> "upgrade to 3.5.0" is not relevant for future readers to know
2021-12-30 15:49:24 <mps> Hello71: meh
2021-12-30 15:49:35 <mps> I disagree
2021-12-30 15:50:29 <mps> git log is invented to keep history, look at kernel git log, and I'm sure you did a lot of times
2021-12-30 15:50:40 <ikke> How often do you read all commits affecting an APKBUILD to figure out all the contexT?
2021-12-30 15:50:49 <Hello71> so in your opinion, code should never have any comments?
2021-12-30 15:51:00 <mps> ikke: often
2021-12-30 15:51:26 <psykose> Nulo: you may also now make it minsizerel
2021-12-30 15:51:41 <mps> and if I don't understand something than I use 'git log -p' always
2021-12-30 15:52:07 <ikke> But what if the comment was right there, explaining it?
2021-12-30 15:52:07 <mps> Hello71: I'm not against all comments
2021-12-30 15:52:20 <Hello71> for some projects, there is arguably reason to keep information in commits rather than source tree to save space for users who only need latest version. for aports i think this doesn't really apply
2021-12-30 15:52:42 <ikke> To me they are not mutually exclusive
2021-12-30 15:53:14 <mps> ok, I give up, do whatever you want
2021-12-30 15:53:31 <Nulo> psykose, done
2021-12-30 15:54:31 <mps> and enjoy mess
2021-12-30 15:55:22 <Nulo> psykose, https://gitlab.alpinelinux.org/Nulo/aports/-/jobs/579660#L55 lint complains about MinSizeRel, normal?
2021-12-30 15:55:34 <psykose> yeah, it will go away after atools gets a bump/container refresh
2021-12-30 15:55:36 <psykose> but it is changed
2021-12-30 15:55:56 <mps> Hello71: btw, I'm sure you meet long numbers of code where comment and code don't 'agree'
2021-12-30 15:58:18 <mps> Nulo: I removed hold label from telegram-desktop
2021-12-30 15:58:36 <Nulo> Thanks
2021-12-30 16:25:37 <Nulo> Who is "in charge" of merging this now that it has no maintainer? https://gitlab.alpinelinux.org/alpine/aports/-/merge_requests/28864
2021-12-30 16:26:10 <psykose> people with merge access
2021-12-30 16:26:18 <psykose> maintainers can't merge normally either
2021-12-30 16:26:45 <Nulo> Well, of approving it I guess
2021-12-30 16:26:51 <psykose> doesn't have to be
2021-12-30 16:27:07 <psykose> and you are the maintainer
2021-12-30 16:28:57 <PJ[m]> +1 for comments instead of commit messages, i hate deep diving git log to find context which could be done as simple comment
2021-12-30 16:51:31 <dalias> i prefer commit messages over comments because.. (1) temporal locality, to the *change* not the code. they're describing the reason for changing what is done or how it's done, and are missing context when you don't see them alongside the change
2021-12-30 16:52:38 <dalias> (2) bitrot. often when making changes, a comment that no longer applies (and that might even be misleading) is overlooked and left in place. this can't happen if it's instead attached to the immutable change it was associated with
2021-12-30 16:54:07 <dalias> (3) clutter from exaggerated impression of relevance/importance when making the change
2021-12-30 16:54:25 <dalias> and reading git log isn't a "deep dive", it's a trivial one-line command
2021-12-30 16:54:30 <psykose> i don't disagree with any of this, but the context was a TODO comment
2021-12-30 16:54:42 <psykose> of which there are 4 mentions in the musl history, and 22 in the tree
2021-12-30 16:59:50 <dalias> :)
2021-12-30 17:04:15 <Ariadne> i only use code comments for situations where i expect somebody (multiple somebodies) are going to ask about something weird
2021-12-30 17:13:00 <skarnet> code comments are for voodoo parts that aren't self-explaining
2021-12-30 17:13:11 <skarnet> (self-explanatory? English is hard.)
2021-12-30 17:56:21 <mps> nice to see that some smart people agree with me :)
2021-12-30 17:57:19 <mps> Nulo: I will merge it this time but please be more receptive what smart people say next time ;)
2021-12-30 17:58:06 <Nulo> I very much believe that Qt6 it's a voodoo part that isn't self-explanatory; but I wasn't explaining anything, I made a TODO
2021-12-30 17:58:14 <mps> Nulo: whatever we say you did a good work
2021-12-30 17:58:16 <psykose> if you think everyone that disagrees with you is a moron you are free to close the merge requests as well
2021-12-30 17:58:19 <Nulo> The other comments explain why some dependencies are bundled, etc
2021-12-30 17:58:51 <Nulo> mps, thanks <3 also huge thanks to psykose and someone else which I forgot
2021-12-30 17:59:40 <mps> psykose: yes, I have rights to do this but I don't think _everyone_ is moron, we just disagrees I think
2021-12-30 18:00:51 <mps> psykose: I prefer consistent state of alpine and I will fight for it to much higher degree
```

</details>

To me, I thought it was fine to leave the comments as many users agreed, and in the end mps was who merged the MR. However, hours later, mps deleted the comments he didn't like in an [unrelated commit](https://gitlab.alpinelinux.org/alpine/aports/-/commit/fa3e9621791ce3a36ee8b2dd463f884c7ff62be4) (fixing riscv64 builds, for which I am thankful for.) psykose pointed it out in the room:

<details id="tsc-log">
<summary>IRC Log</summary>

```
2021-12-30 22:54:59 <psykose> bypassing the maintainer to delete some todo comments is also quite poor form
snip
2021-12-30 23:08:45 <mps> psykose: ask TSC to remove me from alpine, you will make me a favor because this will save me some time and nerves
snip
2021-12-31 00:58:45 <Nulo> mps, can you *please* not bypass me just to remove some comments which you said you "gave up" on
2021-12-31 00:59:12 <Nulo> _why_ https://gitlab.alpinelinux.org/alpine/aports/-/commit/fa3e9621791ce3a36ee8b2dd463f884c7ff62be4
2021-12-31 01:08:17 <Nulo> Thank you for fixing riscv64 BTW
snip
2021-12-31 08:54:40 <mps> Nulo: there are more but please read backlog
snip
2021-12-31 12:52:05 <Nulo> mps, I believe I've read the backlog, what did I miss?
2021-12-31 12:56:55 <Nulo> I don't want to remove you TSC, especially because I have no power to do that. I want to solve this situation without stepping on each other
2021-12-31 12:57:52 <Nulo> When you proposed to remove the comments, I (and other folks) generally disagreed. Instead of accepting that, you merged my changes and then removed them in an unrelated commit, I guess in hope that I wouldn't notice 
2021-12-31 13:17:51 <mps> Nulo: do you really-really think comment '# disable jemalloc' belong to APKBUILD
2021-12-31 13:19:47 <Nulo> It is relevant because the list of dependencies (the wiki page link which you deleted) had jemalloc as a dependency, but we are patching it out instead. It provides an explanation as of to why that dependency wasn't in the list.
2021-12-31 13:23:36 <mps> git commit msg servers this
2021-12-31 13:36:47 <mps> Nulo: you should follow alpine best practice and not introduce 'featurism' from other distros
2021-12-31 13:37:13 <Nulo> mps, ?
2021-12-31 13:37:15 <mps> and not only you but also other newcomers to alpine
2021-12-31 13:38:42 <Nulo> What is featurism?
2021-12-31 13:38:50 <valerius> when you try to become Debian
2021-12-31 13:39:49 <Nulo> AFAIK I'm following best practices according to CODINGSTYLE.md and the only other distro I have ever contributed to was Void
2021-12-31 13:39:54 <mps> or windows/macos even ;)
2021-12-31 13:40:25 <orbea> comments, the slipperly slope to windows....
2021-12-31 13:41:38 <valerius> some people buy the Escalade and want all the fancy features for that one trip they might or might not take one day, meanwhile they overpay for gas the entire time they own it
2021-12-31 13:41:43 <valerius> the same people choose a heavy distro
2021-12-31 13:42:36 <valerius> meanwhile, practical people choose things that do what needs to be done and nothing else
2021-12-31 13:43:02 <Nulo> We are talking about... code comments, no?
2021-12-31 13:43:14 <Nulo> To be specific, about 5 lines of comments
2021-12-31 13:43:26 <mps> Nulo: yes
2021-12-31 13:44:06 <ikke> It doesn't matter if the application wipes your harddrive, as long as there are no superfluous comments
2021-12-31 13:44:09 <mps> only important notes goes to APKBUILD comment
2021-12-31 13:45:53 <mps> and be assured that I will remove all superfluous things I see
2021-12-31 13:46:48 <skarnet> abuild is written in shell, so comments impede run-time performance!
2021-12-31 13:47:27 <mps> we made a BIG mistake with one of infra decision when accepted 'something' on which we agreed post mortem that was bad
2021-12-31 13:47:56 <skarnet> that's not what post mortem means, but I suppose you wrote it on purpose :P
2021-12-31 13:48:15 <mps> skarnet: good conclusion
2021-12-31 13:52:00 <Nulo> The wiki seems to link to no-longer-existent forums in the sidebar
2021-12-31 13:52:38 <mps> wiki should be removed as was forum long ago
2021-12-31 13:59:59 <Nulo> Whatever, I'm leaving this room for now. I don't want to deal with this bullshit
# I leave the room
2021-12-31 14:01:21 <mps> please don't use bad words here
snip
2021-12-31 14:11:03 <ikke> mps: Was it worth it to scare Nulo away?
snip
2021-12-31 14:11:48 <mps> ikke: I don't have answer, and my intention is not to 'scare' anyone
snip
2021-12-31 14:13:02 <mps> ikke: I just want alpine to be 'small, simple, secure'
2021-12-31 14:13:52 <mps> ikke: if these are not our 'goals' anymore I can stop
2021-12-31 14:14:41 <orbea> mps: to be frank you achvieved none of those with this
2021-12-31 14:14:48 <orbea> *achieved even
2021-12-31 14:15:18 <mps> orbea: yes, I know, you are right, but I still trying :)
2021-12-31 14:16:02 <mps> 'hope dies last'
```

</details>

Then, mps [upgraded the package](https://gitlab.alpinelinux.org/alpine/aports/-/commit/d8f83f325691d77f135f725a799f2afd5d7fd2da) even though I already had an [MR open](https://gitlab.alpinelinux.org/alpine/aports/-/merge_requests/29040) with the change. This is presumably because the MR also reintroduced the comments. It was also marked as a draft because I wanted to ask if it made sense to reintroduce the comments or not.

I was told that by Ariadne later on (see below) that I should assume that the upgrade was made in good faith, but I have no reason to believe that as mps hadn't touched the package in over a year (as far as I can tell), I had already sent an MR and he had told me a few days ago to specifically open an issue to upgrade a package to notify the maintainer instead of just sending an MR:

<details>
<summary>IRC Log</summary>

```
2021-12-25 14:50:23 <Nulo> Any reason 3.15 doesn't have foot 1.10.3 (as opposed to 1.10.1)? Should I send a patch?
2021-12-25 14:51:33 <ikke> It's up to the maintainer to make sure packages in stable releases are updated as well
2021-12-25 14:52:58 <Nulo> amk, come thru
# amk is the current maintainer of foot
2021-12-25 14:59:16 <Nulo> https://gitlab.alpinelinux.org/alpine/aports/-/merge_requests/28849 Is this fine? I cherrypicked commits from master
2021-12-25 15:00:49 <mps> do we backport packages to stable without reason (bug or secfix)
2021-12-25 15:01:10 <mps> ikke: ^
2021-12-25 15:03:27 <ikke> Mostly up to the maintainer. We don't refuse updates just because no one reported a bug (barring our general stable release policies)
2021-12-25 15:04:13 <mps> hmm, I disagree with 'policy'
2021-12-25 15:04:19 <Nulo> There is a reason, I'm stumbling upon a bug which has been fixed according to upstream (crashes)
2021-12-25 15:04:22 <mps> with this*
2021-12-25 15:04:57 <mps> Nulo: then you should create issue first and assign it to maintainer
2021-12-25 15:05:23 <ikke> mps: burocracy
2021-12-25 15:05:35 <mps> ikke: or chaos ;p
2021-12-25 15:06:00 <Nulo> Yeah I'm a bit confused as of to why I would need to do that. Maintainer already made those changes on edge, I'm just reapplying in 3.15
2021-12-25 15:07:00 <psykose> almost done going through the whole list of py3.10 stuff
2021-12-25 15:07:12 <mps> Nulo: I told above, backport to stable only if bug or security fixed, and in exceptional cases something really is needed
2021-12-25 15:07:34 <ikke> How about fixing bugs before users run into them?
2021-12-25 15:07:35 <psykose> those foot releases fixed some bugs
2021-12-25 15:08:01 <Nulo> I just said, it fixed some issues that I'm stumbling upon. Check the CHANGELOG: https://codeberg.org/dnkl/foot/src/branch/master/CHANGELOG.md#1-10-3
2021-12-25 15:08:15 <mps> that is not problem, maintainer should be first informed
2021-12-25 15:10:04 <Nulo> They are automatically informed by algitbot; https://gitlab.alpinelinux.org/alpine/aports/-/merge_requests/28849 has been assigned to the maintainer
2021-12-25 15:10:21 <mps> ikke: 'fixing bugs before users run into them?' are you dreaming :)
2021-12-25 15:13:14 <ikke> No, but upstream apparently already got bugreports and made new releases fixing them
2021-12-25 15:13:31 <ikke> Why should we by policy wait for users to report these bugs to us before we fix them?
2021-12-25 15:14:20 <omni> I don't get it either
2021-12-25 15:14:26 <mps> imo maintainer should be informed
2021-12-25 15:14:33 <ikke> Sure
2021-12-25 15:14:45 <ikke> but that does not necessarily have to happen by a separate issue
2021-12-25 15:15:34 <ikke> like Nulo said, maintainers already get notified when an MR is opened for their package
2021-12-25 15:15:44 <mps> well, I create MR and maintainer is auto assigned but s/he is offline for some time and you blindly merge it
2021-12-25 15:16:03 <omni> not blindly, I don't think
2021-12-25 15:16:16 <omni> a lot of packages are updated without involvment of the maintainer and if it wouldn't be like that many packages would be very outdated
2021-12-25 15:16:18 <mps> i see this as potential problem
```

</details>

I find this in the scope of the [Code of Conduct](https://alpinelinux.org/community/code-of-conduct.html), as it is pretty unwelcoming of my work to be constantly bypassed as a package maintainer while being told by the same person that maintainers should be aware of modifications made to their packages.

Because of this, I asked in #alpine-devel who was willing to act as a "neutral third-party" as that's what was stated in the CoC for conflict resolutions. mps was kind enough to give his opinion:

<details>
<summary>IRC Log</summary>

```
2022-01-01 20:23:20 <Nulo> I've sadly ended up in a conflict about Alpine. The CoC suggests to "work through the conflict using a neutral third party in a transparent manner", how would that work? Thanks
2022-01-01 20:23:55 <mps> use common sense
snip
2022-01-01 20:25:47 <mps> when I joined alpine I'm told by 'elders' to use common sense as best thing
```

</details>

Soon after that, Ariadne privately messaged me asking me about the situation. She first told me that I should report it to the Technical Steering Comittee, but I was told a few moments later that apparently mps "does not want to waste the TSC's time with [my] dispute." This is ironic as he [previously](#tsc-log) explicitly told psykose to report it to the TSC.
    
She then asked me if restoring the deleted comments would be an acceptable outcome. I said no, because the problem wasn't that mps removed some comments. The problem was that mps bypassed me as a maintainer twice, making changes which he was explicitly told not to. <mark>This is the kind of unwelcoming behavior that turns people away from free software communities</mark>. I was then told that there was no interest in kicking out mps from the project, and that she had spoken with mps for him to stop this behavior.
    
I for one don't believe that someone can change their behavior which they repeated many times can change it by being told not to one hour after they last did it. In fact, I don't think mps understood the problem at all:

```
2022-01-05 08:42:03 <mps> I don't dare to do NMU merge anymore, risking to be called by TSC :)
```

The problem wasn't the Non Maintainer Update, the problem was the intent behind it. And that wasn't the thing that caused me to report it, it was multiple occurrences of similar situations. Even then, [mps did it again](https://gitlab.alpinelinux.org/alpine/aports/-/commit/94bd1055a16156933ab982ad419b1f112b9347e3) updating the package to a pre-release version (telegram-desktop versioning scheme is weird) and acted offended in IRC afterwards:

<details>
<summary>IRC Log</summary>

```
2022-01-17 09:55:20 <mps> which if these lines 7 or 8 are maintainer comment here https://git.alpinelinux.org/aports/tree/community/telegram-desktop/APKBUILD#n7
2022-01-17 09:55:27 <mps> s/if/of/
2022-01-17 09:55:28 <alpine-meetbot> mps meant to say: which of these lines 7 or 8 are maintainer comment here https://git.alpinelinux.org/aports/tree/community/telegram-desktop/APKBUILD#n7
2022-01-17 09:56:01 <mps> I think I will be attacked again if I fix this ;)
2022-01-17 10:05:14 <Misthios> 2 version?
2022-01-17 10:07:10 <mps> or maintainer comment
2022-01-17 10:07:52 <mps> jk, ofc
2022-01-17 10:14:13 <psykose> that just looks like an oversight with two pkgvers
2022-01-17 10:14:37 <psykose> not sure why you are acting like a child again, but there is no issue with deleting an obviously duplicated pkgver
2022-01-17 10:14:48 <ikke> Probably badly resolved conflict 
2022-01-17 10:15:11 <psykose> yeah
2022-01-17 10:18:21 <mps> psykose: please be careful with your words
2022-01-17 10:20:08 <psykose> i am
2022-01-17 10:20:51 <mps> don't talk with me like this!
```

</details>

Yes, that was an an oversight of my part but also of mps (he merged my changes.) I had already noticed that and had fixed it locally, waiting for a new release of telegram-desktop to commit it.

My objective is not necessarily to kick mps out. I also understand that the TSC doesn't want this from happening; mps currently maintains 82 packages, and I'm sure he does much more in the project. My objective is, instead, to make sure Alpine is a community that welcomes contributions. To this end, I can only think that this means detecting problematic behavior as this one, and possibly kicking people out (or, at least, preventing it from happening.)

Just reading the logs and seeing what he did should make it clear that he's being an asshole. I hope it's clear that I'm acting in good faith. It's wild to me how the only way to make him stop bypassing me was to report this as a CoC misconduct, even though this happened publicly in front of OPs in #alpine-devel. Even though they answered and disagreed, they didn't stop mps from doing what he did, and speaking like he did.

Frankly, I don't want to end this on a bad note. I like Alpine as a project, and apart from mps, everyone has been nothing but nice. However, I don't feel that the response I got goes anywhere as the TSC aren't interested in making any change. That makes me uncomfortable.

-   [December 2021 #alpine-devel logs](https://irclogs.alpinelinux.org/%23alpine-devel-2021-12.log)
-   [January 2022 #alpine-devel logs](https://irclogs.alpinelinux.org/%23alpine-devel-2022-01.log)

