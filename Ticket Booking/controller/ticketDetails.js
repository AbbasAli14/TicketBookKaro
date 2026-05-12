app.controller("ticketDetails", function ($scope, DataService, $rootScope) {
  //Get ticket details.
  $scope.ticketDetails = DataService.getData();

  //pushing the new user data to bookinghistory
  $rootScope.bookingHistory.push({
    username: user.username,
    movieName: $scope.ticketDetails.movieName,
    dateTime: `${$scope.ticketDetails.time}`,
    theatre: $scope.ticketDetails.theatre,
    price: $scope.ticketDetails.netTotal,
    noOfTickets: $scope.ticketDetails.seats.length,
    movieImage: $scope.ticketDetails.movieImage,
  });

  // const bgImage = $scope.ticketDetails.bgImage;
  // const element = document.querySelector("#blackBorder");
  // element.style.setProperty("--background-image-url", `url("${bgImage}")`);

  $scope.seats = "";
  for (i = 0; i < $scope.ticketDetails.seats.length; i++) {
    //Stores seat ID as a string
    $scope.seats += $scope.ticketDetails.seats[i] + " ";
  }
  //this function directs the page to home after clicking on go home button
  $scope.goHome = function () {
    window.location.href = "#/";
  };
});
