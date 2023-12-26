import express from "express";
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


app.get("/test", async (req, res) => {
    try {
        const userInfo = await client.query('SELECT * FROM users');
        res.status(200).json(userInfo.rows);
        console.log(userInfo.rows);
        console.log(userInfo.rows[0].email);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});

const options = {
  root: path.join(__dirname)
};