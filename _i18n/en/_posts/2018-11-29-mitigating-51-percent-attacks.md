---
author: tungfa
layout: post
image: "Mitigating51attacks.jpg"
title: "Mitigating 51% attacks with LLMQ-based ChainLocks"
original-author: Alexander Block
original-link: https://blog.dash.org/mitigating-51-attacks-with-llmq-based-chainlocks-7266aa648ec9
---
Mitigating 51% attacks with LLMQ-based ChainLocks

The recent controversies observed in other crypto projects have shown that threats of 51% mining attacks are real, at least in the sense that they can generate a great deal of uncertainty and fear in the market.

What are 51% mining attacks?
A 51% mining attack becomes possible when a single entity/miner has more hash power than the total combined hash power of all other miners. In this case, the miner is able to overrule all blocks of all other miners, simply by ignoring the blocks found by other miners and mining new blocks only on top of his own blocks.

Such a miner can do this in public, which would be noticed by an unusually high rate of orphaned blocks. The miner can also perform this in private without publishing blocks one by one, and instead publish their own secret chain at once after some time (e.g. hours or days). If this is done, the network would first assume that everything is operating as usual, and then suddenly perform a deep reorganization.

By following this process, the miner is able to attack the network in multiple ways. He could publish transactions to the public chain and secretly mine a conflicting transaction on the secret chain that sends the coins back to himself (which is perfectly valid by consensus rules). He could mine only empty blocks in the secret chain and basically revert all transactions that have been confirmed in the meantime on the public chain. These transactions would very likely be re-confirmed later in new blocks (mined by honest miners), but there is no real guarantee for this to happen. Also, everyone would have to assume that even after re-confirmation, the attack could be repeated, as the malicious miner might already be working on the next secret chain.

These are just a few examples of what a miner with 51% hash power can do. There are probably many more possible attacks/scenarios that all lead to some real damage.



How likely is this?
51% mining attacks are generally assumed to not be an issue as long as the basic assumptions behind proof of work hold true. One of the assumptions is that honesty is generally more profitable than malicious behavior. Another assumption is that most of the hash rate is provided by rational participants who follow the first assumption. Even if part of the network was malicious for some reason, the rational participants would outvote the malicious participants since they have more hash power in total.

There are however situations where these assumptions may become completely void. If for example advancements in ASIC hardware were kept private, distribution of hash power could be shifted in a way that either makes malicious behavior profitable for single entities, or at least reduces losses to an acceptable level.

Also, coins (e.g. Bitcoin Cash) which don’t have the majority of available hash power for their specific hash algorithm are always at risk of being attacked by entities who have a moderate hash rate on the majority coin (Bitcoin Cash uses SHA256D, which is also used by Bitcoin, but it has less than 10% of the hashing power Bitcoin has).

This leads to some level of uncertainty and lack of trust in Proof of Work, which has been shown very clearly by the recent “hash wars” observed in the Bitcoin Cash community. Multiple entities have joined together to create a fork from the Bitcoin Cash network, and threatened to perform 51% attacks on the original network.

Although these attacks have not been (successfully) performed on any major coin so far, the market has reacted in a very negative way, contributing to a downturn in the market and multiple exchanges halting transfers of coins. Even the possibility of such situations is unacceptable if mass adoption is the long term target.




How can Dash solve this?

As of now, Dash is as vulnerable as any other Proof of Work coin and many community members have asked how we can solve this. There was an older proposal called “Collateralized Mining” which would solve the 51% mining attack to some degree, but it would have required massive changes in mining economics (which would have been an issue on its own).

The introduction of Long Living Masternode Quorums (LLMQs) enables us to implement a new protection mechanism against 51% mining attacks. This protection mechanism, called ChainLocks, is proposed in DIP8. This DIP has been in progress for a number of months and we decided to publish it now as an answer to community questions on how Dash is going to handle the threat of 51% attacks. It also makes Collateralized Mining obsolete.



LLMQ-based ChainLocks

The idea of ChainLocks is to perform a verifiable network-wide measurement/vote of the “first-seen” rule. For each block, an LLMQ of a few hundred masternodes is selected and each participating member signs the first block that it sees extending the active chain at the current height. If enough members (e.g. >= 60%) see the same block as the first block, they will be able to create a P2P message (CLSIG) and propagate it to all nodes in the network. There are some more details to this process, especially when multiple miners find a block at approximately the same time. These details are described in DIP8.

The CLSIG message can only be created if enough quorum members agree on it. This is because LLMQs use BLS M-of-N Threshold Signatures and the CLSIG message is required to have a valid threshold signature included. This threshold signature is internally just like a normal BLS signature, and can be verified by all nodes without knowledge of who signed it. This verification only requires the LLMQ’s quorum public key, which can be retrieved from on-chain data. Due to the nature of how LLMQ Signing Requests/Sessions work, there can only be either one valid CLSIG message or none, so there is no uncertainty due to conflicts.

Presence of a valid CLSIG message indicates that most members (e.g. 60%) of the LLMQ have seen the specified block as the first block. As LLMQs are randomly composed from Dash’s Masternode set (currently about 4900 nodes), the distribution of nodes that have seen this block first across the whole network is statistically the same as inside the LLMQ. This means, that if 60% of LLMQ members have seen the block first, about 60% of the whole network should also have seen it first.

If a valid CLSIG message is received by a node, it should reject all blocks (and their descendants) at the same height that do not match the block specified in the CLSIG message. This makes the decision on the active chain quick, easy and unambiguous. It also makes reorganizations below this block impossible.



Implications and effects on the network

ChainLocks have a few very important effects on the whole network and its economics. The most important effect for normal users and merchants is that transactions can be considered fully confirmed after the first on-chain confirmation inside a block protected by ChainLocks. Transactions can no longer vanish from the chain since reorganization of signed/locked blocks is not possible. This means that there is no need anymore to wait for 6 or more confirmations until a received transaction can be considered secure.

It also has effects on the economics of mining. It removes all incentives for miners to cause chain reorganizations. Many attacks based on secret or selfish mining become impossible as they all depend on miners withholding longer and secret chains. Under the current consensus rules, such chains would override the publicly known chain and cause a chain reorganization when published. With ChainLocks however, miners are incentivized to publish every block immediately, even if they in theory have enough hash power to overrule every other miner. Failure to publish creates substantial risks for a malicious miner since any secret chain (even if thousands of blocks longer) would be immediately invalidated if another honest miner publishes a valid block that receives a CLSIG before the secret chain is revealed.



But what about the longest-chain rule?

The longest-chain rule is one of the most important parts of Proof of Work based consensus. The idea is that every node should consider the chain with the most accumulated work as the locally active chain (but only if it is also valid by all other consensus rules). The reason for this rule is that otherwise it wouldn’t be possible to find consensus on which chain to extend. Nodes need to find consensus based on limited information, and the only reliable information which is viable for this is the information found from the chain of headers. Using only the accumulated work (calculable from the headers) makes sure that every node can disconnect and reconnect, and still find consensus at any time.

With ChainLocks, this rule is still in effect, but it can be overridden by a valid CLSIG message. Effectively, only the members of the responsible LLMQ are fully following the longest-chain rule, as they are the ones creating the CLSIG message in collaboration. As the CLSIG message can only be created if enough LLMQ members agree, the presence of the CLSIG message serves as a proof that the referenced block was (or still is) the block resulting in the longest-chain.

This puts quite some trust into CLSIG messages and the Masternode network, but we consider this to be an acceptable tradeoff. The assumption is that the majority of the masternode network is honest, which is basically the same assumption applied to miners in a plain Proof of Work system.

The difference with ChainLocks is that miners AND Masternodes representing 51% of each of the layers would have to collude in order to perform a working attack. And even if an attack succeeded, the attackers would still not be able to cause deep reorganizations, as previous CLSIG messages can’t be invalidated by the attackers. The worst thing that could be achieved is to NOT sign blocks, which would be noticed by all nodes. Also, if any LLMQ with mostly honest masternodes signed a block in-between the attack, all previously unsigned blocks would become fully confirmed as well, making reorganizations for these impossible as well.




And the other consensus rules?

No other consensus rules are affected. All nodes must still fully verify a block before accepting it. This includes double-spending checks, signature checks, and Proof of Work (hash < difficulty target).

A valid CLSIG can NOT enforce acceptance of an otherwise invalid block.




Why can’t other coins have ChainLocks?

One of the main prerequisites required to make ChainLocks secure is a Sybil protected network of semi-trusted nodes. A coin that does not offer such a class of nodes will not be able to implement something like ChainLocks in a secure manner. In Bitcoin for example, anything that would rely on “votes” of individual nodes can be gamed by simply starting up thousands of malicious nodes. The only possible solution would require setting up explicit trust in human selected nodes, but this would be a massively centralized solution.

In Dash, the Masternode network is protected against Sybil attacks by requiring a collateral of 1000 Dash per Masternode. This makes it economically impractical to perform a Sybil attack, simply because buying enough Masternodes would require substantial financial resources, which would be put at high risk while performing any attacks. With the current parameters that we target for LLMQs, an attacker would have to buy at least 60% of all Masternodes to get a realistic chance of success.

I believe that this is one of the most undervalued properties of the Masternode network in Dash. Practical protection against Sybil attacks is the main prerequisite for ChainLocks and any other functions that utilize any form of quorum decisions.

In the future, this unique and powerful network infrastructure will allow us to safely implement more innovative features on top of LLMQs, making Dash even more secure, fast and user-friendly.

