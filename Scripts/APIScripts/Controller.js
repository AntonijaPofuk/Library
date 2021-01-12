app.controller('APIController', function ($scope, APIService, editDialog, addDialog) {
    getAll();   

    $scope.editDialog = editDialog;
    $scope.addDialog = addDialog;

  

    function getAll() {
        var servCall = APIService.getSubs();
        servCall.then(function (d) {
            $scope.subscriber = d.data;
        }, function (error) {
            $log.error('Oops! Something went wrong while fetching the data.')
        })
    }

    $scope.saveSubs = function () {
        var sub = {
            Name: $scope.departname,
            City: $scope.departcity
        };
        var saveSubs = APIService.saveSubscriber(sub);
        saveSubs.then(function (d) {
            getAll();
        }, function (error) {
            console.log('Oops! Something went wrong while saving the data.')
        })
    };

    $scope.makeEditable = function (obj) {
        obj.target.setAttribute("contenteditable", true);
        obj.target.focus();
    };  

    $scope.updSubscriber = function (sub, eve) {
        sub.Name = eve.currentTarget.innerText;
        var upd = APIService.updateSubscriber(sub);
        upd.then(function (d) {
            getAll();
        }, function (error) {
            console.log('Oops! Something went wrong while updating the data.')
        })
    }; 

    $scope.deleteDepart = function (ID) {
        var dlt = APIService.deleteDepart(ID);
        dlt.then(function (d) {
            getAll();
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the data.')
        })
    }; 
    
})  

app.factory('editDialog', ['$rootScope', '$compile', '$window', function ($rootScope, $compile, $window) {
    var html = '<edit-person sub="sub"></edit-person>';
    var link = $compile(html); //compilation happens only once
    return {
        open: function (sub) {
            var scope = $rootScope.$new(true);
            scope.sub = sub;
            var w = $window.open('', '_blank', 'toolbar=0,width=300,height=200');
            link(scope, function (cloned, scope) {
                angular.element(w.document.body).append(cloned);
            });
        }
    };
}]);

app.factory('addDialog', ['$rootScope', '$compile', '$window', function ($rootScope, $compile, $window) {
    var html = '<add-person sub="sub"></add-person>';
    var link = $compile(html); 
    return {
        open: function (sub) {
            var scope = $rootScope.$new(true);
            scope.sub = sub;
            var w = $window.open('', '_blank', 'toolbar=0,width=300,height=200');
            link(scope, function (cloned, scope) {
                angular.element(w.document.body).append(cloned);
            });
        }
    };
}]);

app.directive('editPerson', [function () {
    return {
        restrict: 'E',
        scope: {
            sub: '=',
        },
        template: `<p>Identificator<input readonly class="form-control" type="text" ng-model="sub.ID"></p> 
                    <p>Name <input class="form-control" type="text" ng-model="sub.Name"></p>  
                  <p>City <input class="form-control" type="text" ng-model="sub.City"></p>   
`,
    };
}]);

app.directive('addPerson', [function () {
    return {
        restrict: 'E',
        scope: {
            sub: '=',
        },
        template: ` 
            <h4>Insert new department</h4>
        <div class="form-group">
            <label for="departname">Name:</label>
            <input type="text" class="form-control" id="departname" placeholder="Enter name" [required="string" ] data-ng-model="departname" />
            <label for="departcity">City:</label>
            <input type="text" class="form-control" id="departcity" placeholder="Enter city" [required="string" ] data-ng-model="departcity" />
        </div>
        <button type="button" class="btn btn-default" data-ng-click="saveSubs();">Submit</button>

`,
    };
}]);