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
        var authors = item.volumeInfo.authors;
        var name = item.volumeInfo.title;
        var year = item.publishedDate;
        console.log("Data: " + name + authors + year);
      
    }

    $scope.addItem = function (itemList, item, rows, tableList) {
        if ((item.length == 10 || item.length == 13) && hasOnlyNumbers(item)) {
            console.log("ISBN");
            //GET request from WEB API
            $http.get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + item).success(function (data) {
                itemList.push("Title: " + data.items[0].volumeInfo.title + " // Author(s):" + data.items[0].volumeInfo.authors + "// Year:" + data.items[0].volumeInfo.publishedDate)
                getDataISDNTable(data.items[0]);
                var b = {
                    ID: data.items[0].volumeInfo.industryIdentifiers[0].identifier,
                    Name: data.items[0].volumeInfo.title,
                    Author: data.items[0].volumeInfo.authors,
                    Year: data.items[0].volumeInfo.publishedDate,
                    Departmen: 33
                };
                console.log("Item: " + b.Name + b.Author + b.Year + b.ID);
                itemList.push(b);
            })
        } else {
            console.log("Not an ISBN")
            itemList.push(item);
        }
    }

}]);


