---
author: tungfa
layout: post
image: "scaling_1.png"
title: "How To Enable On-Chain Scaling"
original-author: Evan Duffield
original-link: https://medium.com/@eduffield222/how-to-enabling-on-chain-scaling-2ffab5997f8b
---
How To Enable On-Chain Scaling

Scalability has long been a massive barrier to the adoption of digital currency. To date, nobody has figured out how to process as many transactions-per-second as PayPal or VISA. The leaders of various digital currency projects claim that one day the whole world will be using “their” currency, but they can provide no credible plan for how they will scale their network to the necessary level. Even Satoshi Nakamoto, founder of Bitcoin, seems to have simply assumed that advances in hardware and networking would solve the scalability problem for him. Dash is the first digital currency to come up with an answer to scalability that’s not based on technology that doesn’t yet, and might never, exist. Dash will be able to rival the likes of PayPal and VISA simply by using its existing infrastructure.
Dash’s two-tier network has provided a number of advantages over the years, and has allowed for the creation of compelling technologies such as InstantSend, PrivateSend, and decentralized governance. At present, there are over 4000 incentivized masternodes powering the second-tier of the network. Since these masternodes share in the block reward, their owners can afford to use higher-quality VPS hardware to host their nodes. This results in a high-quality decentralized network infrastructure. By leveraging the masternode system, Dash will be able to scale far faster than any other project. The first version of Dash Evolution will be able to support 500 thousand daily users, and over approximately the next three years, we will scale to a network capable of supporting 50 million users. This document explains how we intend to accomplish this unprecedented feat.
Many projects in the space believe that on-chain scaling is impossible. That’s simply because they haven’t explored alternative P2P architectures for higher performance. We intend to show just how far an incentivized second tier architecture can take a project like Dash.
Here is how our network looks today, with the second tier completely indistinguishable from the first tier.

![Alt desc](/assets/img/scaling_1.png)
From VPS to Server Farm
Dash is already attracting significant interest from well-known companies who would like to build new products on top of Dash. Because companies are interested in Dash now, we realize that we must begin scaling immediately. When the first version of Dash Evolution is released next year, we anticipate even greater interest and consequently must ensure that our network’s capacity increases rapidly. In order to fulfill our goals of scalability, Dash will begin supporting 2MB blocks beginning in Q4 of this year. We intend on scaling the network before its transaction capacity is maxed out. We must stay ahead of the curve.
The first version of Dash Evolution, which we anticipate releasing in 2018, will support 5MB blocks. We believe that the incredible features and ease-of-use that we are building into Evolution will cause a spike in demand for our network’s services. We want to ensure that we have sufficient transaction capacity to meet those additional needs. The second version of Evolution will support 15MB blocks using custom masternode hardware currently being researched by Dash Labs. We will likely use GPU acceleration to accomplish the necessary block processing, effectively creating the first iteration of our “ultra-large block acceleration” (ULBA) hardware. Finally, the third version of Evolution will support 45MB blocks by using custom hardware with PCI-EX cards to optimize block processing and enable the network to support 50 million users.
Here’s how the network will look after upgrading.
![Alt desc](/assets/img/scaling_2.png)

Theoretical Issues
It’s reasonable to ask why other digital currency projects haven’t adopted ultra-large blocks in order to scale their transaction capacity. The difficulty with large blocks is that each node must process each transaction within the block and then relay it to the network. Many digital currencies rely on altruism — ordinary users running nodes for free — to power their network. Unfortunately, because of the lack of economic incentives, these networks end up being bottlenecked by the slowest nodes. Dash solves this problem by economically incentivizing its masternodes, since they share in the block rewards.
The technical solution to creating a network which can support large blocks is three-fold. First, we must ensure that each masternode is running on hardware powerful enough to rapidly process each block. Secondly, we must make sure that each masternode has enough bandwidth to propagate blocks to the network quickly enough. Third, we must ensure the second-tier masternode network is highly interconnected and able to relay blocks amongst itself at incredibly high speeds.
Even without custom hardware, masternodes are capable of supporting significantly larger block sizes, assuming that they have adequate CPU, RAM, and hard drives. Therefore, we intend to begin the process of introducing larger block sizes even before Evolution is released. Scalability is a big concern in the digital currency space right now, with several projects experiencing high fees and long confirmation times. By beginning the scaling of Dash’s network immediately, we can offer a solution to these issues before they cripple our network as well.
Gavin Andresen did a great deal of research on 20MB blocks before his retirement. Based on Gavin’s research, I’ve concluded that our network can easily handle 20MB and larger blocks, provided that we solve propagation issues shortly thereafter. See below for Gavin’s excellent research:
<http://gavintech.blogspot.com/2015/01/twenty-megabytes-testing-results.html>
<http://gavintech.blogspot.com/2015/01/looking-before-scaling-up-leap.html>
Based on this research and our own research over the past year and a half, we offer the following upgrade plan for the masternode network.
Phases Of Masternode Upgrades
Phase I — V13: Normal VPS servers, which can be upgraded to relatively high-performance levels without requiring custom hardware. This will allow us to support blocks up to about 20MB.
Phase II — V14: Custom computers with multi-core high-end processors, colocated in server farms for fast propagation and ultra-low latency.
Phase III — V15 : GPU acceleration. GPUs such as nVidia’s Tesla series contain scriptable CUDA processors. The model below contains 448 such cores, which would allow masternodes to process the signatures from each transaction in parallel. We’ll also program small scripts for accelerating various tasks of dash-core, offloading some of the heaviest processing pieces to the masternode network.

![Alt desc](/assets/img/scaling_3.png)

<http://www.nvidia.com/docs/IO/43395/NV_DS_Tesla_M2050_M2070_Apr10_LowRes.pdf>
Phase IV — V15: ASICs on PCI-EX peripherals. Just as miners moved from CPUs, to GPUs, and finally to custom ASICs, Dash’s masternode network will follow the same upgrade path. In this phase, we will create custom ASICs and place them either on PCI-EX peripherals or external USB 3.0 devices. First generation ULBA devices will be higher density and designed for specific versions of dash-core.
ULBA devices inside masternode hardware will offline specific functions at 10x to 100x the speed of the GPU processing. Design and creation of this hardware will be completely open source and funded by the network. This will reduce the incentive for private companies to build proprietary hardware in hopes of gaining economic advantages over the rest of the network..
In short, getting beyond 20MB blocks will require each masternode to run on a complex set of hardware. This hardware will require redundancy, failover, load-balancing, GPU parallelization, custom PCI-EX hardware and hard-disk arrays for increased, fault resistant storage of network data. Masternodes will support two types of hard-disks, spinning disks with higher storage support and SSDs for quick read/write ability specifically for blockchain and cache storage.
Phase V: New versions of ULBA devices which utilize cutting-edge silicon fabrication, lower density chips, and full fiber interconnection of the masternode network. During this phase we begin to run services on the network like block explorers which require full validation.
Mind the Gap!
Miners and any others who want to keep up with the full data moving through the network will need heavy bandwidth and powerful servers to keep up. They will essentially require hardware that’s just as powerful as that used by the masternode network. This will increase the privacy of the network, since snooping will become prohibitively expensive.
However, there is a risk that miners, facing additional hardware costs, might lose their economic incentive to mine. They will essentially be absorbing the cost of running both a masternode and a miner, yet will only receive payments for mining. Miners who are unable or unwilling to upgrade their hardware will find that their blocks get orphaned frequently, reducing their revenue drastically.
We will solve this economic issue with a system called “collateralized mining.” Simply put, we will merge the process of mining into the masternode network. Masternodes running on advanced custom hardware will alo run mining software. We will call this combined masternode/miner a “collateralized miner.” An individual’s hashpower will therefore be determined by how many masternodes the person runs. There will be a transition period before collateralized mining is mandatory, which will allow existing miners to recoup their initial capital outlay. .


![Alt desc](/assets/img/scaling_4.png)
Economics and Bandwidth
The basic premise of collateralized mining is to require collateralization and a special mining key which is associated with each masternode to be able to mine a block. Each masternode is then capable only of mining a specific amount of blocks per period of time, creating a round robin mining effect across the network.
This has many features, all of them good.
Lower power consumption
Equal mining share per masternode
Secure hashes for seeding quorums
Quick block processing
Quick block propagation
Ultra-large block support
Complete closure of 51% attack
Removal of pooled mining
Bandwidth and propagation is not a concern due to increased network connectivity and larger ethernet bandwidth.
We believe that Dash Evolution will cause our project to be in line with Satoshi’s original vision for decentralized digital currency. Satoshi wrote:
“The current system where every user is a network node is not the intended configuration for large scale. That would be like every Usenet user runs their own NNTP server. The design supports letting users just be users. The more burden it is to run a node, the fewer nodes there will be. Those few nodes will be big server farms. The rest will be client nodes that only do transactions and don’t generate.” — Satoshi, 2010.
Tier one (end-users running dash-core software) will essentially be phased out, with users ultimately accessing the network using our decentralized API (DAPI). We are calling DAPI “tier three” of the network.
Collateralization Phases
We will gradually transition the network to collateralized mining in order to maintain network security while allowing existing miners to recoup the cost of their mining equipment. We will upgrade the network in phases:
Phase I : Normal miner / Masternode mining arrangement
Phase II : Optional masternode mining keys
Phase III : Required masternode mining keys
Phase IV : Required local ASIC w/ MN core daemon
Masternode Keys (technical notes)
Masternodes will also begin to use different signing keys for different actions. Right now, masternodes use the same key for every action. In the future, they will need a key specifically to delegate to the contractor who mines on their behalf. This will prevent that contractor from doing any other actions, such as voting. (Note that this refers to the masternode key, not to the key which holds the 1000 DASH collateral. That will always remain private.)
A+B | Masternode Public Key / Signing Key
A+B+C+D | Masternode Public Key / Network Message Signing Key / Voting Key / Mining Key
