app.controller("login&signup", function ($scope, $window, $rootScope, $http) {

  $scope.showError = false;
  $scope.errorMsg = "";
  $scope.login_signup = "Login";
  $scope.showError2 = false;

  $scope.toggleLoginSignup = function () {

    if ($scope.login_signup === "Login") {
      $scope.login_signup = "Signup";
      document.querySelector(".loginSignupDeciderContainer").style = "top: 90%";
    } else {
      $scope.login_signup = "Login";
      document.querySelector(".loginSignupDeciderContainer").style = "top: 80%";
    }
  };

  // ✅ JSON ONLY login/signup
  $scope.getUser = function () {

    $http.get("data/users.json").then((res) => {

      let users = res.data;

      if ($scope.login_signup === "Login") {

        let foundUser = users.find((el) => {
          return (
            el.username === $scope.username &&
            el.password === $scope.password
          );
        });

        if (foundUser) {
          user = foundUser;
          page = nextPage;
          $window.location.href = `#/${page}`;
          $rootScope.loggedIn = true;
        } else {
          $scope.showError = true;
          $scope.errorMsg = "*Invalid Username or Password*";
        }

      } else {

        const dob = $scope.birthday;
        const yyyy = dob.getFullYear();
        let mm = dob.getMonth() + 1;
        let dd = dob.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        let birthday = dd + "/" + mm + "/" + yyyy;

        let newUser = {
          username: $scope.NewUsername,
          email: $scope.email,
          name: $scope.name,
          password: $scope.NewPassword,
          dob: birthday,
        };

        users.push(newUser);

        alert("Signup successful (temporary — JSON cannot save permanently)");

        user = newUser;
        page = nextPage;
        $window.location.href = `#/${page}`;
        $rootScope.loggedIn = true;
      }

    });
  };
});