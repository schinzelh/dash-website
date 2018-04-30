---
author: tungfa
layout: post
image: "lightingFeb24th.jpg"
title: "How Does the Lightning Network Stack Up Against Its Biggest Competitors?"
original-author:  Joël Valenzuela
original-link: https://www.dashforcenews.com/rocketpay-brings-dash-southeast-asia/
---

Bitcoin has longtime and well-known scaling problems, with fees last year spiking to over $30 on average for a transaction and confirmations taking hours, sometimes days. The transaction load of the network topped out at around 400,000 per day, capped by the one megabyte block size. In order to scale past that level without increasing the block size, Bitcoin has looked to a new technology called the Lightning Network to scale the network off-chain past the limitations of purely on-chain capacity. Here we examine Lightning, and compare it to other payment-focused cryptocurrencies taking the on-chain scaling approach.

#### How It Works

The Lightning Network is a complicated second layer system that has been in development for years, so explaining it in comprehensive detail isn't easy. Instead we can offer a simplified explanation. Lightning is an off-chain solution, meaning it doesn't send actual coins, rather makes accounting changes on the second layer, which then gets settled on the main layer, avoiding the need to move actual funds thousands of times. It works by setting up a payment channel by sending funds into a multisignature address that has keys controlled by multiple parties. Transactions are made back and forth between two parties off-chain, and whatever the balance is when the channel is closed will be sent back to the users' wallets in the appropriate amounts. This is how bi-directional (two-way) payment channels work.

The Lightning network is, effectively, a web of such channels. You have a channel with contractor, to whom you send regular payments, settling up once per month. Suppose you want to buy coffee, but don't want to open up a new channel with the coffee shop. Luckily, the contractor has a channel there because he gets a coffee every morning, and so he can route your transaction through himself to coffee shop. Now say you want to hire another contractor who also happens to frequent that coffee shop. Your payment would be routed through the first contractor, to the coffee shop, then to the second one. The larger and more well-connected the network grows, the more people you can transact with off-chain. None of these funds actually move on the blockchain until you close a channel, when they're broadcast to the network as a regular on-chain transaction.

[Here](https://blog.bitmex.com/the-lightning-network/) are a few [great resources](https://medium.com/@The1Brand7/lightning-faq-67bd2b957d70) with more details on how the Lightning network works.

#### Pain Points

Despite the ingenuity of this scaling solution, however, the Lightning network has drawn some [criticisms](https://chrispacia.wordpress.com/2015/12/23/lightning-network-skepticism/) for its inherent drawbacks (Yours CEO Ryan X Charles compiled one of the most [complete rundowns of its limitations](https://www.youtube.com/watch?v=Ew2MWVtNAt0)[](http://savefrom.net/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DEw2MWVtNAt0&utm_source=safari&utm_medium=extensions&utm_campaign=link_modifier "Get a direct link")). To begin with, you have to pay a fee to open a channel (think account) and wait a while, because on-chain transactions must be made to the multisignature address before off-chain payments can be made. Routing problems can also occur if you have no connection to the end recipient, and are simply unable to pay someone if they aren't as well-connected as you are.

One of the bigger problems is that funds are able to be stolen by Lightning nodes. While this is not considered a major risk and a series of countermeasures have been developed to attempt to prevent this, even strong supporters such as former Bitcoin Core contributor Peter Todd have laid out this risk:

The bigger risk may be that wallets must be left online at all times, even to receive funds. In the case of going offline this can cause problems, and nodes themselves going offline could be disastrous:

The technical nightmare of expanding Lightning support is also very real. Right now, with on-chain transactions, most changes to scaling would not affect merchant software or hardware setups. Lightning, being a totally different type of transaction occurring off the blockchain, would require massive infrastructural changes in order to enable across the whole ecosystem. Finally, because of aforementioned routing issues, connecting to large hubs becomes a much better option in order to continue to use Bitcoin easily. This produces a centralization risk where a few well-connected hubs process the vast majority of the network's transactions, exactly the situation cryptocurrency was created in order to avoid.

#### Head-To-Head With Its Competitors

In order to properly judge the effectiveness of Lightning, it's important to judge it not against the current Bitcoin (or Litecoin) experience, but the offerings of its biggest competitors in on-chain scaling, namely Bitcoin Cash and Dash. Here's how they stack up.

![](https://www.dashforcenews.com/wp-content/uploads/2018/02/lightning-network-infographic-v3.jpg)

TRANSACTIONS

In terms of transaction speed, Lightning can broadcast almost instantly. Confirming securely on the blockchain requires closing the payment channel, which can take days, weeks, even months. Bitcoin Cash can broadcast instantly as well, while waiting for 10-20 or so minutes for an on-chain confirmation, while Dash can similarly broadcast instantly, though it can confirm as quickly as 1.3 seconds if InstantSend is used, or about 2.5 minutes for regular transactions. As far as fees are concerned, Lightning would probably charge negligible fees, however the several transactions required to open a channel could be significant. Bitcoin Cash currently has a median fee of 0.84 cents, while Dash median fees are 0.24 cents, with about 6.25 cents to use InstantSend.

The big drawback of Lightning is that it can't necessarily send to anyone anywhere. Instead, transactions to users (especially during the infancy of the network) may not always be possible due to routing issues not finding enough hops in the channel to reach the end point. This includes offline users not being able to receive funds. Both Bitcoin Cash and Dash, on the other hand, can send funds to anyone with a wallet at any time, including when the destination wallet is offline.

SECURITY

The biggest issue with Lightning is that the user does not directly control their funds or its liquidity. Funds in a channel are in a multisignature address, and have to be returned and settled on-chain before the user truly has access to their funds. Neither Bitcoin Cash nor Dash have this problem, since funds can remain in wallets with exclusively user-controlled private keys at all times. There is also an increased theft risk, due to wallets remaining online at all times, and nodes may be able to steal funds, even though this is unlikely due to certain countermeasures. Bitcoin Cash and Dash both support wallets that can go offline when not in use, and nodes have no similar capability of stealing funds. Finally, if a Lightning user wishes to send their funds to cold storage for increased security, they must wait hours/days/weeks for transactions to be sent on-chain depending on congestion. Bitcoin Cash can have funds confirmed in cold storage in 10-20 minutes. Dash can send confirmed funds to storage in 1.3 seconds, provided the balance has 5 previous on-chain confirmations (if not, it would take 2.5 minutes for a regular transaction).

INFRASTRUCTURE

To begin using the lightning network, a user must first open a channel using on-chain transactions. This means a potentially high fee and long delay just to begin using Lightning. Both Bitcoin Cash and Dash have many free wallet options available that allow a user to begin receiving and sending funds instantly. Lightning will also require special merchant integration before it's available as a payment method. This will likely be extensive, since every single participating merchant or network would need to open a payment channel prior to receiving Bitcoin or Litecoin, meaning extra setup costs and difficulties. Dash and Bitcoin Cash, meanwhile, are relatively simple to set up on new systems, especially ones that currently take cryptocurrencies, and no additional integrations are required in order to scale. Dash does require an extra step in order for the processor to recognize InstantSend transactions, however the change is very minor, and not at all necessary to accept Dash effectively. And last but certainly not least, Lightning has no autonomous funding for scaling. Nodes and hubs must instead be created by third parties and run like a business off of profit from routing transactions, meaning a large company can build, and effectively control, large portions of Bitcoin's transacting capacity. Bitcoin Cash naturally incentivizes miners like any proof-of-work coin, however nodes are not paid, meaning that down the line there is a hypothetical risk of many nodes becoming controlled by larger or more centralized entities. Dash stands out in that it incentivizes masternodes to run the infrastructure, meaning that no outside company or help is required to fund the whole network's long-term scaling plan.

#### Conclusion

The Lightning network provides an interesting and innovating way of scaling transactions far beyond what current infrastructure allows by creating a second layer of nodes to process them off-chain. Compared to other cryptocurrencies focused on scaling on-chain, however, the user experience and features are significantly inferior. The only hope for Lightning to become an "alt killer" is for it to provide an extremely smooth experience for users before alternatives gain any meaningful traction, take enough traffic off-chain so that on-chain transactions are still fast and cheap, or to continue to scale to mass levels when competitors hit a definite brick wall.

It's arguable that the first of these hypothetical situations is no longer possible, as a variety of cryptocurrencies have expanded to fairly wide acceptance so that few businesses remain that solely accept Bitcoin. This likelihood is further reduced considering both Bitcoin's relatively small adoption levels worldwide, as well as the greater technical hurdle to accepting Lightning transaction than to accept other coins. The second situation is also unlikely due to the amount of on-chain transactions necessary to fully run Lightning to mass-market levels. The final hypothetical is Bitcoin's last hope of maintaining dominance, assuming that neither simply increasing block sizes nor incentivized nodes with specialized hardware will succeed.

Based on currently available solutions, Lightning appears to drag far behind the experience offered by Bitcoin Cash, and even farther behind that of Dash. Even if effective in certain ways, Lightning likely won't be enough to save Bitcoin alone.
