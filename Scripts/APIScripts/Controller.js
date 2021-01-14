app.controller('APIController', function ($scope, $log, $filter, APIService, $window, editDialog, editBookDialog, addDialog) {

    getAll();
    getAllBooks();

    $scope.editDialog = editDialog;
    $scope.editBookDialog = editBookDialog;

    $scope.addDialog = addDialog;     

    function getAll() {
        var servCall = APIService.getSubs();
        servCall.then(function (d) {
            $scope.subscriber = d.data;
        }, function (error) {
            $log.error('Oops! Something went wrong while fetching the department data.')
        } 
        );
    }

    $scope.selectedRow = null;  // initialize our variable to null
    $scope.setClickedRow = function (index) {  //function that sets the value of selectedRow to current index
        $scope.selectedRow = index;
    }


    $scope.idSelected = null;
    $scope.setSelected = function (idSelected) {
        $scope.idSelected = idSelected;
        console.log(idSelected);
    }

    function getAllBooks() {
        var servCall = APIService.getBooks();
        servCall.then(function (d) {
            $scope.book_v = d.data;
        }, function (error) {
            $log.error('Oops! Something went wrong while fetching the book data.')
        }
        );
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
            console.log('Oops! Something went wrong while saving the department data.')
        })
    };


    $scope.saveBooks = function () {
        var sub = {
            Name: $scope.bookname,
            Author: $scope.bookauthor,
            Year: $scope.bookyear,
            Department: $scope.bookdepart
        };
        var saveBooks = APIService.saveBooksPost(sub);
        saveBooks.then(function (d) {
            getAllBooks();
        }, function (error) {
            console.log('Oops! Something went wrong while saving the book data.')
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
    
        $scope.deleteBook = function (ID) {
        var dlt = APIService.deleteBook(ID);
        dlt.then(function (d) {
            getAllBooks();
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the data.')
        })
    };   

    $scope.data = {
        singleSelect: null,
        multipleSelect: [],
        option1: 'option-1'
    };

    $scope.forceUnknownOption = function () {
        $scope.data.singleSelect = 'nonsense';
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
        template: `<h4>Insert new department</h4>
                <div class="form-group">
                    <label for="departname">Name:</label>
                    <input type="text" class="form-control" id="departname" placeholder="Enter name" [required="string" ] data-ng-model="departname" />
                    <label for="departcity">City:</label>
                    <input type="text" class="form-control" id="departcity" placeholder="Enter city" [required="string" ] data-ng-model="departcity" />
                </div>
                <button type="button" class="btn btn-success btn-sm" data-ng-click="saveSubs();">Submit</button>
                <button type="button" class="btn btn-success btn-sm" ng-click="addDialog.open()">Add new department</button>
`,
    };
}]);

app.directive('editBook', [function () {
    return {
        restrict: 'E',
        scope: {
            sub: '=',
        },
        template: `
                    <div ng-app="app" ng-controller="APIController">
                    <p>Identificator<input readonly class="form-control" type="text" ng-model="sub.ID"></p> 
                    <p>Name <input class="form-control" type="text" ng-model="sub.Name"></p>  
                    <p>Author <input class="form-control" type="text" ng-model="sub.Author"></p>
                    <p>Year <input class="form-control" type="text" ng-model="sub.Year"></p>                   
                     Departmen: {{sub.Department=selectedDeparts.ID}}
                    <p>Select a department:</p>                 
                     <select ng-model="selectedDeparts">
                    <option data-ng-repeat="x in subscriber" ng-model="sub.Department" ng-value="{{x}}">{{x.Name}}</option>
                    </select>    
                    </div>
   `, };
}]);

