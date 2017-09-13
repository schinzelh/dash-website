---
author: tungfa
layout: post
image: "bugbountyinactionaug31.jpg"
title: "BugBounty Program in Action : Temporary disabling of InstandSend due to potential quorum exploit method"
original-author: Andy Freer 
original-link: https://www.dash.org/forum/threads/temporary-disabling-of-instandsend-due-to-potential-quorum-exploit-method.16492/
---

Hi everyone,

We'd like to inform you that with help from the community, we have discovered a potential exploit in the current InstantSend implementation which provides the chance for an attacker with 6 or more Masternodes to dominate an InstantSend quorum by brute forcing collateral transaction hashes in a certain way as to increase their chance to be selected for an IS quorum, which could provide the possibility to perform a double spend or a potential network fork.

We have not yet seen this attack executed on our network and we believe the risks are low because the exploit requires ownership of at least US$ 2.1 million in Dash. However, for safety we have disabled InstandSend via ["SPORK_2_INSTANTSEND_ENABLED": false] to ensure this attack cannot be performed until the fix, which is already completed & QA’d, is released to the network.

As 12.2 release is imminent, our intention is to include the fix as part of the 12.2 release process, which is estimated within the next few weeks, instead of releasing a hotfix immediately, to minimize the disruption in the coming network upgrade.

As a result, any InstandSend transactions made before 12.2 deployment will fallback to normal confirmation times, therefore users are advised to refrain from selecting InstantSend on payments in wallets until 12.2 to prevent being charged the higher fee.

We’d like to thank two community members, Matthew Robertson and Alexander Block for helping to discover this exploit. Consequently, after a post-mortem, our conclusion is that the exploit was missed internally due to the fact that we did not provide enough review of early InstantSend code, with everyone in our (much larger) team today being focused on V12 features and our forthcoming V13 Evolution release. 

Therefore we have been conducting an internal security audit of earlier code which hasn’t found any further explots and we are also seeing the Dash community becoming much more active in contribution and code review, from new contributors to the recent $240,000 BugBounty program funded by the network, which we believe together will ensure that enough ongoing review is being provided to find and secure any future exploits quickly and comprehensively to ensure the Dash Network remains secure.


Thank you,


The Dash Core Team
