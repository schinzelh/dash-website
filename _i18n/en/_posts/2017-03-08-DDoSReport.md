---
author: andyf
layout: post
image: "2017-03-08-DDoSReport.png"
title: "Incident Report on DDoS attack against Dash’s Masternode P2P network"
---
A DDoS targeted the Dash network resulting in around 12% of Masternode's going offline but with most services unaffected. Read our analysis of the attack and learn how to protect your Masternode.

## Overview

Yesterday at 16:17PM UTC a DDoS attack against Masternodes in Dash’s P2P network began, originating from around 2,000 IPs based in Asia. The attack contained a mix of SYN-Flood, UDP floods (with empty payloads) and protocols like sFlow and GRE.

During the initial wave of the attack most Masternodes experienced higher CPU and bandwidth usage which was enough to cause around 100 Masternodes to become unresponsive. It was originally thought that these nodes were the “weak” nodes among the network but further inspection proved that it wasn’t always the case. For example we had some stronger nodes go offline due to excessive logging of dropped packet data. This shows the importance of taking the proper steps required to secure and protect each and every Masternode which is part of the network.

After the initial wave of the attack as Masternode owners started to deploy iptable rulesets to counteract the attacks we started noticing a second larger wave of traffic. The attackers were continuing with the SYN-Floods but also were attempting to exhaust the connection limits of the Dash Core daemon itself in hopes of crippling the software and it’s ability to process Dash protocol messages.

During this larger second spike many Masternode owners started seeing enough malicious traffic that certain VPS providers automated DDoS protection started kicking in. The second wave of the attacks saw another set of 400 or so Masternodes drop off the network bringing the total number of affected nodes to around 500.

Prior to the attack starting there were 4030 Masternodes available and at the peak of the second wave this number was reduced to 3550 Masternodes. This means the attacker(s) were able to bring 11.9% of the Masternode network offline.

## Timeline

The following is a timeline of the events as they unfolded as well as an overview of how the Masternode network was affected.

![Incident Timeline](/assets/img/blog/incident-2.png)

Masternode count:

![Masternode Reduction](/assets/img/blog/incident-3.png)

## Masternode Availability

Included below are two graphics that help illustrate visually what happened on the network. The graphic on the left shows the enabled Masternode counts during the attack. The number of nodes online before the attack (4030) and it’s low (3550) during the attack. The graphic on the right shows the number of connections that were being seen during the attack. Normally a node will see connection peers in the range of 8 - 25 peers per node. During the peak of the attack almost all connection slots were occupied, even if the node was configured to accept many more connections.

![DDoS Data](/assets/img/blog/incident-charts.png)

## Service Disruption

During the attack, two 3-rd party services put their Dash services on hold for a few hours due to “network issues” (reported by users of Poloniex and Exmo). However, other 3-rd party services as well as network operations such as mining, transaction processing, InstandSend and PrivateSend appeared to function without any issues. No user funds were affected.

## Suggested IP Table rules

One of the core devs (Chaeplin) has created a suggested iptables ruleset for Masternode operators based on data gained from the attack.

We recommend that **all Masternode operators configure [this firewall ruleset](https://gist.github.com/chaeplin/5dabcef736f599f3bc64bdce7b62b817)** on their remote Masternode end points.

## Dash Core Improvements

Dash Core is based on Bitcoin Core which has highly robust network code. However, we are investigating possible ways to improve it based on further analysis of the data collected during the attack.

## Lessons Learned

Things are never dull at Dash. In the last month we have successfully pushed a hard fork with major improvements to the protocol, seen our market cap double, and now our first DDoS attack. We encourage all Masternode owners whose nodes were affected to assess the reason of the node failure, moving to a more powerful VPS or upgrading the hosting plan if necessary to ensure that your Masternode doesn't fall out of payment queue during such events.

That being said even some more powerful nodes were affected. This should be a reminder to all Masternode owners that doing their due diligence in terms of setting up **correct iptable protection, DDoS protection and regular monitoring** will start to become the norm in the future. At the current USD/DASH exchange rate the approximate return is around $350 a month per Masternode. This means there is still room left to protect your node and we encourage users to look into this further.

We would like to thank the Dash Nation community for all their help during this attack. This could be the first probe before a larger attack so everyone should be extra diligent over the next few days getting the proper protections in place for their nodes. If you or someone you know is having problems we urge you to join the [Dash Forum](https://www.dash.org/forum/) or the [Dash Nation Slack](https://dash-nation-invite.herokuapp.com/) where lots of people are willing to help you configure your Masternode correctly.

*Analysis thanks to: Jeff Smith, Andy Freer, Chaeplin, Crowning, Holger Schinzel, Moocowmoo, Timothy Flynn and UdjinM6*
