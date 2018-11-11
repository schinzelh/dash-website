---
author: tungfa
layout: post
image: "v13-rc.jpg"
title: "Dash TestNet v13 is live, please join and update all TestNet Miners + Nodes"
original-author: Codablock
original-link: https://www.dash.org/forum/threads/v13-0-testing.41945/
---

Release candidate v0.13.0.0-rc1 is ready for testnet! :)

Github release candidate: [https://github.com/dashpay/dash/releases/tag/v0.13.0.0-rc1](https://github.com/dashpay/dash/releases/tag/v0.13.0.0-rc1)
Release notes are not ready yet and will be prepared in the next few days. Post will be updated.
Gitian sigs can be found here: [https://github.com/dashpay/gitian.sigs](https://github.com/dashpay/gitian.sigs)

Before testing:
Make sure you made a backup of you mainnet datadir somewhere or at least a backup of wallet.dat/dash.conf/masternode.conf;
Or use the -datadir and -conf parameters to use completely different directories.

As this release deploys DIP2/3/4, we'll have to ensure all existing and new functionality works as expected in multiple stages of the deployment. The stages of the deployment are as follows:

1. Full nodes, Masternodes and Miners upgrade their nodes to the latest release
2. Miners will start voting on the BIP9 deployment for DIP3, but only if they see enough MNs upgraded (this is automated)
3. After enough blocks with the proper BIP9 bits have been mined, DIP3 will activate but stay in "compatibility mode"
4. In this "compatibility mode", the existing non-deterministic masternodes should continue to work as expected
5. Now MNs can start registering their MNs as deterministic masternodes. Detailed instructions on how to do this will follow when the time arises.
6. Even the registered MNs will continue operating in the "compatibility mode" and will appear in "masternode list" as expected. InstantSend, PrivateSend, Governance, MN payment logic and so on should continue working as usual.
7. We will watch the progress of MNs upgrading to DIP3. When we see enough of these, we'll turn on spork15 (SPORK_15_DETERMINISTIC_MNS_ENABLED)
8. This is the point were all of us will be silent for a minute...as we say goodbye to all the non-deterministic masternodes. We'll see the output of "masternode list" immediately switch to the deterministic list (dropping all others). We'll also see the network go kind of silent, as all the bloat of masternode list synchronization disappears from the network...no more MNB, MNP, MNW, ... messages.

We are at stage 1. and I will update this line every time we move forward to the next stage.

We will have to perform full testing of all functionality in stages 1., 3. - 5. and 8. (so, 3 times in total). This includes:

What/how to test:
- Check if normal transactions are still working, perform some automated load testing if you want
- Check if creating and voting on proposals work. Also check if winning proposals get paid and other don't.
- There were improvements in PrivateSend, please test if mixing still works for you. It is very likely that mixing will not be working as expected in deployment stage 1. and 2.
- Check if InstantSend is still working (it might fail in the beginning as not enough MNs are available/upgraded atm)
- Starting with stage 3., test if automatic InstantSend locks for simple transactions are working as expected.
- Run a masternode or two, make sure it is paid. We're happy for everyone that also participates in the whole upgrade process from normal/old MNs to the deterministic MNs. Instructions on how to upgrade will follow when we reach stage 5.

What else you can do:
- Report serious issues (crashes/hangs/GUI glitches) : [https://github.com/dashpay/dash/issues/new](https://github.com/dashpay/dash/issues/new)

Testnet tools (explorers, faucets, pools): [https://www.dash.org/forum/threads/testnet-tools-resources.1768/](https://www.dash.org/forum/threads/testnet-tools-resources.1768/)

MNOs:
Wiki: [https://dashpay.atlassian.net/wiki/spaces/DOC/pages/118162190/Masternodes+under+testnet](https://dashpay.atlassian.net/wiki/spaces/DOC/pages/118162190/Masternodes+under+testnet)
Sentinel : [https://github.com/dashpay/sentinel/tree/develop](https://github.com/dashpay/sentinel/tree/develop)

DMT support for deterministic masternodes is currently still work-in-progress. Maybe @Bertrand256 can add some info/instructions when he is ready. Until then, users will have to manually sign the DIP3 messages with the collateral key on HW wallets. As said, detailed instructions will follow when we reach stage 5.

NOTE: Make sure you pulled Sentinel from &quot;develop&quot; branch and changed network to &quot;testnet&quot; in &quot;sentinel.conf&quot;. If you already have a mainnet masternode on the same server, do NOT run testnet masternode in the same datadir as your mainnet masternode (i.e. &quot;.dashcore&quot;). Create new folder specifically for testing (e.g. &quot;.dashcore_test&quot;) and make sure you use &quot;-datadir=<yourtestnetdatadirhere>&quot; cmd-line parameter for dashd and dash-cli. You'll also need a separate crontab line for testnet Sentinel. If you are not 100% sure what you are doing, I'd recommend setting up a new machine/instance for testing purposes only instead of reusing your mainnet server.

Read Discussion at:

