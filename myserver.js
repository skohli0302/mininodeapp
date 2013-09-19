/*
 * 
 * require some modules here to enable app to 
 * handle http requests.
 */
var http = require('http');
var url = require("url");

/*
 * initializing router here
 */
var route = {
    routes: {},
    for : function(method, path, handler) {
        this.routes[method + path] = handler;
    }
};

/*
 * A /start pattern handler for http get verb
 */
route.for ('GET', '/start', function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("hello there, mininode app welcomes you");
    response.end();
});

/*
 * A /end pattern handler here for http get verb
 */
route.for ('GET', '/end', function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Good bye, wish to see you again :) ");
    response.end();
});


/*
 * Generic callback handler for every http request
 * this works as front controller for every request
 */
function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('request for ' + request.method + pathname + ' received');
    if (typeof (route.routes[request.method + pathname]) === 'function') {
        route.routes[request.method + pathname](request, response);
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.end('404 not found');
    }
}

//creating server with onRequest as a callback
http.createServer(onRequest).listen(9999);
console.log('server has started');