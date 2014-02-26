var appApp = angular.module('collaboApp',[
    //'firebase',
    'ngRoute',
    'ngCookies',
    'appControllers'
]);
appApp.config(['$routeProvider',
	       function($routeProvider){
		   $routeProvider.		       
		       when('/',{
			   templateUrl:'partials/top.html',
			   controller: 'TopCtrl'
		       }).
		       when('/my/index',{
			   templateUrl:'partials/user/index.html',
			   controller: 'UserTopCtrl'
		       }).
/*
		       when('/brain/:roomID',{
			   templateUrl:'view/Storm.html',
			   controller: 'StormCtrl',
		       }).
		       when('/:roomID',{
			   templateUrl:'view/addUser.html',
			   controller: 'StormAddUserCtrl',
		       }).
		       */
		       otherwise({
			   redirectTo:'/'
		       });

	       }]);

