---
author: tungfa
layout: post
image: "dash_is_not_affected_by_the_bitpay_copay_attack.jpg"
title: "Dash is not affected by the BitPay Copay attack"
original-author: obusco
original-link: https://www.reddit.com/r/dashpay/comments/a0ydmf/dash_is_not_affected_by_the_bitpay_copay_attack/
---

Good day everyone !


You might have seen the news on GitHub, Twitter, ZDNet, and various other places on the net.
The whole JavaScript ecosystem discovered an attack targeting BitPay's Copay product.In order to be sure the compromised package was included in Copay during the building phase, the attacker had to spread an ingenious, obfuscated and malicious code across the whole ecosystem.This malicious code was looking for a description of a package (bunch of code that works as libraries to enhance programmer's productivity) that had the specific message, "A Secure Bitcoin Wallet", and used that as a decryption key to unveil and execute the dormant code.


This matched two projects: Copay, and our first fork of copay created 2 years ago while Dash was studying the idea of using Copay as a foundation for DashPay. We did not pursue this idea further, and that project was never used.


The Dash Copay Beta that we worked on and released was not targeted and therefore won't manage to steal your funds.

​

Here is the exact naming thing that got everyone (including ZDNet at one point) confused:


- dash-copay is the name of the repository for the Dash version of Copay, this one is not at risk for different reason (pkg description, different dependencies,...)- copay-dash: Is the library that was also at risk, because it was a fork that we did not even bother to Dashify, so raw, that's it's more a tag of a specific version of Copay that a fork. This one, no one has used (except for bots and researchers that downloaded it in recent days).

​

So, what happened ?

I’ve been looking at it, thanks to a message from Bitpay.

I want to first say how grateful I am to BitPay; they were blazing fast in sharing with us this information, which allowed us to get in touch with ZDNet and clear all suspicions on Dash.

​

And secondly for all the foundations they paved, theses packages remain open-source which means that if you do not maintain them, they get outdated, with issues and vulnerabilities. And in this case, I think that the Bitcoin community would benefit from grouping together and starting a Patreon (or forking our governance system) to fund some devs to be able to keep everything up-to-date, to be able to verify the dependencies, and to be able to improve and reduce their dependencies.

​

So that should be cleared up: This attack targeted everyone, people from React, Vue, Nodemon, from the Node Security team or the Google Security team, experts in their domain also didn't notice it, because it’s finding a needle in a haystack.So clearly, it's not about BitPay, but it’s good warning for all of us to improve our package dependency strategy and review processes.

​

On the 20th of November, a CS Student found that a package included some strange code. He found a code that he couldn’t really understand, but that is known by most of the crypto community devs (JS).He immediately understood that it was malicious, but it took the community time to get the information, and given the control that the attacker had, we are lucky he didn’t or couldn’t remove the GitHub issue...No fault on that--as a Student, did you know who to contact when you found malicious JS code? (FYI to all CS students: https://nodejs.org/en/security/ is also to be used for third-party vulnerabilities)

​

This code, present in a minified file, but not in the regular file (the one people actually read), was trying to decipher an aes256 ciphered message that was first turned into a hexadecimal string. The decryption key is the npm_package_description, all packages have one, but Copay specifically has "A Secure Bitcoin Wallet". How did they find that? Well, by iterating all packages descriptions available (and there are a lot of them).

​

When you enter this passphrase, you then get the code that is injected. This injection as explained before, targets your private keys, requires another package to do that (bitcore-wallet-client), and will then send that information to either:

- A domain bought using crypto and a throwaway email address: copayapi.host (cost: 0.99$/yr..)- If it doesn’t resolve, to a direct static ip (111.90.151.134) which resolves to a Malaysian Transit Service.

​

Because Dash Copay does not use `bitcore-wallet-client`, and doesn’t have the same description, we were not targeted. The attacker has targeted Bitpay Copay implementation having bch / btc. They didn’t care at all about trying to target other implementations like Dash.

​

This is a good reminder for us that our decision to limit our dependencies is the right one. It doesn’t help our productivity, but it will benefit the security of our Javascript libraries.

​

So in the end, this attack specifically targeted the BitPay Copay App from 5.0.2 to 5.1.0.

