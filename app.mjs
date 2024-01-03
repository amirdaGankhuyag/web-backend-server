import express from "express";
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


app.use("/front", express.static("front")); // front folderoos staticaar
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
 *     summary: Хэрэглэгчдийн мэдээллийг өгөгдлийн сангаас авах.
 *     description: Бүх user-үүдийн мэдээллийг өгөгдлийн сангаас авах.
 *     responses:
 *       200:
 *         description: Амжиллтай хэрэглэгчдийн мэдээллийг авлаа.
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
 *     summary: Бүх анимуудын жагсаалтыг авах
 *     description: Бүх анимуудын мэдээллийг өгөгдлийн сангаас авах.
 *     tags:
 *       - Anime List
 *     responses:
 *       200:
 *         description: Анимуудын мэдээллийг амжилттай авлаа.
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

app.get("/productList", async (req, res) => {
  try {
    const productsInfo = await client.query('SELECT * FROM productList');
    res.status(200).json(productsInfo.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @swagger
 * /productList:
 *   get:
 *     tags:
 *       - Product List
 *     summary: Бүх бараануудын жагсаалтыг авах
 *     description: Бүх бараануудын мэдээллийг өгөгдлийн сангаас авах.
 *     responses:
 *       200:
 *         description: Бараануудын мэдээллийг амжилттай авлаа.
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

//----------------------------------------------------POST

/**
 * @swagger
 * /addComment:
 *   post:
 *     tags:
 *       - Anime List
 *     summary: Anime-д сэтгэгдэл нэмэх
 *     description: Тухайн anime-д id-гаар нь дамжуулж хэрэглэгчийн сэтгэгдлийг нэмэх.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: Хэрэглэгчийн сэтгэгдэл.
 *               id:
 *                 type: integer
 *                 description: Тухайн anime-ийн id.
 *               user:
 *                 type: string
 *                 description: Хэрэглэгчийн нэмэх сэтгэгдэл.
 *     responses:
 *       200:
 *         description: Сэтгэгдэл амжилттай нэмэгдлээ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Сэтгэгдэл амжилттай нэмэгдлээ.
 *       400:
 *         description: Ийм аниме байхгүй байна.
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
      res.status(200).json({ message: "Сэтгэгдэл амжилттай нэмэгдлээ." });
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
 *     summary: Хэрэглэгчийн бүртгэл
 *     description: Хэрэглэгчийн оруулсан мэдээллүүдээр бүртгэл үүсгэнэ.
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
 *         description: Хэрэглэгч амжилттай бүртгэглээ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Хэрэглэгч амжилттай бүртгэглээ.
 *       400:
 *         description: Баталгаажуулалтын алдаа
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Нууц үгээ зөв давтаж оруулна уу
 *       401:
 *         description: Имэйл эсвэл утасны дугаар бүртгэлтэй байна.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Имэйл эсвэл утасны дугаар бүртгэлтэй байна.
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
      res.status(401).json({ error: 'Имэйл эсвэл утасны дугаар бүртгэлтэй байна.' });
    } else if (password1 !== password2) {
      res.status(400).json({ error: 'Нууц үгээ зөв давтаж оруулна уу' });
    } else {
      const query = {
        text: `INSERT INTO users (fname, lname, phone, email, password) VALUES($1, $2, $3, $4, $5)`,
        values: [fname, lname, phone, email, password1],
      };

      await client.query(query);
      res.status(200).json({ message: "Хэрэглэгч амжилттай бүртгэглээ." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Алдаа гарлаа' });
  }
});

/**
 * @swagger
 * /addAnime:
 *   post:
 *     tags:
 *       - Anime List
 *     summary: Шинэ anime нэмэх
 *     description: Оруулсан мэдээллүүдийг ашиглан anime шинээр нэмэх.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the anime.
 *               name:
 *                 type: string
 *                 description: The name of the anime.
 *               releasedDate:
 *                 type: string
 *                 format: date
 *                 description: The release date of the anime.
 *               totalEpisode:
 *                 type: integer
 *                 description: The total number of episodes.
 *               totalDuration:
 *                 type: string
 *                 description: The total duration of the anime.
 *               songType:
 *                 type: string
 *                 description: The type of songs in the anime.
 *               malRank:
 *                 type: integer
 *                 description: The MAL (MyAnimeList) rank of the anime.
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The categories or genres of the anime.
 *               animeImg:
 *                 type: string
 *                 description: URL or path to the anime image.
 *     responses:
 *       200:
 *         description: Anime амжилттай нэмэгдлээ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Амжилттай нэмэгдлээ.
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
app.post("/addAnime", async (req, res) => {
  try {
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
        INSERT INTO animelist(name, released_date, total_episode, total_duration, category, song_type, mal_rank, anime_img)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8);
      `,
      values: [name, releasedDate, totalEpisode, totalDuration, [category], songType, malRank, animeImg],
    };

    await client.query(query);
    res.status(200).json({ message: "Амжилттай нэмэгдлээ." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Алдаа гарлаа' });
  }
});

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});