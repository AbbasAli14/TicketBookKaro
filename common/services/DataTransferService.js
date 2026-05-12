//Service to transfer data from one controller to another
app.service('DataService', function () {
    //Local Variable to store data
    var data = {};

    return {
        //Function to send data to a controller
        getData: function () {
            return data;
        },
        //Function to get data from a controller and store it in local variable
        setData: function (newData) {
            data = newData;
        }
    };
});
