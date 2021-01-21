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
});