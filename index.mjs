// // https://nodejs.org/docs/latest/api/synopsis.html - documentation
// // common js
// const http = require("node:http"); // import  // https -> performance udaashirna, nuutslah shaardlagatai yman der hereglene

// const hostname = "127.0.0.1"; // local
// const port = 3000;

// const url = "/company/products.html";

// const server = http.createServer((req, res) => {
//   const homePage = `<html><h1>Welcome home</h1><p>${req.url}</p></html>`;
//   const aboutPage = `<html><h1>Welcome about</h1><p>${req.url}</p></html>`;

//   res.statusCode = 200;

//   res.setHeader("Content-Type", "text/html"); // "text/html"

//   if (req.url == "/") {
//     res.write(homePage);
//   } else {
//     res.write(aboutPage);
//   }

//   res.end();
//   // endees hoish ymar neg command baij bolohgui
// });

// server.listen(port, hostname, () => {
//   //ene funktsiij ajilluul
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

import data from "./anime-list.json" assert {type: "json"};
import express from "express";

import swaggerUi from "swagger-ui-express"; // swagger
import swaggerJsondoc from "swagger-jsdoc"; // swagger documentation

const app = express();
const port = 3000;

app.use("/front", express.static("front")); // front folderoos 
app.use(express.json());

const homePage = `<html><h1>Welcome home</h1><p>cmp</p></html>`;
const aboutPage = `<html><h1 style="text-align: center">Welcome about</h1><p>ab</p></html>`;

let malRank = 0;

app.post("/animeList", (req, res) => {
  malRank += req.body.malRank;
  res.writeHead(201, "CREATED", {"Content-Type": "text/plain"});
  res.send();
});

app.get("/", (req, res) => { //post, delete, update
  res.send(homePage);
});

app.get("/about", (req, res) => { //jsonbin.io-s dataga awy gewel ene url uud der tohiruulaad ugchinu, huwisagchid hiij bolno, eswel taashni chigluulchij bolno, tsaad servicees awaad bolowsruulaad shideh
    res.send(aboutPage);
  });

  app.get("/animeList", (req, res) => {
    res.send(data);
  });


app.get("/animeList/:animeId", (req, res) => {
  const anime = data.filter( anime => req.params.animeId == anime.id);
  res.send(anime);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

                                        //    SWAGGER documentation 3 deer hiihed l bolno gesen

const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // present supported openapi version
    info: {
      title: "Animuk.mn API", // short title.
      version: "1.0.0", // version number
      description: "Animuk dev API for Web-app", // desc.
      contact: {
        name: "Amirda G. Unubaatar.B Khaliunzaya", // your name
        email: "animukmn@gmail.com", // your email
        url: "animuk.mn", // your website
      }
    }
  },
  apis: ["./index.mjs"]
};

const specs = swaggerJsondoc(options); // Assuming you have imported swaggerJsondoc
app.use("/docs", swaggerUi.serve); // swaggert handah url

app.get("/docs", swaggerUi.setup(specs, {
  explorer: true
}));


/**
 * @swagger
 * tags:
 *   -
 *     name: "Anime List"
 *     description: Anime List related options
 *   -
 *     name: "Products"
 *     description: Products info
 *   -
 *     name: "Nemelt neg"
 *     description: nemelteer oruulj bolno, ustgasan ch bolno
 */

/**
 *  @swagger
 *   paths:
 *       /animeList/{animeId}:
 *           get:
 *              tags:
 *                  - Anime List
 *              summary: Shows anime details by ID
 *              parameters:
 *                - in: path
 *                  name: animeId
 *                  schema:
 *                    type: integer
 *                  required: true
 *                  description: Numeric ID of the anime
 *              responses:
 *                "200":
 *                  description: Successful response with anime details
 *                  content:
 *                    application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                          title:
 *                            type: string
 *                          # Add other properties based on your anime data structure
 *                "404":
 *                  description: Anime not found
 *                  content:
 *                    application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          message:
 *                            type: string
 *                            example: Anime not found
 *                # Add more response codes and descriptions as needed
 */