// Define an AngularJS controller named "LoadingController" and inject dependencies
app.controller("LoadingController", function ($scope, $rootScope) {
  // Listen for the "$routeChangeStart" event triggered when a route change starts
  $rootScope.$on("$routeChangeStart", function () {
    // Set the "loading" flag to indicate that a route change is in progress
    $scope.loading = false;
  });

  // Listen for the "$routeChangeSuccess" event triggered when a route change is successful
  $rootScope.$on("$routeChangeSuccess", function () {
    // Set the "loading" flag to indicate that the route change is complete
    $scope.loading = true;
  });
});
