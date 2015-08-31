(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require("./src/angular1-query-string");
module.exports = "angular1-query-string";
},{"./src/angular1-query-string":5}],2:[function(require,module,exports){
function isInFrame() {
	try {
		return window.self !== window.top;
	} catch (e) {
		return true;
	}
}

module.exports = isInFrame;
},{}],3:[function(require,module,exports){
'use strict';
var strictUriEncode = require('strict-uri-encode');

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str) {
	if (typeof str !== 'string') {
		return {};
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return {};
	}

	return str.split('&').reduce(function (ret, param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		var key = parts[0];
		var val = parts[1];

		key = decodeURIComponent(key);

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		if (!ret.hasOwnProperty(key)) {
			ret[key] = val;
		} else if (Array.isArray(ret[key])) {
			ret[key].push(val);
		} else {
			ret[key] = [ret[key], val];
		}

		return ret;
	}, {});
};

exports.stringify = function (obj) {
	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (Array.isArray(val)) {
			return val.sort().map(function (val2) {
				return strictUriEncode(key) + '=' + strictUriEncode(val2);
			}).join('&');
		}

		return strictUriEncode(key) + '=' + strictUriEncode(val);
	}).join('&') : '';
};

},{"strict-uri-encode":4}],4:[function(require,module,exports){
'use strict';
module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16);
	});
};

},{}],5:[function(require,module,exports){
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


(function() {
	angular
		.module("angular-query-string", ["ng"])
		.service("UrlQueryString", ["$window", urlQueryStringService]);
})();
},{"is-in-frame":2,"query-string":3}]},{},[1]);
