//Custom Directive to show error message
app.directive('showErrorMessage', function () {
    return {
      restrict: 'E', // Restrict usage to elements
      replace: true, // Replace the directive tag with template content
      template: '<div class="error-message" ng-transclude></div>',
      transclude: true // Preserve inner content
    };
  });