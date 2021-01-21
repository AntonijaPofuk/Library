app.controller('BooksController', ['$scope', '$http', function ($scope, $http) {
   
    $scope.books = {
        title: "Books I Need to Buy",
        list: []
    }

    function hasOnlyNumbers(item) {
        return /^[0-9]*$/.test(item)
    }

    $scope.addItem = function (itemList, item) {
        if ((item.length == 10 || item.length == 13) && hasOnlyNumbers(item)) {
            console.log("ISBN");
            //GET request from WEB API
            $http.get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + item).success(function (data) {
                itemList.push("Title: " + data.items[0].volumeInfo.title + " // Author(s):" + data.items[0].volumeInfo.authors + "// Year:" + data.items[0].volumeInfo.publishedDate)
            })
        } else {
            console.log("Not an ISBN")
            itemList.push(item);
        }
    }

}]);
