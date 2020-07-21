var app = angular.module('app', [])
	.config(function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: '/app/views/main.html',
				controller: 'MainCtrl'
			});
	});
