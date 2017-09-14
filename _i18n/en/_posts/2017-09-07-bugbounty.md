---
author: tungfa
layout: post
image: "bugbountySep07.jpg"
title: "What banks can learn from a cryptocurrency's bug bounty program"
original-author: Brian Patrick Eha 
original-link: https://www.americanbanker.com/news/what-banks-can-learn-from-a-cryptocurrencys-bug-bounty-program
---

Financial institutions are prime targets for hackers, but there may be one species of prey even more appealing: digital currencies.

The value not only of bitcoin but of the entire market for blockchain assets has exploded in the past six months, and one of the upstarts is taking no chances that its system can be compromised.

The creators of Dash, a bitcoin rival, have hired the San Francisco-based security company Bugcrowd to run a "bug bounty" program on its behalf, enticing independent security researchers to pore over the cryptocurrency's code and paying them for every flaw they find.

"As an open-source project, all of our code is available to be audited by anyone. But this will really bring a set of highly professional eyes to the code and make sure that it is as robust as possible," said Ryan Taylor, CEO of Dash's core team, which is run like a for-profit startup.

Talk to cryptocurrency insiders like Taylor—individuals who have helped create and secure these unique pieces of software—and they will tell you that banks could learn a lot from open-source projects like Dash about how to build applications and secure their networks.

After all, the time for pretending that it is possible to make an app or network impregnable from the get-go—if it ever existed—is long gone. The new security paradigm is one of "persistent threats," in which the safest assumption is that a malicious actor has already penetrated your system.

Ryan Taylor, CEO of the core team behind the cryptocurrency Dash
Have at it
"Rather than trying to hide the flaws," says Ryan Taylor of the Dash project, "we try to give as many people as possible the opportunity to find them and then fix them."
Whether the code underlies a bank system or an internet currency, "vulnerabilities are inherent in how software is created," said Casey Ellis, chairman and chief technology officer of Bugcrowd. "They're a fact of life."

This is so because people design things to do what they're meant to do, he said. Software developers aren't necessarily thinking about how to make their applications secure, merely effective.

What Bugcrowd wants to do for the Dash team, as for all of its clients, Ellis said, is to "create a feedback loop between people who think like builders and people who think like breakers." From this process arises a resilient product.

That resiliency has become ever more essential as Dash's value has skyrocketed. On Aug. 26 it set a record high of about $400 per coin, an increase of some 3,384% since Jan. 1. Dash's market capitalization briefly touched $3 billion over the weekend before settling back to about $2.8 billion in the early morning hours of Sunday.

"Given that this is a financial product, it's extremely important that we explore all avenues possible in order to make the network as secure as possible," Taylor said.

Dash is self-funded: The Dash community finances ongoing software and business development for the cryptocurrency with a portion of the new coins that are created at regular intervals through "block rewards." Dozens of developers and support staff are now on the team's payroll.

As the cryptocurrency's value mounts, the block rewards become more lucrative. That made it easy to set aside $200,000 for the bug bounty pool. The money will be shared among any researchers who detect and report a bug. The more severe the impact of that vulnerability, the higher the reward—up to $10,000 for the most critical flaws.

Bugcrowd plans to start small with the bounty program, initially revealing Dash's code only to a few dozen highly skilled security experts, before ramping it up over time. Ultimately, all of the 60,000 researchers in Bugcrowd's network will have a chance to participate.

To bankers, accustomed to the demands of proprietary software, the approach can only seem a radical one.

"Rather than trying to hide the flaws," Taylor said, "we try to give as many people as possible the opportunity to find them and then fix them."

Lessons for banks

This radical transparency has worked wonders for bitcoin.

Although the digital currency's network hasn't been compromised in years, says Taylor, in August 2010 there was an incident in which a hacker exploited a flaw in the code to create 92 billion bitcoins out of thin air—massively inflating the supply of a currency that was supposed to have a hard cap of 21 million. Bitcoin's pseudonymous creator, Satoshi Nakamoto, was forced to do an emergency "fork" of the code to fix the issue.

Since then, dozens of developers have improved upon and countless outsiders have examined the code. For a long time, Ellis himself was skeptical regarding bitcoin's security. He figured that a catastrophic exploit would be found sooner or later, and the cryptocurrency's value would drop to zero. But that never happened.

"The result is pretty astounding when you think about it. Bitcoin is completely open-source, yet the last significant hack of it took place [seven] years ago," Taylor said. "You end up with a highly secure system despite not funding any firewalls, not funding any security staff to try to prevent people from accessing it, not funding any detection systems. None of that is necessary if you design it in a way where it's essentially hack-proof."

While bitcoin wallets and bitcoin exchanges have been compromised many times, the network itself has proven to be a model of what the author Nassim Nicholas Taleb calls antifragility—it has become more resilient by withstanding attacks.

This sort of design ethos is anathema to banks, which have traditionally relied on secrecy—keeping their code private, whether it was developed in-house or written by vendors such as Fiserv, FIS or Jack Henry—and trying to deny access to hackers in order to keep their systems secure.

To be fair, this has been slowly changing in recent years as a number of banks, including Citigroup, BBVA, JPMorgan Chase, Wells Fargo and Capital One have opened up developer hubs that give third parties access to some of their code and data. Some large banks use bug bounty programs, though they don't like talking about them, and some are seriously testing and considering open-source blockchain technologies, including Hyperledger and Quorum, for certain purposes such as derivatives clearing. And there are a few open-source core banking initiatives, such as the Open Bank Project and Apache Fineract, though they haven't been widely adopted in the United States.

Yet even if they can't, or won't, fully adopt the open-source mindset of security through transparency, financial institutions can learn from its best practices. One step might be to embrace wholeheartedly the practice of rewarding coders for finding and patching bugs.

"Programmers like creating stuff," Taylor said. "It's far less sexy to comb through legacy code that has existed for years and attempt to find vulnerabilities in it. And it's unlikely that their bosses are going to pat them on the back for spending a chunk of time looking for bugs and not finding them. And if they do find them, [their managers] generally say, 'OK, great, good for you.' But there's no incentive there. If they fail to find anything, they're scolded; and if they do find something, it's viewed as luck."

Building bug-hunting bonuses into the pay structure of engineers, for instance, would send the message that software quality is more important than quantity.

"If you incentivize programmers to find and resolve bugs, it will change behavior," Taylor said.

Banks could also start open-sourcing certain parts of their systems, suggested Alex Waters, a former bitcoin quality assurance engineer and the chief technology officer of the stealth startup GetKelvin.

"There are aspects of their applications that probably should be open-source—things like authentication and communication," said Waters. "Which is not to say that they'd be open-sourcing the underlying data. Of course not. It's just they'd be making available for public review the methodology for authentication, for example."

Taylor agrees, with the caveat that any software providing a true competitive advantage should be kept under wraps. But for commoditized functions and services, banks could actually reduce their security risks by using open-source software, he said. "And I don't think that is ever really a consideration for them. I think they blindly use closed-source, or commercial, software for everything."

Nothing banks can't handle

Waters, who has consulted for banks, is convinced of the open-source approach's benefits.

"Generally speaking, large open-source projects are far more secure than in-house, private software," he said. "And within the realm of large open-source projects, cryptocurrencies—because of their inherent nature as being based on cryptography—tend to be the most secure, and security-conscious, groups."

What, then, of banks working with cryptocurrencies themselves? Asked whether financial institutions are right to be wary of these new technologies, since by and large they can't be centrally controlled, Bugcrowd's Ellis says no.

"I don't consider crypto to be a unique or a special case from a vulnerability standpoint," he said.

You can count on any software being attacked at some point, he clarified. What does make digital currency unique is that "the [monetary] value is inherent in the code," so major flaws in the code can be financially catastrophic. Extra care and attention is required, and that is where his company's crowdsourced security comes in.

"You don't build a three-foot fence to defend against a 10-foot attacker, because that would be ineffective," he said. "But you also don't build a 10-foot fence to defend against a three-foot attacker, because that would be economically irrational."

Ultimately, the security challenges posed by cryptocurrencies are nothing banks can't handle, Waters said, provided that they "apply everything they already know. What better industry to work on custody, settlement and clearing for cryptocurrencies than the banking industry, which has been doing [these things] for years? They're totally equipped to understand all of the various risks and how to mitigate them."

