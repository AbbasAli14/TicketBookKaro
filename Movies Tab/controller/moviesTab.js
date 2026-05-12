app.controller(
  "movies",
  function ($scope, $http, $rootScope, $filter, DataService) {
    page = "";

    $scope.fullSizeArr = [];
    $scope.selectedTab = "home";
    $scope.selectedGenre = "";
    $scope.selectedOption = "";

    $scope.showOption = function (option) {
      $scope.selectedOption = option;
    };

    $scope.selectTab = function (tab) {
      $scope.selectedTab = tab;
      $scope.selectedOption = "";
    };

    // ✅ JSON based loading (NO API)
    $http
      .get("data/movielist.json")
      .then((res) => {
        $scope.movies = res.data;
        $scope.fullSizeArr = $scope.movies.slice();
        $scope.numMovies = $scope.fullSizeArr.slice(0, 12);
      })
      .catch(() => {
        alert("Could not fetch the data.");
      });

    $scope.getNumOfMovies = function (page) {
      $scope.numMovies = $scope.fullSizeArr.slice((page - 1) * 12, page * 12);
    };

    $scope.selectedSortOption = "";
    $scope.sortOrder = false;

    $scope.toggleSortOrder = function () {
      $scope.sortOrder = !$scope.sortOrder;
    };

    $scope.selectedGenre = "AllMovies";

    $scope.filterByGenre = function (genre) {
      $scope.selectedGenre = genre;
    };

    $scope.pagButtonsNumber = function () {
      let arr = [];
      for (let i = 0; i < $scope.fullSizeArr.length / 12; i++) {
        arr[i] = i + 1;
      }
      return arr;
    };

    $scope.filterArr = function (genre) {
      $scope.selectedGenre = genre;

      if (genre === "AllMovies") {
        $scope.fullSizeArr = $scope.movies.slice();
        $scope.getNumOfMovies(1);
        document.getElementById("sortSelect").selectedIndex = 0;
        return;
      }

      let newArr = $scope.movies.filter(
        (el) => el.genre === $scope.selectedGenre
      );

      $scope.fullSizeArr = newArr.slice();
      $scope.getNumOfMovies(1);
      document.getElementById("sortSelect").selectedIndex = 0;
    };

    $scope.sortBy = function (param) {
      if (param === "Name") {
        $scope.fullSizeArr.sort((a, b) => {
          const nameA = a.movieName.toUpperCase();
          const nameB = b.movieName.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        $scope.getNumOfMovies(1);
      } else if (param === "Rating") {
        $scope.fullSizeArr.sort((a, b) => b.rating - a.rating);
        $scope.getNumOfMovies(1);
      }
    };

    $scope.$watch("$root.searchText", function () {
      if ($rootScope.searchText !== "") {
        $scope.filterArr($scope.selectedGenre);

        document.getElementById("sortSelect").selectedIndex = 0;

        let newArr = $filter("filter")($scope.fullSizeArr, function (item) {
          var movieName = item.movieName.toLowerCase();
          var search = $rootScope.searchText.toLowerCase();
          if (movieName.includes(search)) {
            return item;
          }
        });

        $scope.fullSizeArr = newArr.slice();
        $scope.getNumOfMovies(1);
      } else {
        $scope.filterArr($scope.selectedGenre);
      }
    });

    $scope.getMovie = function (movie) {
      DataService.setData(movie);
    };
  }
);