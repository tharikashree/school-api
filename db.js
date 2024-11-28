import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
    host: "https://school-api-black.vercel.app/",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "school-api",
});

export default db;