;(function ($) {
	'use strict';
	$(document).ready(function () {

		var siteApi = window.globals.siteApi || '/api/v1',
			marketCapApi = 'https://www.coincap.io/front/';

		if ($('#marketcap_count').length) {

			$.ajax({
				url: marketCapApi,
				dataType: 'jsonp'
			}).done(function(json) {
				var $dash = 'DASH',
					result = json.filter(function(itm) {
						return $dash.indexOf(itm.short) > -1;
					}),
					num = result[0].mktcap.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

				$('#marketcap_count').text(num);
			});
		}

		if ($('#blocks').length) {

			// Get the blockchain info
			$.ajax({
				url: siteApi + '/chain/latestBlocks/'
			})
			.done(function(response) {
				var blocks = response.blocks;

				blocks.map(function(block) {
					var height 		= block.height,
						age 		= moment.unix(block.time).format('LLL'),
						txs 		= block.txlength,
						out 		= block.cbvalue,
						difficulty 	= block.difficulty;

					$('#blocks>tbody').append('<tr><td data-header="Height">' + height + '</td><td data-header="Block Time">' + age + '</td><td data-header="Transactions">' + txs + '</td><td data-header="Value Out">' + out + '</td><td data-header="Difficulty">' + difficulty + '</td></tr>');
				});
			});
		}

		if ($('#exchanges').length) {

			// Get the exchange data
			$.ajax({
				url: siteApi + '/exchange/',
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log('errorThrown:',errorThrown);
				}
			})
			.done(function(response) {
				var exchanges = response;

				exchanges.map(function(exchange) {
					if (exchange) {
						console.log('exchange',exchange);
						var name 	= exchange.exchange,
							url 	= exchange.url,
							volume 	= '$' + formatCurrency(exchange.volume,0),
							price 	= '$' + formatCurrency(exchange.price),
							change 	= formatNumber(exchange.percent_change);

						$('#exchanges>tbody').append('<tr><td data-header="Exchange"><a target="_blank" href="' + url + '">' + name + '</a></td><td data-header="Volume (24h)">' + volume + '</td><td data-header="Price">' + price + '</td><td data-header="Volume (%)">' + change + '%</td></tr>');
					}
				});
			});
		}

		if ($('#masternodes_count').length && $('#masternodes_count').length) {

			// Get the current number of masternodes.
			$.ajax({
				url: siteApi + '/masternodes/stats/'
			})
			.done(function(response) {
				console.log('masternode stats', response.stats);
				var masternodesCount	= formatNumber(response.stats.count),
					masternodesMax 	= formatNumber(response.stats.max);

				$('#masternodes_count').text(masternodesCount);
				$('#masternodes_max').text(masternodesMax);
			});
		}

		if ($('#budgets').length) {

			// Get the budget proposals
			$.ajax({
				url: siteApi + '/budgets/'
			})
			.done(function(response) {
				var proposals = response.proposals;

				proposals.map(function(proposal) {
					var	title 			= proposal.title ? proposal.title : proposal.name,
						url				= proposal.dw_url,
						owner 			= proposal.owner_username,
						votesYes 		= proposal.yes,
						votesNo 		= proposal.no,
						requiredVotes 	= proposal.remaining_yes_votes_until_funding,
						amountMonthly 	= formatCurrency(proposal.monthly_amount),
						willBeFunded	= proposal.will_be_funded ? 'yes' : 'no';

					$('#budgets>tbody').append('<tr><td data-header="Title"><a href="' + url + '" target="_blank">' + title + '</a></td><td data-header="Owner">' + owner + '</td><td data-header="Votes (yes/no)">' + votesYes + '/' + votesNo + '</td><td  data-header="Votes Required">' + requiredVotes + '</td><td data-header="Monthly Amount">' + amountMonthly + '</td><td data-header="Will be Funded">' + willBeFunded + '</td></tr>');

				});
			});
		}

	});
}(jQuery));


