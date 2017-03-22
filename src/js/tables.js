;(function ($) {
	'use strict';
	$(document).ready(function () {

		var siteApi = '/api/v1/';

		if($('#blocks').length){
		// Get the blockchain info
			$.ajax({
				url: siteApi+"chain/latestBlocks/"
			})
			.done(function(response){
				var blocks = response.blocks;

				blocks.map(function(block){
					var height 		= block.height,
						age 		= moment.unix(block.time).format("LLL"),
						txs 		= block.txlength,
						out 		= block.cbvalue,
						difficulty 	= block.difficulty;

					$("#blocks>tbody").append('<tr><td data-header="Height">' + height + '</td><td data-header="Block Time">' + age + '</td><td data-header="Transactions">' + txs + '</td><td data-header="Value Out">' + out + '</td><td data-header="Difficulty">' + difficulty + '</td></tr>');
				});
			});
		}

		if($('#exchanges').length){
			// Get the exchange data
			$.ajax({
				url: siteApi+"exchange/",
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log('errorThrown:');
				}
			})
			.done(function(response){
				var exchanges = response;

				exchanges.map(function(exchange){
					if(exchange){
						console.log('exchange',exchange);
						var name 	= exchange.exchange,
							url 	= exchange.url
							volume 	= "$" + formatCurrency(exchange.volume,0),
							price 	= "$" + formatCurrency(exchange.price),
							change 	= formatNumber(exchange.percent_change);

						$("#exchanges>tbody").append('<tr><td data-header="Exchange"><a target="_blank" href="' + url + '">' + name + '</a></td><td data-header="Volume (24h)">' + volume + '</td><td data-header="Price">' + price + '</td><td data-header="Volume (%)">' + change + '%</td></tr>');
					}
				});
			});
		}

		if($('#masternodes_count').length){
			// Get the current number of masternodes.
			$.ajax({
				url: siteApi+"masternodes/stats/"
			})
			.done(function(response){
				console.log('masternode stats', response.stats);
				var masternodes_count	= formatNumber(response.stats['count']),
					masternodes_max 	= formatNumber(response.stats['max']);

				$("#masternodes_count").text(masternodes_count);
				$("#masternodes_max").text(masternodes_max);
			});
		}

		if($('#budgets').length){
			// Get the budget proposals
			$.ajax({
				url: siteApi+"budgets/"
			})
			.done(function(response){
				var proposals = response.proposals;

				proposals.map(function(proposal){
					var	title 			= proposal.title ? proposal.title : proposal.name,
						url				= proposal.dw_url,
						owner 			= proposal.owner_username,
						votes_yes 		= proposal.yes,
						votes_no 		= proposal.no,
						required_votes 	= proposal.remaining_yes_votes_until_funding,
						amount_monthly 	= formatCurrency(proposal.monthly_amount)
						will_be_funded	= proposal.will_be_funded ? "yes" : "no";

					$("#budgets>tbody").append('<tr><td data-header="Title"><a href="' + url + '" target="_blank">' + title + '</a></td><td data-header="Owner">' + owner + '</td><td data-header="Votes (yes/no)">' + votes_yes + '/' + votes_no + '</td><td  data-header="Votes Required">' + required_votes + '</td><td data-header="Monthly Amount">' + amount_monthly + '</td><td data-header="Will be Funded">' + will_be_funded + '</td></tr>');

				});
			});
		}

	});
}(jQuery));


