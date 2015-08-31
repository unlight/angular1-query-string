(function() {
	var urlQueryStringService = require("./urlQueryStringService");
	angular
		.module("angular-query-string", ["ng"])
		.service("UrlQueryString", ["$window", urlQueryStringService]);
})();