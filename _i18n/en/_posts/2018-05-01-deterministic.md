---
author: tungfa
layout: post
image: "deterministicMay01.jpg"
title: "Introducing Deterministic Masternode Lists"
original-author: Alexander Block
original-link: https://blog.dash.org/introducing-deterministic-masternode-lists-daaa7c9bef34
---


Introducing Deterministic Masternode Lists
==========================================

We are very happy to announce that we are finally able to release our next major installment of Dash Improvement Proposals; DIP2, DIP3 and DIP4. All these are the foundation for what we would like to implement and deploy after the release of 12.3: Deterministic Masternode Lists.

### Links to DIPs

[DIP2 --- Special Transactions](https://github.com/dashpay/dips/blob/master/dip-0002.md)

[DIP3 --- Deterministic Masternode Lists](https://github.com/dashpay/dips/blob/master/dip-0003.md)

[DIP4 --- Simplified Verification of Deterministic Masternode Lists](https://github.com/dashpay/dips/blob/master/dip-0004.md)

### What are Deterministic Masternode Lists?

Deterministic masternode lists are masternode lists which are fully derived from on-chain data. DIP2 & DIP3 introduce new transaction structures & specific types that allow the network to register and update masternodes on-chain. As other nodes will derive their masternode lists from these on-chain transactions, all nodes will come to the same consensus regarding the currently valid masternode list.

The introduction of deterministic masternode lists also has some effects on masternode owners and operators, which we will describe in this blog post.

### Is this related to Evolution?

Yes and no. There are many reasons to move to deterministic masternode lists, and many of them are completely independent from Evolution. If you read through the "Motivation" sections in DIP3, you'll see a few examples of why this effort improves the network, regardless of Evolution's promised features and functionality. At the same time, these promised features & functionality all depend on hard consensus (meaning: fully on-chain) on masternode lists. So, deterministic masternode lists are independent from Evolution, but Evolution highly depends on deterministic masternode lists.

### Short description of the current system

Currently, a masternode owner has to create a 1000 Dash collateral and configure his local wallet (in "masternode.conf") to reference the masternode IP, collateral UTXO and private key of his masternode. At the same time the masternode has to be configured to run with the masternode private key (with "-masternodeprivkey").

After this he would issue a "masternode start-xxx" command to announce it to the network and signal the masternode to start. Every time the masternode is down for too long, or when an update is needed, the owner would need to issue a new "masternode start-xxx" command.

There are some problems from the perspective of the network in regard to this, which we describe in the "Motivation" section of DIP3. There are also problems from the perspective of the masternode owners and operators, which we describe here.

### Problems from the perspective of MNOs

In the current system, the only operational masternode roles currently identified include the collateral owner and the operator of the masternode. The owner of the 1000 Dash collateral can keep his private keys for the collateral and only has to share the masternode key with the operator. There are however multiple problems with this.

First, the "masternode start-xxx" command can only be issued if you own the collateral key, meaning that the operator can not start/announce the masternode on it's own. This especially gets problematic when the masternode needs to be updated, as the operator has to rely on the owner to act in a timely manner. As an alternative, the owner could transfer his 1000 Dash collateral to the operator, but this would require enormous trust in the operator.

Second, the shared masternode key is used for operational matters and for proposal voting at the same time. This means that if a masternode owner decides to use a third party hosting provider, he also has to trust the provider to not misuse the masternode key.

Third, the masternode rewards can only be paid to the same address as the one used by the collateral. At the same time, the collateral address can only be a P2PKH address, limiting the possibilities owners and operators have.

### Deterministic masternodes system

In the new system, the masternode is created by sending a special transaction (ProRegTx) to the network. This transaction contains the necessary metadata (IP, public keys, reward addresses, ...) and also moves the 1000 Dash collateral to a new address. After this transaction is mined, the masternode is added to the masternode list and is immediately expected to be functioning (no "masternode start-xxx" command needed). Other special transactions (ProUpRegTx, ProUpServTx) may then be used to update the metadata of the masternode.

### New roles

In the new system, we recognize and assign three different roles. Each of these roles has its own keys and each of these can only perform a subset of actions and updates on the masternode metadata. The three roles are:

1.  Owner: This is the owner of the 1000 Dash collateral. The owner is allowed to modify the payout address for rewards and delegate operational and voting rights to other people.
2.  Operator: This is the operator of the masternode. The operator can only modify the IP and operator reward address.
3.  Voter: This is the person who is allowed to vote on behalf the masternode. He cannot modify any of the masternode metadata.

The three roles are internally differentiated by the associated public keys, which are specified in the registration transaction. If all keys are set to the same, it means that the owner is also the operator and voter. If different keys are used, it implies delegation of roles to other keys and/or people. If any key is unassigned (zero), the transaction is invalid.

### Collateral and rewards

The registration transaction will also be the collateral, meaning that one of its outputs will contain the 1000 Dash. If this output is spent (collateral moved), the masternode is removed from the masternode list. The collateral address can be a P2PKH (pay-to-public-key-hash) or a P2SH (pay-to-script-hash) address in the new system.

The limitation that the masternode rewards can only be paid to the same address as the collateral address is lifted by including a reward payment address in the registration transactions metadata. The reward address can also be a P2SH addresses in the new system.

The owner can also specify the percentage of the masternode rewards that he wants to give to the operator. This value can only be set once when the masternode is registered and thus needs to be negotiated in advance. To claim the operator reward, the operator has to specify his reward payment address when he updates the operational masternode information.

### Updating Masternode IP

The IP is considered to be operational information. Only the operator can change it and he can do so without the owners approval or help.

The IP is initially set in the registration transaction, but can also be omitted when registering the masternode. If omitted, an update from the operator is required to fully enable the masternode. This should reduce the required communication between the owner and operator and also reduce the number of mistakes the owner can make.

### SPV clients and masternodes

In the current/old system, SPV clients are not able to verify the masternode list. The reason for this is that they would need to verify the collateral UTXO of each masternode, which can only be done on the full chain. Also, the network traffic required to to keep the masternode list up-to-date is not very mobile friendly.

With DIP4, we introduce a way for SPV clients to retrieve and verify the full masternode list. This is basically done by committing a new merkle root hash to the coinbase transaction, which can then be used by the SPV client to verify the list.

This change will have some nice effects in the Dash ecosystem. It will allow SPV clients (including mobile clients) to use advanced Dash features like PrivateSend and receival/verification of InstantSend (sending does not require the masternode list). It is also the basis for future, Evolution related features on SPV clients.

### PoSe (Proof-of-Service) banned masternodes

DIP3 introduces the concept of "PoSe-banned" masternodes. These are masternodes which failed some PoSe verification and are thus removed from the valid masternode subset. The DIPs for PoSe-verification are not fully finished yet and we plan to publish them separately.

### Interface to the new system

The new system will require a set of new RPC commands to create and update the deterministic masternodes. We will describe the new interface in a separate blog post and also update the necessary documentation for this later.

Additionally, we will move all key handling related to masternodes into the wallet. This means that it won't be necessary to manually edit/update the "masternode.conf" file anymore.

### Special Transactions

DIP2 introduces a new transaction version. The new version enables the addition of well-defined payloads to transactions and forms the basis for the other DIPs introduced in this post. It will also be the basis for many other features which are currently being designed and developed.

### State of the DIPs

The DIPs are meant to be proposals and open for discussion. We ask the community and Dash Core members to review and comment on these. If any changes to the DIPs are needed, we will integrate these.

There are also other DIPs in various stages of research, design, and development which might require changes to the already published DIPs. It is currently unknown how future DIPs will affect the already published DIPs.

### Implementation

The implementation of the deterministic masternodes system is already underway. Dash Core developers have reached a point where DIP2, DIP3 and DIP4 have been implemented and tested. This functionality is already running in a stable state in one of our devnets. Pull requests will be released/created soon.

### Deployment

The introduction of the deterministic masternodes system requires a multi-stage deployment and changes in many parts of the Dash ecosystem. We have worked out a deployment plan that has been tested multiple times (thanks to devnets). We will publish another blog post with the detailed deployment plan.
