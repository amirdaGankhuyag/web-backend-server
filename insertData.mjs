import data from "./anime-list.json" assert { type: "json" };
import products from "./products.json" assert {type: "json"};
import pkg from "pg";

const { Client } = pkg;

const dbConfig = {
  user: "postgres",
  password: "neko1007",
  database: "animuk",
  host: "localhost",
  port: 5432,
};

async function insertData() {

  const client = new Client(dbConfig);

  try {
    await client.connect();
    for (let anime of data) {
      console.log(anime);
      const query = {
        text: `
          INSERT INTO animelist (
            name, released_date, total_episode, total_duration, category,
            song_type, mal_rank, anime_img, views, id
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `,
        values: [
          anime.name,
          anime.releasedDate,
          anime.totalEpisode,
          anime.totalDuration,
          anime.category,
          anime.songType,
          anime.malRank,
          anime.animeImg,
          anime.views,
          anime.id,
        ],
      };
      
      try {
        await client.query(query);
        console.log(`Data for anime ${anime.name} inserted successfully`);
      } catch (insertError) {
        console.error(`Error inserting data for anime ${anime.name}:`, insertError.message);
      }
    }
    console.log("All data inserted successfully");
  } catch (connectError) {
    console.error("Error connecting to the database:", connectError.message);
  } finally {
    await client.end();
  }
}

async function insertProduct() {

  const client = new Client(dbConfig);

  try {
    await client.connect();
    for (let product of products) {
      console.log(product);
      const query = {
        text: `
          INSERT INTO productlist (
            id, name, img, type, material,
            color, size, price
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        values: [
          product.id,
          product.name,
          product.img,
          product.type,
          product.material,
          product.color,
          product.size,
          product.price
        ],
      };
      await client.query(query);
    }
    console.log("All data inserted successfully");
  } catch (connectError) {
    console.error("Error connecting to the database:", connectError.message);
  } finally {
    await client.end();
  }
}

// insertData();
// insertProduct();