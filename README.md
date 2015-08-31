# Angular Query String
An angular service that easily allows you to extract a key/value pair from the URL query string.

## Install
Clone the repository and include directly into your project. You can also use bower and install as a dependency:

Add the dependency in your Angular's project dependency arguments:

```
var app = angular.module('MyApp', [
    'angular-query-string'
]);
```

## Usage
Dependency Injection Name: `urlQueryString`

```js
urlQueryString.<KEY>;

// http://cnn.com
urlQueryString.foo; // `undefined`

// http://cnn.com?
urlQueryString.foo; // `undefined`

// http://cnn.com?foo
urlQueryString.foo; // `null`

// http://cnn.com?foo=bar
urlQueryString.foo; // `'bar'`
```