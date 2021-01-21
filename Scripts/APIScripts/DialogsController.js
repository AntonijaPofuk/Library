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


app.directive('editPerson', [function () {
    return {
        restrict: 'E',
        scope: {
            sub: '=',
        },
        template: `
                    <div id="tblSubs" ng-controller="APIController">
                    <p>Identificator<input readonly class="form-control" type="text" ng-model="sub.ID"></p> 
                    <p>Name <input class="form-control" type="text" ng-model="sub.Name"></p>  
                  <p>City <input class="form-control" type="text" ng-model="sub.City"></p>
                <button type="button" class="btn btn-success btn-sm" data-ng-click="updDepart(sub);">Submit</button>
                </div>
`,
    };
}]);


app.factory('editBookDialog', ['$rootScope', '$compile', '$window', function ($rootScope, $compile, $window) {
    var html = '<edit-book sub="sub"></edit-book>';
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


app.directive('editBook', [function () {
    return {
        restrict: 'E',
        scope: {
            sub: '=',
        },
        template: `
                    <div id="tblSubs" ng-controller="APIController">          
                    <p>Identificator<input readonly class="form-control" type="text" ng-model="sub.ID"></p> 
                    <p>Name <input class="form-control" type="text" ng-model="sub.Name"></p>  
                    <p>Author <input class="form-control" type="text" ng-model="sub.Author"></p>
                    <p>Year <input class="form-control" type="text" ng-model="sub.Year"></p>                   
                     Departmen: {{sub.Department=selectedDeparts.ID}}
                    <p>Select a department:</p>                 
                     <select ng-model="selectedDeparts">
                    <option data-ng-repeat="x in subscriber" ng-model="sub.Department" ng-value="{{x}}">{{x.Name}}</option>
                    </select>  
                <button type="button" class="btn btn-success btn-sm" data-ng-click="updBook(sub);">Submit</button>
                    </div>
   `,
    };
}]);


app.factory('addDialog', ['$rootScope', '$compile', '$window', function ($rootScope, $compile, $window) {
    var html = '<add-department sub="sub"></add-department>';
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

app.directive('addDepartment', [function () {
    return {
        restrict: 'E',
        scope: {
            sub: '=',
        },
        template: ` 
                <h4>Insert new department</h4>
                <div ng-controller="APIController" class="form-group">
                    <label for="departname">Name:</label>
                    <input type="text" class="form-control" id="departname" placeholder="Enter name" [required="string" ] data-ng-model="departname" />
                    <label for="departcity">City:</label>
                    <input type="text" class="form-control" id="departcity" placeholder="Enter city" [required="string" ] data-ng-model="departcity" />
                <button type="button" class="btn btn-success btn-xs" data-ng-click="saveSubs();">Submit</button>
            </div>
`,
    };
}]);


app.factory('addBookDialog', ['$rootScope', '$compile', '$window', function ($rootScope, $compile, $window) {
    var html = '<add-book sub="sub"></add-book>';
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

app.directive('addBook', [function () {
    return {
        restrict: 'E',
        scope: {
            sub: '=',
        },
        template: ` 
                <h4>Insert new book</h4>
                <div class="form-group" ng-controller="APIController">
                    <label for="bookname">Name:</label>
                    <input type="text" class="form-control" id="bookname" placeholder="Enter name" [required="string" ] data-ng-model="bookname" />
                    <label for="bookauthor">Author:</label>
                    <input type="text" class="form-control" id="bookauthor" placeholder="Enter author" [required="string" ] data-ng-model="bookauthor" />
                    <label for="bookyear">Year:</label>
                    <input type="text" class="form-control" id="bookyear" placeholder="Enter year" [required="string" ] data-ng-model="bookyear" />
                    <label for="bookdepart">Department:</label>
                    <select class="form-control" data-ng-model="bookdepart" id="bookdepart">
                        <option class="form-control" data-ng-repeat="x in subscriber" ng-model="sub.Department" ng-value="{{x.ID}}">{{x.Name}}</option>
                    </select>
                <button type="button" class="btn btn-success btn-xs" data-ng-click="saveBooks();">Submit</button>
            </div>
`,
    };
}]);