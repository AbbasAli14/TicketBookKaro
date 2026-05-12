app.controller('seats', function ($scope, DataService) {
    //Local Variables to create seat IDs
    $scope.totalSeats = [];
    $scope.seatRows = [];
    $scope.selectedSeats = [];
    //Getting ticket details from theatreDecide controller
    $scope.ticketDetails = DataService.getData();
    //Creation and storing of Seat IDs
    for (var i = 65; i <= 79; i++) {
        rowID = String.fromCharCode(i);
        for (var j = 1; j <= 25; j++) {
            if(j < 10){
                $scope.totalSeats.push({ rowID: rowID.concat("0", j), selected: 0, class: 'material-symbols-outlined' });
            }
            else{
                $scope.totalSeats.push({ rowID: rowID.concat(j), selected: 0, class: 'material-symbols-outlined' });
            }
        }
    }
    //Array to store an array of 25 seats (the Array of 25 seats makes one object and multiple such objects are stored)
    for (i = 0; i < $scope.totalSeats.length; i += 25) {
        $scope.seatRows.push($scope.totalSeats.slice(i, i + 25));
    }
    //When seat is clicked, depending on the condition, it's style is changed and it is either added to or removed from selectedSeats
    $scope.selectSeat = function (seat) {
        if (seat.selected === 0) {
            seat.class = 'material-symbols-outlined setStyle';
            seat.selected = 1;
            $scope.selectedSeats.push(seat.rowID);
        }
        else if (seat.selected === 1) {
            seat.class = 'material-symbols-outlined';
            seat.selected = 0;
            $scope.selectedSeats.splice($scope.selectedSeats.indexOf($scope.selectedSeats.find((selectCurr) => selectCurr == seat.rowID)), 1);
        }
    }
    //selectedSeats is added to ticketDetails.seats
    $scope.ticketDetails.seats = $scope.selectedSeats;
    //DataService used to send data to next controller
    $scope.sendData = function(newData){
        DataService.setData(newData);
    }
});
