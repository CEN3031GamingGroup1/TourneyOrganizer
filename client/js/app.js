/* register the modules the application depends upon here*/
angular.module('tourneys', []);
angular.module('users', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['tourneys', 'users', 'ngCookies']);
