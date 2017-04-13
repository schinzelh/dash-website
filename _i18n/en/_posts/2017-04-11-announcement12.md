---
author: tungfa
layout: post
image: "2017-04-10-JOSHSEIGLER.png"
title: "Dash Core 0.12.1.5 Release Announcement"
---
Please download the new Version here:
<https://www.dash.org/wallets/>

Dash Core 0.12.1.5 is a maintenance release of the Dash Core 0.12.1.x series
In this minor release only bugfixes have been included and we consider this a stable release. (NOT Mandatory but Suggested)
This release fixes a issue with proper watchdog propagation which causes rare "watchdog_expired" spikes.

![Alt desc](/assets/img/2017-04-11-announcement122.png)

Changelog
<https://github.com/dashpay/dash/releases/tag/v0.12.1.5>

- multiple wd rate check (#1426)
* Modify MasternodeRateCheck to support updating buffers only on failure
* Update rate check buffer only when fAddToSeen is true

- multiple vote fix (#1425)
* Avoid adding the same vote multiple times to the vote file
* Cleanup multiple votes in vote file

- Fix potential race condition in vote processing (#1424)

- Fix ProcessVerifyBroadcast (#1423)
* check if mn rank can be calculated
* fix "is in top" condition

- Reject payment vote if masternode rank can't be calculated (#1422)

- Don't add non-current wd's to seen map (#1417)

Thanks to
UdjinM6, tgflynn, schinzelh
