
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
    dir = filename.dir == "/" ? "" : filename.dir + "/";
    page = filename.name == "" ? "index.html" : filename.name;

    f = __dirname+'/../html/' + (dir + filen + ext).replace("/", "");
    console.log("dir" + dir);
    console.log("filen: " + filen);
    console.log("ext: " + ext);
    console.log("page: " + page);
    console.log("f: " + f);

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
            console.log("data: ");
            console.log(data);
            console.log("err: ", err);
            if(page) {
                if (mimeTypes.hasOwnProperty(ext)) {
                    res.writeHead(200, {'Content-Type': mimeTypes[ext]});
                    res.end(data, 'utf-8');
                }
            }
            
        })
    }

}).listen('8080', () => {
    console.log("info", 'Server is at port: ' + 8080);
});