var app = angular.module('SlackApp', ['ngSanitize','ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/acc");
  //
  // Now set up the states
  $stateProvider
  .state('acc', {
             url: "/acc",
             templateUrl: "acc/acc.html"
         })
});
