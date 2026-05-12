// Controller For Header/Nav-Bar
app.controller("header", function () {
  // Get a reference to the header element
  const header = document.querySelector("header");

  // Add a scroll event listener to the window
  window.addEventListener("scroll", function () {
    // Check the current page URL to determine behavior
    const currentPage = window.location.href.split("/").pop();

    // If the current page is "contactUs", do nothing
    if (currentPage === "contactUs" || currentPage === "myAccount") {
      return;
    }

    // Determine the header behavior based on page and scroll position
    if (
      currentPage === "" || // Home page
      currentPage === "movieDescription" || // Movie description page
      currentPage === "ticketDetails" // Ticket details page
    ) {
      // Behavior for certain pages when scrolling
      if (window.scrollY >= 93) {
        header.style.position = "fixed"; // Fixed position when scrolling down
        header.style.backgroundColor = "black"; // Background color change
        header.style.border = "none"; // No border
      } else if (window.scrollX <= 93) {
        header.style.position = "absolute"; // Absolute position when at the top
        header.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Transparent background
        header.style.borderBottom = "1px solid white"; // Add a bottom border
      }
    } else {
      // Behavior for other pages when scrolling
      if (window.scrollY >= 93) {
        header.style.position = "fixed"; // Fixed position when scrolling down
        header.style.backgroundColor = "black"; // Background color change
        header.style.border = "none"; // No border
      } else if (window.scrollX <= 93) {
        header.style.position = "static"; // Reset position to static
        header.style.backgroundColor = "rgba(0, 0, 0)"; // Background color change
        header.style.borderBottom = "1px solid white"; // Add a bottom border
      }
    }
  });
});
