// Define an AngularJS controller named "myCtrl" and inject dependencies
app.controller(
  "myCtrl",
  function ($scope, $window, CssLoaderService, $rootScope, DataService, $http) {
    $scope.user = user;

    // Fetch user data from an external JSON file and store it in the root scope
    // $scope.loggedIn = function () {
    //   if (user) {
    //     // document.querySelector(".welcome-back").style =
    //     //   "transform = translateY(100%)";
    //     return true;
    //   }
    //   return false;
    // };

    $scope.getPageName = function () {
      let page = window.location.href.split("/").pop();
      return page;
    };
    $scope.getUserName = function () {
      if (user) {
        return user.username;
      }
      return "";
    };
    // $http
    //   .get("data/users.json")
    //   .then((res) => {
    //     $rootScope.users = res.data;
    //   })
    //   .catch((err) => {
    //     alert("Could not fetch the data.");
    //   });

    // Fetch booking history data from an external JSON file and store it in the root scope
    $http
      .get("data/bookingHistory.json")
      .then((res) => {
        $rootScope.bookingHistory = res.data;
      })
      .catch((err) => {
        alert("Could not fetch the data.");
      });

    // Set the "user" variable to the currently logged-in user (if any)
    $scope.user = user;

    // Function to change to the "Movies" page with a specified genre
    $scope.changeToMoviesPage = function (genre) {
      DataService.setData(genre);
      window.location.href = "#/movies";
    };

    // Function to handle navigation to different pages
    $scope.locationChange = function (link, movie) {
      movPag = "/";
      DataService.setData(movie);
      window.scrollTo(0, 0);
      page = link.split("/")[1];
      $window.location.href = link;
    };

    // Set the current page to be displayed
    $scope.page = page;

    // Function to change the current page and set it in both the controller and global scope
    $scope.changePage = function (Page, movie) {
      movPag = "movies";
      DataService.setData(movie);
      $scope.page = Page;
      page = Page;
    };

    // Function to handle navigation to different pages with user authentication check
    $scope.locationChange2 = function (link) {
      if (user) {
        page = link.split("/")[1];
        $window.location.href = link;
      } else {
        if (link.split("/")[1] !== "myAccount") {
          nextPage = link.split("/")[1];
        }
        page = "login&signup";
        $window.location.href = "#/login&signup";
      }
    };

    // Function to book a movie and navigate to the specified page
    $scope.bookNow = async function (Page, movie) {
      if (typeof movie === "string") {
        let movies;
        await $http
          .get("../../data/movielist.json")
          .then((res) => {
            movies = res.data;

            movie = movies.find((el) => el.movieName === movie);

            if (!movie) return;
          })
          .catch((err) => {
            alert("Could not fetch the data.");
          });
      }

      DataService.setData(movie);

      if (user) {
        $scope.page = Page;
        page = Page;
        $window.location.href = `#/${page}`;
      } else {
        nextPage = Page;
        page = "login&signup";
        $window.location.href = "#/login&signup";
      }
    };
    $scope.getMyAccountName = function () {
      if (user) {
        $scope.userHistory = $rootScope.bookingHistory.filter(
          (booking) => booking.username === user.username
        );
        return user.username;
      }
      return "Login";
    };
  }
);
