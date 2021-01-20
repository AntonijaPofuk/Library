app.controller('APIController', function ($scope, $log, $filter, APIService, $window, editDialog, editBookDialog, addDialog, addBookDialog) {

    getAll();
    getAllBooks();
    $scope.editDialog = editDialog;
    $scope.editBookDialog = editBookDialog;
    $scope.addDialog = addDialog;     
    $scope.addBookDialog = addBookDialog;

    $scope.reset = function () {
        $scope.bookname = "";
        $scope.bookauthor = "";
        $scope.bookyear = "";

    }

    $scope.reset();

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
            console.log('Wee! We saved department data.')
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
            console.log('Wee! We saved book data.')
        }, function (error) {
            console.log('Oops! Something went wrong while saving the book data.')
        })
    };

   
    $scope.makeEditable = function (obj) {
        obj.target.setAttribute("contenteditable", true);
        obj.target.focus();
    };  

    $scope.updDepartOnClick = function (sub, eve) {
        sub.Name = eve.currentTarget.innerText;
        var upd = APIService.updateSubscriber(sub);
        upd.then(function (d) {
            getAll();
            console.log('Wee! We updated department data.')
        }, function (error) {
            console.log('Oops! Something went wrong while updating the department data.')
        })
    }; 
        
    $scope.updBookOnClick = function (sub, eve) {
        sub.Name = eve.currentTarget.innerText;
        var upd = APIService.updateBook(sub);
        upd.then(function (d) {
            getAllBooks();
            console.log('Wee! We updated book data.')
        }, function (error) {
            console.log('Oops! Something went wrong while updating the department data.')
        })
    }; 

    $scope.updDepart= function (sub) {
        var upd = APIService.updateSubscriber(sub);
        upd.then(function (d) {
            getAll();
            console.log('Wee! We updated department data.')
        }, function (error) {
            console.log('Oops! Something went wrong while updating the department data.')
        })
    }; 

    $scope.updBook= function (sub) {
        var upd = APIService.updateBook(sub);
        upd.then(function (d) {
            console.log('Wee! We updated book data.')
        }, function (error) {
            console.log('Oops! Something went wrong while updating the books data.'+error)
        })
    }; 


    $scope.deleteDepart = function (ID) {
        var dlt = APIService.deleteDepart(ID);
        dlt.then(function (d) {
            getAll();
            console.log('Wee! We deleted department data.')
        }, function (error) {
            console.log('Oops! Something went wrong while deleting the departmen data.')
        })
    }; 
    
    $scope.deleteBook = function (ID) {
    var dlt = APIService.deleteBook(ID);
    dlt.then(function (d) {
        getAllBooks();
        console.log('Wee! We deleted book data.')
    }, function (error) {
        console.log('Oops! Something went wrong while deleting the book data.')
    })
    };   

   
})  

app.filter('valueGreaterThan', function () {
    return function (input, mark) {
        var output = [];
        if (isNaN(mark)) {
            output = input;
        }
        else {
            angular.forEach(input, function (item) {
                if (item.Year > mark) {
                    output.push(item)
                }
            });
        }
        return output;
    }
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



