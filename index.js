const http = require('http');
const port = 3000;

const server = http.createServer(
  (req,res) => {
    console.log(`server is running on port ${port}`);
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);

    req.on('data',
      (chunk) => {
        console.log(chunk.toString());
      }
    );

    res.write("My name is Rayid Hussain");
    res.end();
  }
);

server.listen(3000);
