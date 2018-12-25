---
path: '/blog/naive-developer-and-a-slippery-bug'
title: Naive Developer and a Slippery Bug
date: '2017-11-04'
tags: ["git", "git-bisect", "debugging", "bug"]
---

![Plane](./plane.jpg)

There was a time when I looked at a ticket in Redmine described a truly esoteric bug. I had already spent almost a day to determine where the problem was and I had not a clue where to search for an answer. The problem was that bug was placed somewhere in my 36th thick commits length git branch. My colleague looked at my screen and when I briefly described him my problem and asked for his opinion his answer was plain and straight, “Just keep looking, you’ve missed something”.

I believe that this was that curious moment when being lazy can help you save decent amount of time.  

Right after a cup of coffee I got a simple idea – I should’ve tried to repeat the bug right before my first commit, in master branch. Sure thing there was no such a problem as the ticket described. My next step was to check the bug… in the middle of my branch – I wanted to use divide and conquer sorting algorithm.  If I could not find the bug in the middle of my branch, well then, it is shoulde’ve been somewhere between the previous and the last commits. Next step was to split suspected chunk of commits into two pieces and check the previous commit one more time. In no time I determined where my bug was hidden.

This is a simple and powerful algorithm with a great characteristic – it has logarithmic complexity, I remembered it because of amazing David Malan and his great CS50 course. Just to illustrate why that method is great for my task let’s take a look at this: If amount of commits would be, say, 72 then instead of approximately 6 steps for my 36 commits I would use only 7! Don’t forget to checkout [cs50](http://cs50.tv/) if you don’t know yet what it is – I promise you would never regret a minute spent on this course.

Finally, I was pleased with my discovery but I was also pretty sure that this method should’ve been commonly used by the community because it was so good and straightforward. And then I found `git bisect` command.

## Let’s make Git bisect

![Oranges](./oranges.png)

`git bisect` is an easy to use command, it works exactly how I described it above. The first thing you should do is to type `git bisect` startand `git bisect` bad, then checkout the commit where your bug is not detected, and type `git bisect` good. From this step all you need to do is to type `git bisect` good– if git would give you a commit where you could not catch your bug – and `git bisect` bad otherwise. Please [check out documentation](https://git-scm.com/docs/git-bisect) for the details and advanced usage and options.

## Keeping commits small and semantic

![Stickers](./stickers.png)

You may have already noticed that this tool is handy when you have large branches of code where you should track a bug and you have no idea where to start. This may happen if you work on a large project. But every greenfield project someday become brownfield and there are some self-discipline constraints that you should keep in mind when you start a project or create a fresh new branch.

A colleague of mine who I previously asked for help told me long time ago before our discussion that he used to create one large commit with his changes. After I solved this bug I could see clearly where this path could bring you to. If you choose to use large commits with lots of changes in your branch it would ultimately cause decreasing benefit of using `git bisect`. The more commits you create (and the more semantic their message and content would be) the more beneficial would be usage of `git bisect`. When `git bisect` will track down a commit with a bug for you – in case you developed a habit creating small commits with semantic messages and changes – you will spend much less effort to understand where the problem is. Actually, it won’t hurt if you would start reviewing your colleagues commits for semantic – if you together decided that something should be changed just use git rebase -i.

## Importance of inner company repositories

![Library](./library.png)

There is last thing that should be cared for – it is a protection of repositories dependence of all your previous builds. This one is obvious – if you couldn’t build your project you neither could check if bug is in provided by `git bisect` commit or not – your npm installer simply run into dependency which it cannot resolve. So rule of thumb is: give your tags bullet proof builds with untouchable repositories dependence for allowing `git bisect` to happen.

## Closing thoughts

This is all I have for you today, so I’ll underline a few takeaways in conclusion:
1. Try to create commits frequently, make them smaller, and keep their message and content as semantic as possible
2. Make sure that your builds are protected from npm install running into a dependency which it cannot resolve – ideally you should have private company repository
3. Enjoy your experience with `git bisect`
