
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

http.createServer( (req, res) => {

    let parsed = url.parse(req.url);
    let filename = path.parse(parsed.pathname);

    // ? : turnary
    filen = filename.name == "" ? "index" : filename.name;
    ext = filename.ext == "" ? ".html" : filename.ext;
    dir = filename.dir == "/" ? "" : filename.dir + "/"; // you will need a '/' after the directory
    page = filename.name == "" ? "index.html" : filename.name; //if the filename is blank, it should route to the index.html (homepage)

    // replace the '/' because you dont need the first / in /boot/vendor/...
    f = (dir + filen + ext).replace("/", "");

    // mimeTypes is an object
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif'
    };

    if(f) {
        fs.readFile(f, (err,data) => {

            if(page) {
                if (mimeTypes.hasOwnProperty(ext)) {
                    res.writeHead(200, {'Content-Type': mimeTypes[ext]});
                    res.write("<script>var page='" + page + "';</script>");
                    res.end(data, 'utf-8');
                }
            }
            
        });
    }

}).listen('8080', () => {
    console.log("info", 'Server is at port: ' + 8080);
});