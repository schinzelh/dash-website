/**
 * Created by cwilliams on 5/4/17.
 */
function formatNumber (num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

function formatCurrency (num,decimal) {
	var _decimal;
	_decimal = typeof decimal !== "undefined" ? decimal : 2;
	return parseFloat(num).toFixed(_decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
