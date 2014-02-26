if(typeof app === 'undefined')
    var app = angular.module('appControllers',["firebase"]);

app.factory("DBService",
	    ["$firebase",
	     "$firebaseSimpleLogin",
	     function($firebase,$firebaseSimpleLogin){
		 var ref = new Firebase('https://googlehack-samui13db.firebaseio.com/');
		 var db = $firebase(ref);
		 var user = null;
		 var loginObj = null;
		 loginObj = $firebaseSimpleLogin(ref);
		 console.log(loginObj);
		 /*
		 loginObj.$createUser('ss.to13@gmail.com','aaabbb').then(function(err,data){
		     console.log(data);
		 }).catch(function(data){
		 });
		 */
		 /*
		 loginObj.$login('password', {
		     email: 'ss.to13@gmail.com',
		     password: 'aaabbb',
		 }).then(function(data){
		     user = data;
		 });
*/
		 return {
		     collaboAdd:function(userID,id){
			 var doto = db.$child('DoTo');
			 var data = doto.$child(id);
			 data.$add({
			     "userID":userID,
			 });
		     },
		     getLoginObj:function(){
			 return loginObj;
		     },
		     getTest:function(){
			 return user;
		     },
		     getDoTo:function(){
			 return db.$child('DoTo');
		     },
		     getTEST3:function(){
			 return db.$child('DoTo');
		     },
		     addDo:function(dotoText){
			 console.log('ID',loginObj.user.id);
			 var doto = db.$child('DoTo');
			 var log = doto.$add({
			     userID : loginObj.user.id,
			     text : dotoText,
			 });
			 return log;
		     },
		     initUser:function(mail,paswd){
			 loginObj = $firebaseSimpleLogin(ref);
		     },
		     login:function(mail,paswd){
			 var t = loginObj.$login('password', {
			     email: mail,
			     password: paswd,
			 }).then(function(data){
			     user = data;
			 });
			 return t;
		     },
		     setUser:function(mail,paswd){
			 console.log(loginObj.$createUser(mail,paswd));
			 var t = loginObj.$createUser(mail,paswd).then(function(data){
			     console.log(data);
			 }).finally(function(data){
			     console.log("Error",data);
			 });
			 console.log(t);
		     },
		     getUser:function(){
			 loginObj.$getCurrentUser().then(function(err,data) {
			     console.log(err);
			     console.log(data);
			     user = data;
			 });
		     },
		     getTest:function(){
			 return user;
		     },
		     /*
	getUser : function(mail,passwd){
	    var users = db.$child('users');
	    return users;
	    //var keys = users.$getIndex();
	    //console.log(keys);
	    /*
	    console.log(users.$getIndex());
	    
	    //var keys = users.$getIndex();
	    keys.forEach(function(key, i) {
		console.log(key);
		console.log(i, users.items[key]);
	    });
	    for(var key in users){
		console.log(key);
		//console.log(users[key]);
	    }


	    
	    /*
	    var keys = $scope.items.$getIndex();
	    keys.forEach(function(key, i) {
		console.log(i, $scope.items[key]); // prints items in order they appear in Firebase
	    });

	    //console.log(user);
	},
	setUser : function(mail,passwd){
	    var userDB = db.$child('users');
	    var user = userDB.$add({
		mail:mail,
		password:passwd
	    });
	    return user;
	    
	}
		 */
    }
}]);
app.controller('UserTopCtrl',
	       ['$scope',
		"DBService",
		function($scope,service){
		    $scope.user = service.getTest();
		    //service.getLoginObj.$bind($scope, "user");
		    $scope.want_do = function(){
			service.addDo(this.doto);
		    };
		    $scope.dotolist = service.getDoTo();
		    $scope.test3 = service.getDoTo().$getIndex();
		    $scope.test = service.getTest();
		    $scope.test2 = function(){
			$scope.test = service.getTest().id;
			console.log($scope.test.id);			
		    }
		    
		    $scope.play = function(ID){
			console.log(ID);
			console.log(service.getTest());
			var data = service.getTEST3();
			var keys = service.getTEST3().$getIndex();
			//console.log(service.getTest());
			service.collaboAdd(1,
					   ID);
		    };

		    $scope.ageFilter = function (criteria) {
			
}
/*
		    $scope.filt = function(func){
			return function(item){
			    
			}
		    }
		    */
/*
		    rootScope.not = function(func) {
    return function (item) { 
        return !func(item); 
    }
};
*/

		}]);
app.controller('TopCtrl',
	       ['$scope',"DBService","$location",
		function($scope,service,$location){
		    $scope.title = 'TEST';
		    service.initUser();
		    
		    //service.setUser('ss.to13@gmail.com','aaabbb');
		    $scope.create_user = function(){
			service.setUser(this.name,this.passwd);
			$location.path("/my/index");
		    }
		    $scope.login = function(){
			service.login(this.name,this.passwd);
			$location.path("/my/index");
		    }
		    //service.login('ss.to13@gmail.com','aaabbb');
		    //$scope.users = service.getUser('ss.to13@gmail.com','aaabbb');
		    
		    
		}]);

/*
storm.factory("RoomService",function(){
    var ref = new Firebase("https://localbrainst-samui13.firebaseio.com/rooms/"+$scope.roomID);
    
});
*/
/*
storm.controller('StormAddUserCtrl',
			    ['$scope','$location','$routeParams','$cookies','$cookieStore',
			     function($scope,$location,$routeParams,$cookies,$cookieStore){
				 $scope.title = 'TEST'
				 $scope.roomID = $routeParams.roomID;
				
				$scope.submit = function(){
				    $cookies[$scope.roomID+'.name'] = this.content;
				    $location.path("brain/"+$scope.roomID);
				    
				}
			    }]);
// brain/:hash
storm.controller('StormCtrl',
			    ['$scope','$http','$routeParams','$cookies','$firebase',
			     function($scope,$http,$routeParams,$cookies,$firebase){
				console.log($cookies);
				// ここはえらーしょりなくてもいいかも
				$scope.roomID = $routeParams.roomID;
				// Serviceにかくべき。
				 var ref = new Firebase("https://localbrainst-samui13.firebaseio.com/rooms/"+$scope.roomID);
				 var angdb = $firebase(ref);
				$scope.users = angdb.$child("members");
				$scope.theme = angdb.$child('theme');
				$scope.postits = angdb.$child('postits');
				$scope.gropus = angdb.$child('groups');
				 // えらーしょりひつよう
				 // User Add してないなら；／／／
				$scope.user =  $cookies[$scope.roomID+'.name'];
				if(typeof $scope.roomID !== 'undefined'){
				    //redirect
				    
				}
				DB.connectRoom($scope.roomID);
				
				//$scope.theme = 'None';
				$scope.addPostIt = function(){
				    userUI.addPostIt($scope.roomID);
				}
				$scope.addGroup = function(){
				    
				    userUI.addGroup(0,0,100,100,'red','None');
				}
				$scope.viewSheet = function(){
				    userUI.viewSheet()
				}

				angular.element(document).ready(function() {
				    //testData();
				});
				$scope.func = function(){
				    $scope.test = DB.test;
				    //DB.data.roomTheme = '';
				}
				/*
				$scope.$watch(function(){
				    return DB.test;
				},function(newVal,oldAval){
				    console.log('Called');
				    console.log(newVal,oldAval);
				});
				
				$scope.$watch(function(){
				    return DB.data.roomTheme;
				},function(newVal,oldVal){
				    //$scope.theme = DB.data.roomTheme;
				});

			    }]);
storm.controller('StormMakeCtrl',
			    ['$scope','$http','$cookies','$location','$firebase',
			     function($scope,$http,$cookies,$location,$firebase){
				 $scope.text = 'TEXT';
				 $scope.abs = 'ASDFASF';
				 $cookies.abs = 'gs';
				 $scope.submit = function(){

				     var ref = new Firebase("https://localbrainst-samui13.firebaseio.com/rooms/");				     
				     var rooms = $firebase(ref);
				     var room = ref.push({
					 theme:this.theme
				     });
				     //rooms.child(room.name);
				     var memberData = room.child('members').push({
					 name:this.name,
					 color:'test',
					 owner_flag:'true'
				     });
				     var groupsRef = room.child('groups');
				     var data = {};
				     data.ID = room.name();
				     data.membder_id = memberData.name();
				     
				     //this.text
				     //var data = userUI.createRoom(this.theme,this.name);

				     $cookies[data.ID+'.name'] = this.name;
				     $cookies[data.ID+'.member_id'] = data.member_id;
				     $cookies[data.ID+'.title'] = 'test';
				     $cookies[data.ID+'.color'] = 'test';
				     $cookies[data.ID+'.flag'] = 'true';
				     $location.path("/brain/"+data.ID);

				 };
			     }]);

 

*/
