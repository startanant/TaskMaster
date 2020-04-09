require('dotenv').config();
const express = require('express');
const app = express();
let db = require('./models');

// const db_host = process.env.DB_HOST;
// console.log(process.env);

async function getUsers() {
    const result = await db.user.find({ name: 'przemek' });
    console.log(result);
}

getUsers();

const PORT = 8080;
app.listen(PORT, (req, res) => {
    console.log(`server started on ${PORT}`);
});
