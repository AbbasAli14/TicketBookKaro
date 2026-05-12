//Service to load CSS on every page
app.service("CssLoaderService", ["$rootScope", function ($rootScope) {
        //Function to get CSS file on page load
        this.loadCss = function (cssFile) {
            //Creates element for CSS in javascript
            var link = document.createElement("link");
            link.href = cssFile;
            link.rel = "stylesheet";
            link.type = "text/css";
            document.head.appendChild(link);
        };
        //On RouteChangeSuccess, this.css function is called.
        $rootScope.$on(
            "$routeChangeSuccess",
            function (event, current) {
                if (current.$$route && current.$$route.css) {
                    // Load CSS when a route changes
                    this.loadCss(current.$$route.css);
                }
            }.bind(this)
        );
    },
]);