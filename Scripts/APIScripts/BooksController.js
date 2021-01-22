app.controller('BooksController', ['$scope', '$http', function ($scope, $http) {   
    $scope.books = {
        title: "Books I Need to Buy",
        list: []
    }

    $scope.rows = [
        { 'name': '', 'author': '', 'year': '' , 'departmen':''}      
    ]; 

    function hasOnlyNumbers(item) {
        return /^[0-9]*$/.test(item)
    }

    function getDataISDNTable(item) {
        var authors = item.authors;
        var name = item.title;
        var year = item.publishedDate;
        console.log("Data: " + name +authors+ year);
    }

    $scope.addItem = function (itemList, item, rows) {
        if ((item.length == 10 || item.length == 13) && hasOnlyNumbers(item)) {
            console.log("ISBN");
            //GET request from WEB API
            $http.get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + item).success(function (data) {
                itemList.push("Title: " + data.items[0].volumeInfo.title + " // Author(s):" + data.items[0].volumeInfo.authors + "// Year:" + data.items[0].volumeInfo.publishedDate)
                getDataISDNTable(data.items[0].volumeInfo);
                Object.assign(rows, { name: data.items[0].volumeInfo.title, author: data.items[0].volumeInfo.authors, year: data.items[0].volumeInfo.publishedDate, departmen: 0 });
              
            })
        } else {
            console.log("Not an ISBN")
            itemList.push(item);
        }
    }

}]);


