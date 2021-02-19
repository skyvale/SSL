var http = require('http'); //one error fixed
var myName = function() { // one error fixed
    console.log("Here is my IP address");
};

async function callHttpbin() { // two errors fixed
    let promise = new Promise((resolve, reject) => {
        http.get(
        'http://httpbin.org/ip',
        function(response) {
            var str = "";
            response.setEncoding('utf8');
            response.on('data', function(data) {
                str += data;
            });
            response.on('end', function() {
                var result = JSON.parse(str);
                myips = result.origin;
                resolve(myips); // one error fixed
            });
        }
        );
    });

    let result = await promise;
    return result; // one error fixed
}

async function executeAsyncTask(){ // one error fixed
    const valueA = await callHttpbin();
    myName(); // one error fixed
    console.log(valueA); // one error fixed
} // one error fixed

executeAsyncTask(); // one error fixed

// Output Here is my IP address 149.24.160.1, 149.24.160.1