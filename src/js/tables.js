;(function ($) {
	'use strict';
	$(document).ready(function () {

		var siteApi = window.globals.siteApi || '/api/v1',
			marketCapApi = 'https://www.coincap.io/front/',
			resultExchanges,
			exchangesApi = siteApi + '/exchange';

		if ($('#getDashTable').length) {
			$.ajax({
				url: exchangesApi,
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log('errorThrown:', errorThrown);
				}
			}).done(function(json) {
				resultExchanges = json;
				$('[data-name]').each(function() {
					var that = $(this),
						exchangeName = that.data('name'),
						resultName = resultExchanges.filter(function(el) {
							return el.exchange === exchangeName;
						}),
						$result = that.find('[data-price="result"]');

					if (resultName[0] && resultName[0].price !== 'undefined') {
						that.find('[data-price="click"]').addClass('hidden');
						$result.removeClass('hidden').find('[data-rate="rate"]').text(formatCurrency(resultName[0].price));
						if (resultName[0].volume) {
							$result.find('[data-rate="volume"]').text(formatCurrency(resultName[0].volume));
						} else {
							$result.find('.js-dash-table-volume').addClass('hidden');
						}
					}
				});
			});

			var getRows = function() {
					var $typeClass = $('#type').val() === 'all' ? '' : '.js-type-' + $('#type').val(),
						$methodClass = $('#method').val() === 'all' ? '' : '.js-' + $('#method').val(),
						$currencyClass = $('#currency').val() === 'all' ? '' : '.js-' + $('#currency').val(),
						$resultClass = $typeClass + $methodClass + $currencyClass;

					return $resultClass;
				},
				showMethod = function(selectedMethod) {
					$('#method option').hide();
					$('#method').find('option').filter(function() {
						if ($(this).data('method') !== 'undefined') {
							var method = $(this).data('method');

							return selectedMethod.indexOf(method) !== -1;
						}
					}).show();
				};

			$('select').on('change', function() {
				var $resultRow = getRows();

				$('.js-exchange-row').hide();
				if (!$resultRow) {
					$('.js-exchange-row:hidden').slice(0, 6).show();
					$('[data-btn="show-more"]').removeClass('hidden');
				} else {
					$($resultRow).slice(0, 6).show();
				}
			});
			$('select#currency').on('change', function() {
				if ($(this).val() === 'all') {
					$('#method option').show();
				} else {
					var methods = $(this).find(':selected').data('method') + 'all'.split(' ').filter(String);

					showMethod(methods);
				}
			});

			$('[data-btn="show-more"]').on('click', function() {
				var $resultRow = getRows();

				if (!$resultRow) {
					$('.js-exchange-row:hidden').slice(0, 6).show();
				} else {
					$($resultRow + ':hidden').slice(0, 6).show();
				}
				if (!$('.js-exchange-row:hidden').length || !$($resultRow + ':hidden').length) {
					$(this).addClass('hidden');
				}
			});
		}

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
				url: exchangesApi,
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log('errorThrown:',errorThrown);
				}
			})
			.done(function(response) {
				var exchanges = response;

				exchanges.map(function(exchange) {
					if (exchange && exchange.volume && exchange.price && exchange.percent_change) {
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

	function formatNumber(num) {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	}

	function formatCurrency(num,decimal) {
		var _decimal;

		_decimal = typeof decimal !== 'undefined' ? decimal : 2;
		return parseFloat(num).toFixed(_decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	}
}(jQuery));


