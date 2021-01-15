app.service("APIService", function ($http) {

    this.getSubs = function () {
        return $http.get("api/Departmen")
    };

    this.saveSubscriber = function (sub) {
        return $http(
            {
                method: 'post',
                data: sub,
                url: 'api/Departmen'
            });
    }   

    this.saveBooksPost = function (sub) {
        return $http(
            {
                method: 'post',
                data: sub,
                url: 'api/Book'
            });
    }

    this.updateSubscriber = function (sub) {
        return $http(
            {
                method: 'put',
                data: sub,
                url: 'api/Departmen'
            });
    }   
    this.deleteDepart = function (ID) {
        var url = 'api/Departmen/' + ID;
        return $http(
            {
                method: 'delete',
                data: ID,
                url: url
            });
    } 

    this.getBooks = function () {
        return $http.get("api/Book")
    };

    this.updateBook = function (book) {
        return $http(
            {
                method: 'put',
                data: book,
                url: 'api/Book'
            });
    }
    this.deleteBook = function (ID) {
        var url = 'api/Book/' + ID;
        return $http(
            {
                method: 'delete',
                data: ID,
                url: url
            });
    } 

}); 