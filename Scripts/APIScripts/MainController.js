app.directive('singlelist', function () {
	return {
		restrict: 'E',
		scope: {
			mylist: '='
		},
		templateUrl: 'Scripts/APIScripts/DirectivesTemplates/SingleList.html'
	}
})


app.directive('tablelist', function () {
    return {
        restrict: 'E',
        scope: {
            mylist: '='
        },
        templateUrl: 'Scripts/APIScripts/DirectivesTemplates/TableList.html'
    }
})

//ui-router
app.config(function ($stateProvider) {
    var helloState = {
        name: 'hello',
        url: '/hello',
        template: '<h3>hello world!</h3>'
    }

    var aboutState = {
        name: 'about',
        url: '/about',
        templateUrl: './Scripts/Pages/about.html'
    }

    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
});

app.config(function ($routeProvider) {
    $routeProvider.
        when('/home', {
            controller: 'HomeController',
            templateUrl: './Scripts/Pages/home.html'
        }).
        when('/about', {
            templateUrl: './Scripts/Pages/about.html',
            controller: 'AboutController',
            controllerAs: 'AboutCtrl'
        }).
        otherwise({
            controller: 'HomeController',
            templateUrl: './Scripts/Pages/home.html'
        });
})

app.controller('HomeController', function () {
    console.log('--HomeController loaded!--');
})

app.controller('AboutController', function () {
    console.log('--AboutController loaded!--');
});

app.controller('BookController', function () {
    console.log('--BookController loaded!--');
});



