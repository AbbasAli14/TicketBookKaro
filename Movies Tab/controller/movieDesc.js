app.controller("movieDesc", function ($scope, DataService, $window) {
  // Set the page variable to 'movies'
  page = "movies";

  // Get movie data from DataService
  $scope.movie = DataService.getData();

  // Set background image using CSS custom property
  const bgImage = $scope.movie.bgImage;
  const element = document.querySelector("#blackBorder");
  element.style.setProperty("--background-image-url", `url("${bgImage}")`);

  // Initialize castMemberList
  $scope.castMemberList = [];
  $scope.goBack = function () {
    $window.location.href = `#/${movPag}`;
  };
  // Create castMemberList from movie data
  for (var i = 0; i < $scope.movie.castMembers.length; i++) {
    $scope.castMemberList.push({
      castMember: $scope.movie.castMembers[i],
      castMemberImage: $scope.movie.castMembersImages[i],
    });
  }
});
