---
author: tungfa
layout: post
image: "DashSentinelv130.png"
title: "Dash Sentinel v1.3.0 release - MN's PLEASE update (Sentinel ONLY)"
original-author: NATHAN MARLEY
original-link: https://www.dash.org/forum/threads/sentinel-v1-3-0-release.42068/#post-202148
---

Sentinel v1.3.0 is now released! Please update your MNs per the usual method (cd /path/to/sentinel && git pull).

edit: To clarify, all mainnet and testnet should be updated to this version.

edit2: Link to Sentinel on GitHub: https://github.com/dashpay/sentinel


This release includes optimizations to how governance objects are represented in memory and handled in Sentinel, and (along with changes released in DashCore v12.3) allows for a newer, simpler JSON format governance objects.

If you are a normal user / MNO, you only need to update Sentinel to the `master` branch, version 1.3.0. No further no action is required.

If you are a developer of special tools like DashCentral or DashNexus, some other action could be required, so please read on.

Specifically, the multi-dimensional array and un-necessary string field are removed, leaving only the core JSON Object to be parsed and processed. This can affect how 3rd party tools parse governance objects.

If you have a tool which parses governance object JSON, you should be prepared to parse either the old legacy or new formats. To demonstrate, take the example for a proposal to buy Jack Sparrow a new ship (ahem, Captain Jack Sparrow, sorry...):


Read Discussion at:
