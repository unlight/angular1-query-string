var isInFrame = require("is-in-frame");
var queryString = require("query-string");

function urlQueryStringService($window) {

	var output = {};
	var searchString;

	if (isInFrame()) {
		searchString = $window.top.location.search;
	} else {
		searchString = $window.location.search;
	}

	if (searchString.length > 0) {
		output = queryString.parse(searchString);
	}

	return output;
}

module.exports = urlQueryStringService;