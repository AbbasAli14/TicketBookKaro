app.controller("theatreDecide", function ($scope, DataService) {
  //name and details of theatres
  $scope.theatres = [
    {
      name: "Inox",
      image: "/images/Theatres/inox.jpg",
      times: ["10:00 AM", "2:00 PM", "7:00 PM"],
    },
    {
      name: "PVR",
      image: "/images/Theatres/PVR cinemas.jpg",
      times: ["10:00 AM", "2:00 PM", "7:00 PM"],
    },
    {
      name: "Cinepolis",
      image: "/images/Theatres/cinepolis.jpg",
      times: ["10:00 AM", "2:00 PM", "7:00 PM"],
    },
    {
      name: "City Pride",
      image: "/images/Theatres/city pride.jpg",
      times: ["10:00 AM", "2:00 PM", "7:00 PM"],
    },
  ];

  $scope.selectedTime = null; // Initialize selectedTime

  $scope.selectTime = function (time) {
    $scope.selectedTime = $scope.selectedTime === time ? null : time; // Toggle selection
  };
  //Getting movie details of chosen movie
  $scope.movie = DataService.getData();
  //Details are updated to movie such as chosen theatre, date and time
  $scope.bookTicket = function (theatre, date, time) {
    if (theatre === "" || date === undefined || time === null) {
      $scope.errTheatre = "Please select all the fields!";
      return;
    }
    $scope.movie.theatre = theatre;
    $scope.movie.date = date;
    $scope.movie.time = time;
    //bookNow function is called
    $scope.bookNow("seatSelection", $scope.movie);
  };
  //Working of the cross button
  document.querySelector(".go-back").addEventListener("click", function () {
    window.location.href = "#/";
  });
});
