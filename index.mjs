import data from "./anime-list.json" assert {type: "json"};
import express from "express";

import swaggerUi from "swagger-ui-express"; // swagger
import swaggerJsondoc from "swagger-jsdoc"; // swagger documentation

import path from "path";
import cookieParser from "cookie-parser";
import { login } from "./login.mjs"; // object import
import Login from "./login.mjs"; // class import

const app = express();
const port = 3000;
const __dirname = path.resolve(path.dirname(""));

app.use("/front", express.static("front")); // front folderoos 
app.use(express.json());

app.use(cookieParser());

login.users.set("99110000", { fullname: "USER ONE", password: "123" });
login.users.set("99220000", { fullname: "Administrator", password: "123" });
login.users.set("99330000", { fullname: "USER TWO", password: "123" });

const aboutPage = `<html><h1 style="text-align: center">Welcome about</h1><p>ab</p></html>`;

let malRank = 0;

app.post("/animeList", (req, res) => {
  malRank += req.body.malRank;
  res.writeHead(201, "CREATED", {"Content-Type": "text/plain"});
  res.send();
});

app.get("/", (req, res) => {
  res.sendFile("/front/login.html", options);
});


app.post("/login", login.verifyLogin.bind(login));

app.get("/emails", (req, res) => {
  if (!login.sessions.has(Number(req.cookies.session_id))) {
    res.sendFile("./forbidden.html", options);
    return;
  }

  res.send(
    `<html><h1>Inbox for ${
      login.sessions.get(Number(req.cookies.session_id)).fullname
    } </h1><ul><li>Email1</li><li>Email2</li></ul></html>`
  );
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
  apis: ["./index.mjs"],
  root: path.join(__dirname)
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