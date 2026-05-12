//defining the global variables
let page = "home";
let nextPage = "";
let movPag = "";
let user;

window.addEventListener("popstate", function () {
  window.scrollTo(0, 0);
});

//function to load css
function loadCSSResolver(cssFilePath) {
  return function ($q, $rootScope) {
    var deferred = $q.defer();

    var link = document.createElement("link");
    link.href = cssFilePath;
    link.rel = "stylesheet";

    link.onload = function () {
      $rootScope.$apply(function () {
        deferred.resolve();
      });
    };

    link.onerror = function () {
      deferred.reject();
    };

    var existingLinks = document.head.querySelectorAll(
      "link[rel='stylesheet']"
    );
    existingLinks.forEach(function (existingLink) {
      existingLink.parentNode.removeChild(existingLink);
    });

    document.head.appendChild(link);
    return deferred.promise;
  };
}

//defining the app
var app = angular.module("myApp", ["ngRoute"]);

//defining the routes
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/Homepage/views/home.html",
      controller: "homepage",
      resolve: {
        loadCSS: loadCSSResolver("/css/home.css"),
      },
    })
    .when("/movies", {
      templateUrl: "/Movies Tab/views/movies.html",
      controller: "movies",
      resolve: {
        loadCSS: loadCSSResolver("/css/myAccount&movies.css"),
      },
    })
    .when("/myAccount", {
      templateUrl: "/myAccount/views/myAccount.html",
      controller: "myAccount",
      resolve: {
        loadCSS: loadCSSResolver("/css/myAccount.css"),
      },
    })
    .when("/movieDescription", {
      templateUrl: "/Movies Tab/views/movieDescription.html",
      controller: "movieDesc",
      resolve: {
        loadCSS: loadCSSResolver("/css/PSP.css"),
      },
    })
    .when("/theatreDecide", {
      templateUrl: "/Ticket Booking/views/theatreDecide.html",
      controller: "theatreDecide",
      resolve: {
        loadCSS: loadCSSResolver("/css/theatreDecide.css"),
      },
    })
    .when("/login&signup", {
      templateUrl: "/Login And Sign Up/views/loginAndSignup.html",
      controller: "login&signup",
      resolve: {
        loadCSS: loadCSSResolver("/css/login&signup.css"),
      },
    })
    .when("/seatSelection", {
      templateUrl: "/Ticket Booking/views/SeatSelection.html",
      controller: "seats",
      resolve: {
        loadCSS: loadCSSResolver("/css/SeatSelection.css"),
      },
    })
    .when("/payment", {
      templateUrl: "/Ticket Booking/views/payment.html",
      controller: "payment",
      resolve: {
        loadCSS: loadCSSResolver("/css/payment.css"),
      },
    })
    .when("/ticketDetails", {
      templateUrl: "/Ticket Booking/views/ticketDetails.html",
      controller: "ticketDetails",
      resolve: {
        loadCSS: loadCSSResolver("/css/ticketDetails.css"),
      },
    })
    .when("/ticketDetails", {
      templateUrl: "/Ticket Booking/views/ticketDetails.html",
      controller: "ticketDetails",
      resolve: {
        loadCSS: loadCSSResolver("/css/ticketDetails.css"),
      },
    })
    .when("/contactUs", {
      templateUrl: "/contactUs/views/contactUs.html",

      resolve: {
        loadCSS: loadCSSResolver("/css/contactUs.css"),
      },
    })

    .otherwise({ redirectTo: "/" });
});

//defining and adding properties to rootscope
app.run(function ($rootScope) {
  $rootScope.searchText = "";
});

app.directive("checkDob", function () {
  return {
    require: "ngModel",
    link: function (scope, element, attr, ctrl) {
      ctrl.$validators.checkDob = function (viewValue) {
        if (!viewValue) {
          return true;
        }
        // Convert the viewValue (date of birth) to a Date object
        var dob = new Date(viewValue);

        // Calculate the user's age in milliseconds
        var ageInMilliseconds = Date.now() - dob.getTime();

        // Calculate the minimum age in milliseconds (18 years)
        var minAgeMilliseconds = 18 * 365.25 * 24 * 60 * 60 * 1000;

        // Check if the user's age is greater than or equal to 18 years
        return ageInMilliseconds >= minAgeMilliseconds;
      };
    },
  };
});
