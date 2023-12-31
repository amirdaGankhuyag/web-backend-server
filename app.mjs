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
 *     name: "Users"
 *     description: User related options
 *   -
 *     name: "Anime List"
 *     description: Anime List related options
 *   -
 *     name: "Product List"
 *     description: Product List related options
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

//---------------------------------------------------------GET
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
/**
 * @swagger
 * /test:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve user information
 *     description: Retrieve all users from the database.
 *     responses:
 *       200:
 *         description: Successful response with user information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   # Add other properties based on your user data structure
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */


app.get("/animeList", async (req, res) => {
  try {
    const animeInfo = await client.query('SELECT * FROM animelist');
    res.status(200).json(animeInfo.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
/**
 * @swagger
 * /animeList:
 *   get:
 *     summary: Get a list of anime.
 *     description: Retrieves a list of anime from the database.
 *     tags:
 *       - Anime List
 *     responses:
 *       200:
 *         description: Successful response with a list of anime.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   # Add other properties based on your anime data structure
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /productList:
 *   get:
 *     tags:
 *       - Product List
 *     summary: Get a list of products.
 *     description: Retrieves a list of products from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   # Add other properties based on your product data structure
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */
app.get("/productList", async (req, res) => {
  try {
    const productsInfo = await client.query('SELECT * FROM productList');
    res.status(200).json(productsInfo.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//----------------------------------------------------POST

/**
 * @swagger
 * /addComment:
 *   post:
 *     tags:
 *       - Anime List
 *     summary: Add a comment to an anime.
 *     description: Adds a user's comment to a specific anime based on its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The user's comment.
 *               id:
 *                 type: integer
 *                 description: Numeric ID of the anime.
 *               user:
 *                 type: string
 *                 description: The user adding the comment.
 *     responses:
 *       200:
 *         description: Comment added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment added successfully
 *       400:
 *         description: Anime not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ийм аниме байхгүй байна.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */
app.post("/addComment", async (req, res) => {
  try {
    const comment = req.body.comment;
    const id = req.body.id;
    const user = req.body.user;
    const result1 = await client.query('SELECT * FROM animeList WHERE id = $1', [id]);

    if (result1.rowCount > 0) {
      const query = {
        text: `
          UPDATE animeList
          SET comments = comments || ARRAY[$1]
          WHERE id = $2;
        `,
        values: [comment + ',' + user, id],
      };

      await client.query(query);
      res.status(200).json({ message: "Comment added successfully" });
    } else {
      res.status(400).json({ error: 'Ийм аниме байхгүй байна.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Users
 *     summary: User registration
 *     description: Registers a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               fname:
 *                 type: string
 *                 description: The first name of the user.
 *               lname:
 *                 type: string
 *                 description: The last name of the user.
 *               phone:
 *                 type: string
 *                 description: The phone number of the user.
 *               password1:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *               password2:
 *                 type: string
 *                 format: password
 *                 description: Confirmation of the user's password.
 *     responses:
 *       200:
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registration successful
 *       400:
 *         description: Bad request, validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Нууц үгээ зөв давтаж оруулна уу
 *       401:
 *         description: Email or phone is already registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email or phone is already registered
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Алдаа гарлаа
 */
app.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;
    const password1 = req.body.password1;
    const password2 = req.body.password2;

    const result1 = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const result2 = await client.query('SELECT * FROM users WHERE phone = $1', [phone]);

    if (result2.rowCount > 0 || result1.rowCount > 0) {
      res.status(401).json({ error: 'Email or phone is already registered' });
    } else if (password1 !== password2) {
      res.status(400).json({ error: 'Нууц үгээ зөв давтаж оруулна уу' });
    } else {
      const query = {
        text: `INSERT INTO users (fname, lname, phone, email, password) VALUES($1, $2, $3, $4, $5)`,
        values: [fname, lname, phone, email, password1],
      };

      await client.query(query);
      res.status(200).json({ message: "Registration successful" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Алдаа гарлаа' });
  }
});

app.post("/addAnime", async (req, res) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const releasedDate = req.body.releasedDate;
    const totalEpisode = req.body.totalEpisode;
    const totalDuration = req.body.totalDuration;
    const songType = req.body.songType;
    const malRank = req.body.malRank;
    const category = req.body.category;
    const animeImg = req.body.animeImg;

    const query = {
      text: `
        INSERT INTO animelist( name, released_date, total_episode, total_duration, category, song_type, mal_rank, anime_img)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8);
      `,
      values: [
        name,
        releasedDate,
        totalEpisode,
        totalDuration,
        [category], 
        songType,
        malRank,
        animeImg
      ],
    };

    await client.query(query);
    res.status(200).json({ message: "Amjilttai nemlee successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Алдаа гарлаа' });
  }
});



app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});