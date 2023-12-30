import express, { query } from "express";
import pkg from 'pg';
import path from "path";

// swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsondoc from "swagger-jsdoc";

const { Client } = pkg;
const __dirname = path.resolve(path.dirname(""));

const app = express();
const port = 3000;

const dbConfig = {
    user: 'postgres',
    password: 'neko1007',
    database: 'animuk',
    host: 'localhost',
    port: 5432
}

const client = new Client(dbConfig);

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error: Unable to connect to PostgreSQL database');
    console.error(err);
  });


app.use("/front", express.static("front")); // front folderoos 
app.use(express.json());

const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // present supported openapi version
    info: {
      title: "Animuk.mn APIs",
      version: "1.0.0", 
      description: "Дэлхийн шилдэг анимуудыг танд хүргэнэ.",
      contact: {
        name: "Admin", 
        email: "animukmn@gmail.com",
        url: "animuk.mn"
      }
    },
    servers: [
      {
          url: "http://localhost:3000/"
      }
    ]
  },
  apis: ["./app.mjs"],
  root: path.join(__dirname)
};

const specs = swaggerJsondoc(options);
app.use("/docs", swaggerUi.serve);
app.get("/docs", swaggerUi.setup(specs, {
  explorer: true
}));

// Routes

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

app.get("/", (req, res) => {
  res.sendFile("./front/login.html", options);
});

app.get("/signUp" , (req , res) => {
  res.sendFile("./front/signUp.html" , options); 
});

app.get("/test", async (req, res) => {
  try {
      const userInfo = await client.query('SELECT * FROM users');
      res.status(200).json(userInfo.rows);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
  }
});

app.get("/animeList" , async(req, res) => {
try {
  const animeInfo = await client.query('SELECT * FROM animelist');
  res.status(200).json(animeInfo.rows);
} catch (err) {
  console.error(err);
  res.status(500).json({ error: "Server error" });
}
})

app.get("/productList" , async(req , res) => {
try {
  const productsInfo = await client.query('SELECT * FROM productList');
  res.status(200).json(productsInfo.rows);
} catch (err) {
  console.error(err);
  res.status(500).json({ error: "Server error" });
}
});

app.post("/addComment",  async (req, res) => {
  try {
    const comment = req.body.comment;
    const id = req.body.id;
    const user = req.body.user;
    const result1 = await client.query('SELECT * FROM animeList WHERE id = $1', [id]);
    if(result1.rowCount > 0) {
      const query = {
        text: `
          UPDATE animeList
          SET comments = comments || ARRAY[$1]
          WHERE id = $2;
        `,
        values: [
          comment + ',' + user,
          id
        ]
      };
      await client.query(query);
      res.status(200).send("Comment added successfully");
    } else {
      res.status(400).json({ error: 'Ийм аниме байхгүй байна.' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/register" , async(req , res) => {
  try {
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    console.log(req.body);
    const result1 = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const result2 = await client.query('SELECT * FROM users WHERE phone = $1', [phone]);
    if(result2.rowCount > 0 || result1.rowCount > 0) {
      res.status(401).json({ error: 'Email or phone is already registered' });
    } else if(password1 != password2) {
      res.status(400).json({ error: 'Нууц үгээ зөв давтаж оруулна уу' });
    } else {
      const query = {
        text: `INSERT INTO users (fname , lname , phone , email, password) VALUES($1, $2, $3, $4, $5)`,
        values: [
          fname,
          lname,
          phone,
          email,
          password1
        ],
      };
      await client.query(query);
      res.status(200).send("boloro hamayo");
    }
  } catch(err) {
      console.error(err);
      res.status(500).json({ error: 'Алдаа гарлаа' });
  }
});

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});