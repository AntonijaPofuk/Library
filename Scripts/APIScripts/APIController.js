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

    $scope.selectedRow = null;  // initialize our variable to null
    $scope.setClickedRow = function (index) {  //function that sets the value of selectedRow to current index
        $scope.selectedRow = index;
    }


    $scope.idSelected = null;
    $scope.setSelected = function (idSelected) {
        $scope.idSelected = idSelected;
        console.log(idSelected);
    }

    function getAll() {
        var servCall = APIService.getSubs();
        servCall.then(function (d) {
            $scope.subscriber = d.data;
        }, function (error) {
            $log.error('Oops! Something went wrong while fetching the department data.')
        }
        );
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

    $scope.updDepart = function (sub) {
        var upd = APIService.updateSubscriber(sub);
        upd.then(function (d) {
            getAll();
            console.log('Wee! We updated department data.')
        }, function (error) {
            console.log('Oops! Something went wrong while updating the department data.')
        })
    };

    $scope.updBook = function (sub) {
        var upd = APIService.updateBook(sub);
        upd.then(function (d) {
            console.log('Wee! We updated book data.')
        }, function (error) {
            console.log('Oops! Something went wrong while updating the books data.' + error)
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
});





