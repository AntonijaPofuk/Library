app.service("APIService", function ($http) {
    this.getSubs = function () {
        return $http.get("api/Departmen")
    }

    this.saveSubscriber = function (sub) {
        return $http(
            {
                method: 'post',
                data: sub,
                url: 'api/Departmen'
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
}); 