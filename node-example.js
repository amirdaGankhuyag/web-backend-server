// https://nodejs.org/docs/latest/api/synopsis.html - documentation
// common js
const http = require("node:http"); // import  // https -> performance udaashirna, nuutslah shaardlagatai yman der hereglene

const hostname = "127.0.0.1"; // local
const port = 3000;

const url = "/company/products.html";

const server = http.createServer((req, res) => {
  const homePage = `<html><h1>Welcome home</h1><p>${req.url}</p></html>`;
  const aboutPage = `<html><h1>Welcome about</h1><p>${req.url}</p></html>`;

  res.statusCode = 200;

  res.setHeader("Content-Type", "text/html"); // "text/html"

  if (req.url == "/") {
    res.write(homePage);
  } else {
    res.write(aboutPage);
  }

  res.end();
  // endees hoish ymar neg command baij bolohgui
});

server.listen(port, hostname, () => {
  //ene funktsiij ajilluul
  console.log(`Server running at http://${hostname}:${port}/`);
});