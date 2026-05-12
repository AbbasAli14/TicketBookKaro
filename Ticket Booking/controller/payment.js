app.controller("payment", function ($scope, DataService) {
  //Stores Month names which is used later to show date.
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  //Gets data of ticket details from seatSelection controller
  $scope.ticketDetails = DataService.getData();
  $scope.seats = "";
  for (i = 0; i < $scope.ticketDetails.seats.length; i++) {
    //Stores seat ID as a string
    $scope.seats += $scope.ticketDetails.seats[i] + " ";
  }
  //Gets date from ticketDetails.
  current_datetime = $scope.ticketDetails.date;
  //Format date for in DD-MMM-YYYY format
  let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear();
  //Update date in ticketDetails with formatted date
  $scope.ticketDetails.date = formatted_date;
  //Price Calculation
  $scope.subTotal = $scope.ticketDetails.price * $scope.ticketDetails.seats.length;
  $scope.convenienceFee = Math.round($scope.subTotal * 5) / 100;
  $scope.gst = Math.round(($scope.subTotal + $scope.convenienceFee) * 18) / 100;
  $scope.netTotal = $scope.subTotal + $scope.convenienceFee + $scope.gst;
  //Store netTotal in ticketDetails.netTotal
  $scope.ticketDetails.netTotal = $scope.netTotal;
});
