/**
 * Created by cwilliams on 1/30/17.
 */

;(function ($) {
	'use strict';

	var _ = window._ || null,
		walletsCollectionByOs = window.walletsCollectionByOs || undefined,
		platform = window.platform || undefined
		;

	$(document).ready(function () {
		_ = window._ || null,
		walletsCollectionByOs = window.walletsCollectionByOs || undefined,
		platform = window.platform || undefined
		;

		if (typeof(walletsCollectionByOs) !== 'undefined' && walletsCollectionByOs) {
			initDownloadButton();
		}
		if ($('[data-wallet]').length) {
			initTileWallet();
		}
	});

	function getBestWalletMatch() {
		var _walletsCollection = _.flatten(walletsCollectionByOs.map(function (walletGroupCollection) {
				return walletGroupCollection.items;
			})),
			_family = platform && platform.os && platform.os.family,
			_vendor = 'dash_core',
			_productId = null,
			_walletOs = 'win32',
			_type = 'desktop',
			detectedWallet = {}
			;

		switch (true) {
			case /(^Mac OS X$|^OS X$|^Mac$|^Macintosh$)/.test(_family):
				_walletOs = 'osx';
				_vendor = 'dash_core';
				_type = 'desktop';
				break;
			case /android/gi.test(_family):
				_walletOs = 'android';
				_vendor = 'hash_engineering_solutions';
				_type = 'mobile';
				break;
			case /Windows/gi.test(_family):
				_walletOs = platform.os.architecture === 64 ? 'win64' : 'win32';
				_vendor = 'dash_core';
				_type = 'desktop';
				break;
			case /^ios/gi.test(_family):
				_walletOs = 'ios';
				_vendor = '';
				_type = '';
				break;
			case /(linux|centos|debian|fedora|freebsd|gentoo|haiku|kubuntu|openbsd|red hat|suse|ubuntu|cygwin)/gi.test(_family):
				_walletOs = 'linux';
				_productId = platform.os.architecture === 32 ? 'dash_core_linux_32' : 'dash_core_linux_64';
				_vendor = 'dash_core';
				_type = 'desktop';
				break;
			default:

				// do nothing;
				break;
		}

		if (_productId) {
			detectedWallet = _.find(_walletsCollection,{ product_id: _productId});
		} else {
			detectedWallet = _.find(_walletsCollection,{ os: _walletOs, vendor_id: _vendor, type: _type});
		}

		return detectedWallet;
	}

	function onDownloadClick(event) {
		var _dlButton = $(event.target),
			_linkTo = _dlButton.data('detectedWallet').links[0].url
		;

		window.open(_linkTo,'_blank');
	}

	function initDownloadButton() {
		var _downloadButton = $('#download-detected-platform-button'),
			_detectedWallet = getBestWalletMatch(),
			_notDetectedMessage = $('#platform-not-detected'),
			_platform = platform
			;
		console.log(_detectedWallet);
		if (_downloadButton && _downloadButton.length > 0) {
			if (_detectedWallet && _platform) {
				_downloadButton.html(_detectedWallet.name)
					.attr({
						title: _platform.os.toString()
					})
					.data('detectedWallet',_detectedWallet)
					.click(onDownloadClick)
					.show()
				;
				_notDetectedMessage.hide();
			} else {
				_downloadButton.hide();
				_notDetectedMessage.show();
			}
		}
		return _downloadButton;
	}

	function initTileWallet() {
		var _tile = $('[data-wallet="auto-detect"]'),
			_wallet = getBestWalletMatch();

		_tile.find('[data-wallet="os"]').html(_wallet.name);
		_tile.find('[data-wallet="img"]').attr('src', _wallet.logo_url);
		_tile.find('[data-wallet="version"]').html(_wallet.type + ' Wallet');
		_tile.find('[data-wallet="text"]').html(_wallet.description);
		_tile.find('[data-wallet="link"]').attr('href', _wallet.links[0].url);
	}

}(jQuery));
