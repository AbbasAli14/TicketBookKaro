app.controller("myAccount", function ($scope, $rootScope, $http) {
  $scope.filePath = "";
  $scope.selectedTab = "home"; // Initialize the selected tab
  $scope.user = user; // Initialize user data

  $scope.selectedOption = ""; // Initialize selected option

  $scope.prevSel = "";
  // Function to show a specific option
  $scope.showOption = function (option) {
    if ($scope.prevSel) {
      document.querySelector(`#${$scope.prevSel}`).style.transform =
        "translateX(-2.03%)";
    }
    const li = document.querySelector(`#${option}`);
    li.style.transform = "translateX(0.03%)";
    $scope.selectedOption = option;
    $scope.prevSel = option;
  };

  // Function to select a tab
  $scope.selectTab = function (tab) {
    $scope.selectedTab = tab;
    $scope.selectedOption = ""; // Reset selected option when changing tabs
  };

  $scope.deleteReason = ""; // Initialize delete reason

  // Function to confirm account deletion
  $scope.confirmDelete = function () {
    counter = 1;
    // Handle the account deletion logic here
    const indexToDelete = $rootScope.users.findIndex(
      (User) => User.username === user.username
    );

    // Check if the user was found
    if (indexToDelete !== -1) {
      // Use splice to remove the user from the array
      $rootScope.users.splice(indexToDelete, 1);

      // Remove user's booking history
      $rootScope.bookingHistory = $rootScope.bookingHistory.filter(
        (booking) => booking.username !== user.username
      );

      user = undefined; // Clear the current user
      window.location.href = "#/"; // Redirect to the home page
    }

    // You can include code to send a request to your server to delete the account
    // Also, you can use $scope.deleteReason to capture the reason for deleting (if provided)

    // For demonstration purposes, we'll simply display a confirmation message here
    $rootScope.users.$scope.selectedOption = ""; // Hide the "Delete Account" section
    $scope.deleteReason = ""; // Reset the delete reason
    $scope.confirmationMessage = "Your account has been deleted.";
  };

  // Function to confirm user logout
  $scope.confirmLogout = function () {
    counter = 1;
    // Handle the log out logic here
    user = undefined; // Clear the current user
    window.location.href = "#/"; // Redirect to the home page

    // You can include code to clear user session, etc.

    // For demonstration purposes, we'll display a confirmation message here
    $scope.selectedOption = ""; // Hide the "Log Out" section
    $scope.logoutConfirmationMessage = "You have been logged out successfully.";
  };

  // Function to change user password
  $scope.changePassword = function () {
    $http({
      method: "POST",
      url: "http://127.0.0.1:5001/api/users/changePassword",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        user,
        oldPass: $scope.passwordOld,
        newPass: $scope.passwordNew,
        confPass: $scope.passwordConfirm,
      },
    })
      .then((res) => {
        $scope.passwordChangeMessage = "";
        console.log(res.data);
        user.password = res.data.password;
        $scope.passwordOld = "";
        $scope.passwordNew = "";
        $scope.passwordConfirm = "";
        $scope.passwordChangeMessage1 = true;
        setTimeout(() => {
          $scope.passwordChangeMessage1 = false;
        }, 5000);
      })
      .catch((err) => {
        $scope.passwordChangeMessage = err.data.message;
      });
    // if ($scope.passwordOld === user.password) {
    //   if (
    //     $scope.passwordNew === $scope.passwordConfirm &&
    //     $scope.passwordNew !== ""
    //   ) {
    //     let index = $rootScope.users.findIndex(
    //       (el) => el.username === user.username
    //     );
    //
    //   }
    // } else if ($scope.passwordOld !== user.password) {
    //   $scope.passwordChangeMessage =
    //     "Password doesn't match or old password is incorrect.";
    // }
  };

  // Function to get the current user's booking history
  $scope.currentUserBookingHistory = function () {
    let userHistory = $rootScope.bookingHistory.filter(
      (booking) => booking.username === user.username
    );

    return userHistory;
  };
  $scope.getDOB = function (date) {
    const monthArr = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.split("/")[0];
    const monthNum = date.split("/")[1];
    const month = monthArr[monthNum - 1];
    const year = date.split("/")[2];

    return `${day} ${month} ${year}`;
  };

  // const imgUploadInput = document.getElementById("input-file");
  // imgUploadInput.onchange = function () {
  //   console.log(imgUploadInput.files[0].);
  // };
});
