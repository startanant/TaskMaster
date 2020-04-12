require('dotenv').config();
const express = require('express');
const app = express();
let db = require('./models');
let user = require('./user.json');

// const db_host = process.env.DB_HOST;
// console.log(process.env);

async function getUsers() {
    const result = await db.find({ name: 'przemek' });
    console.log(result);
}
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// getUsers();
//route to get all users
app.get('/api/getAllUsers', async (req, res) => {
    const response = await db.userprofile.find();
    if (response.length > 0) {
        res.json(response);
    } else res.json({ answer: 'empty set!' });
});

app.get('/api/getUser/:email', async (req, res) => {
    console.log(req.params);
    const query = { email: req.params.email };
    const response = await db.userprofile.find(query);
    if (response.length > 0) {
        res.json(response);
    } else res.json({ answer: 'nothing found' });
    // res.end('ok');
});

app.get('/api/authUser/:email', async (req, res) => {
    console.log(req.params);
    const query = { email: req.params.email };
    const response = await db.userauth.find(query);
    if (response.length > 0) {
        res.json(response[0].password);
    } else res.json({ answer: 'nothing found' });
    // res.end('ok');
});

app.get('/api/getUserPassword/:email', async (req, res) => {
    console.log(req.params);
    const query = { email: req.params.email };
    const response = await db.userauth.find(query, 'name password');
    if (response.length > 0) {
        res.json(response);
    } else res.json({ answer: 'nothing found' });
    // res.end('ok');
});

app.post('/api/addUser', async (req, res) => {
    console.log(req.body);
    user = { ...user, ...req.body };
    const response = await db.userprofile.create(user);
    res.json(response);
});

app.post('/api/updateUserProfile', async (req, res) => {
    console.log(req.body);
    // user = { ...user, ...req.body };
    const response = await db.userprofile.findOneAndReplace(
        { email: req.body.email },
        req.body
    );
    res.json(response);
});

app.use(express.static('./public'));

const PORT = 8080;
app.listen(PORT, (req, res) => {
    console.log(`server started on ${PORT}`);
});
