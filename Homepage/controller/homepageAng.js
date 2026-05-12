// Define an AngularJS controller named "homepage" and inject dependencies
let counter = 1;

app.controller("homepage", function ($scope, $window, $http, DataService) {

  page = "home";
  $scope.counter = counter;

  if (user) {

    var welcomeBackElement = document.querySelector(".welcome-back");

    setTimeout(function () {
      welcomeBackElement.style.transform = "translate(-50%,0)";
    }, 50);

    setTimeout(function () {
      welcomeBackElement.style.transform = "translate(-50%,-100%)";
      $scope.counter--;
      counter--;
    }, 3000);
  }

  // ✅ JSON loading instead of API
  $http
    .get("data/movielist.json")
    .then((res) => {

      $scope.movies = res.data;

      const randomDecimal = Math.random();
      const randomNumber = Math.floor(
        randomDecimal * ($scope.movies.length - 3)
      );

      $scope.newArr = $scope.movies.slice(
        randomNumber,
        randomNumber + 4
      );

    })
    .catch(() => {
      alert("Could not fetch the data.");
    });

  // Navigation
  $scope.locationChange = function (link, movie) {

    movPag = "/";

    DataService.setData(movie);

    window.scrollTo(0, 0);

    page = link.split("/")[1];

    $window.location.href = link;
  };

  // Slideshow logic
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".arrow-left");
  const btnRight = document.querySelector(".arrow-right");
  const dots = document.querySelectorAll(".dots");
  const watchTrailerBtns = document.querySelectorAll(".watch-trailer");
  const overlay = document.querySelector(".overlay");
  const overlayBtn = document.querySelector(".close-video");
  const video = document.querySelector(".video-content");

  let currSlide = 0;
  let timer = 2;

  dots[currSlide].firstElementChild.classList.add("dot-active");

  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * i}%)`;
  });

  const slideTransform = function (currSlide) {

    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - currSlide)}%)`;
    });

    dots[currSlide].firstElementChild.classList.add("dot-active");
  };

  let interval = setInterval(intervalTime, timer * 1000);

  btnRight.addEventListener("click", function () {

    dots[currSlide].firstElementChild.classList.remove("dot-active");

    currSlide++;

    if (currSlide == slides.length) currSlide = 0;

    slideTransform(currSlide);

    clearInterval(interval);

    interval = setInterval(intervalTime, timer * 1000);
  });

  btnLeft.addEventListener("click", function () {

    dots[currSlide].firstElementChild.classList.remove("dot-active");

    currSlide--;

    if (currSlide == -1) currSlide = slides.length - 1;

    slideTransform(currSlide);

    clearInterval(interval);

    interval = setInterval(intervalTime, timer * 1000);
  });

  function intervalTime() {

    dots[currSlide].firstElementChild.classList.remove("dot-active");

    currSlide++;

    if (currSlide == slides.length) currSlide = 0;

    slideTransform(currSlide);
  }

  watchTrailerBtns.forEach((el) => {
    el.addEventListener("click", function () {
      overlay.classList.remove("hidden");
    });
  });

  overlay.addEventListener("click", function () {
    overlay.classList.add("hidden");
    video.pause();
  });
});