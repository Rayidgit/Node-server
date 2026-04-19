const http = require('http');
const fs = require('fs');
const port = 8080;

let requestcounter = 0;

const server = http.createServer(
  (req,res) => {
    requestcounter++;
    console.log(`Server is running on port ${port}`);
    console.log(`---- NEW REQUEST ---- ${requestcounter} ----`);
    console.log("URL:", req.url);
    console.log("METHOD:", req.method);
    console.log("HEADERS:", req.headers);

    fs.readFile('home.html',
      (error, data) => {
        if(error){
          res.writeHead(404, {'content-type': 'text/html'});
          res.write("Error 404 : file not found");
          res.end();
        }
        else {
          res.writeHead(200, {'content-type': 'text/html'});
          res.write(data);
          res.end();
        }
      }
    );
  }
);

server.listen(port);