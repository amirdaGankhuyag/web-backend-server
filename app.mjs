import express, { query } from "express";
import path from "path";
import pkg from 'pg';
import cookieParser from "cookie-parser";
const { Client } = pkg;
const __dirname = path.resolve(path.dirname(""));

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

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

app.get("/", (req, res) => {
  res.sendFile("./front/login.html", options);
});

app.get("/signUp" , (req , res) => {
  res.sendFile("./front/signUp.html" , options); 
})


app.post("/register" , async(req , res) => {
  try {
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    console.log(req.body);
    // const result1 = await client.query(`SELECT * FROM users WHERE email = ${email}`);
    const result2 = await client.query(`SELECT * FROM users WHERE phone = ${phone}`);
    // console.log("davharsan email:");
    // console.log(result1.rows);
    console.log("davharsan utas:");
    console.log(result2.rows);
    if(result2.rowCount.length > 0) {
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
  }
})


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
})


app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});

const options = {
  root: path.join(__dirname)
};