// require('dotenv').config();
const express = require('express');
const mailjet = require('node-mailjet').connect(
    '9bbf027ee6279e41c94fe9415814fe62',
    'e7ad8b61eb1ba86f544198bb47a52f0d'
);
const axios = require('axios');
const app = express();
const qs = require('qs');
const { uuid } = require('uuidv4');
const fs = require('fs');
const path = require('path');
// import { v4 as uuidv4 } from 'uuid';
let db = require('./models');
let user = require('./user.json');
// let sharedDashboard = require('./shared.json');

// const db_host = process.env.DB_HOST;
// console.log(process.env);

async function getUsers() {
    const result = await db.find({}, { email: 1 });
    // console.log('function getUsers called', result);
}

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// getUsers();
//route to get all users
app.get('/api/getAllUsers', async (req, res) => {
    // console.log('api getAllUsers called');
    const response = await db.userprofile.find({}, 'email');
    if (response.length > 0) {
        res.json(response);
    } else res.json({ answer: 'empty set!' });
});
app.post('/api/insertShared', async (req, res) => {
    // console.log('insertShared api called', req.body);
    let sharedDashboard = {
        sharedFrom: req.body.sharedFrom,
        sharedTo: req.body.sharedTo,
        sharedDashboards: req.body.dashboards.toString(),
    };
    // console.log(sharedDashboard);
    const filter = {
        sharedFrom: req.body.sharedFrom,
        sharedTo: req.body.sharedTo,
    };
    // console.log('filter:', filter);
    const result = await db.shared
        .findOneAndReplace(filter, sharedDashboard, {
            upsert: true,
            returnNewDocument: true,
        })
        .then((response) => response);
    // console.log(result);
    res.json(result);
});
app.get('/api/getUser/:email', async (req, res) => {
    // console.log('getUser called for email:', req.params);
    const query = { email: req.params.email };
    const response = await db.userprofile.find(query);
    const sharedDashboardsTo = await db.userprofile.find(
        {
            'sharedByUser.to': req.params.email,
        },
        {
            _id: 0,
            email: 1,
            'sharedByUser.$': 1,
            dashboards: 1,
            firstname: 1,
            lastname: 1,
        }
    );
    // const sharedDashboardsFrom = await db.shared.find({
    //     sharedFrom: req.params.email,
    // });
    let reply = [];
    reply.push(response);
    reply.push(sharedDashboardsTo);
    // reply.push(sharedDashboardsFrom);
    // console.log(reply);

    if (response.length > 0) {
        res.json(reply);
    } else res.json({ answer: 'nothing found' });
    // res.end('ok');
});

app.get('/api/getUserName/:email', async (req, res) => {
    const query = { email: req.params.email };
    const response = await db.userprofile.find(query, {
        _id: 0,
        name: 1,
        firstname: 1,
        lastname: 1,
        email: 1,
    });
    if (response.length > 0) {
        res.json(response[0]);
    } else {
        res.json({ answer: 'nothing found' });
    }
});

app.get('/api/authUser/:email', async (req, res) => {
    // console.log(req.params);
    const query = { email: req.params.email };
    const response = await db.userauth.find(query);
    if (response.length > 0) {
        res.json(response[0].password);
    } else res.json({ answer: 'nothing found' });
    // res.end('ok');
});

app.get('/api/getUserPassword/:email', async (req, res) => {
    // console.log(req.params);
    const query = { email: req.params.email };
    const response = await db.userprofile.find(query, 'password');
    if (response.length > 0) {
        res.json(response);
    } else res.json({ answer: 'nothing found' });
    // res.end('ok');
});

app.post('/api/addUser', async (req, res) => {
    // console.log(req.body);
    user = { ...user, ...req.body };
    user.dashboards[0].owner = req.body.email;
    user.dashboards[0].id = uuid();
    user.dashboards[0].columns[0].id = uuid();
    user.dashboards[0].columns[0].cards[0].id = uuid();
    try {
        const response = await db.userprofile.create(user);
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

app.post('/api/login', async (req, res) => {
    console.log(req.body);
    user = { ...user, ...req.body };
    const query = { email: req.body.email };
    //const response = await db.userauth.find(query);
    try {
        const response = await db.userprofile.find(query, {
            _id: 0,
            email: 1,
            password: 1,
        });
        res.json(response);
    } catch (error) {
        res.json(error);
    }
    // const response = await db.userprofile.find(query, { _id: 0, email: 1, password: 1 })
    // if (response.length > 0) {
    //     res.json(response[0].email);
    // } else res.json({ answer: 'nothing found' });
});

app.post('/api/notify', async (req, res) => {
    console.log(req.body);
    // user = { ...user, ...req.body };
    // const response = await db.userprofile.create(user);
    // const url = 'https://rudzki.ca/wyslijmail.php';
    // const options = {
    //     method: 'post',
    //     url: 'https://rudzki.ca/wyslijmail.php',
    //     data: qs.stringify(req.body),
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    //     },
    // };
    // const response = await axios(options).then((answer) => {
    //     console.log(answer.status);

    //     return answer.data;
    // });
    // console.log(response);

    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'taskmaster.notification@gmail.com',
                    Name: 'TaskMaster',
                },
                To: [
                    {
                        Email: 'startanant@gmail.com',
                        Name: 'Anant',
                    },
                    { Email: 'james.calverley3@gmail.com', Name: 'James' },
                    { Email: 'przemek.rudzki@gmail.com', Name: 'Przemek' },
                ],
                TemplateID: 1353168,
                TemplateLanguage: true,
                Subject: 'Invitation to collaborate',
            },
        ],
    });
    request
        .then((result) => {
            // console.log(result.body);
        })
        .catch((err) => {
            // console.log(err.statusCode);
        });

    res.json({
        answer: 'ok',
    });
});
app.post('/api/updateUserProfile', async (req, res) => {
    // console.log(req.body);
    // user = { ...user, ...req.body };
    const response = await db.userprofile.findOneAndReplace(
        { email: req.body.email },
        req.body
    );
    res.json(response);
});
app.get('/login', (req, res) => {
    const options = {
        root: path.join(__dirname, 'public'),
    };
    res.sendFile('index.html', options);
});

app.get('/projectdashboard', (req, res) => {
    const options = {
        root: path.join(__dirname, 'public'),
    };
    res.sendFile('index.html', options);
});

app.get('/mytasks', (req, res) => {
    const options = {
        root: path.join(__dirname, 'public'),
    };
    res.sendFile('index.html', options);
});

app.get('/register', (req, res) => {
    const options = {
        root: path.join(__dirname, 'public'),
    };
    res.sendFile('index.html', options);
});
app.use(express.static('./public'));

const PORT = 8080;
app.listen(PORT, (req, res) => {
    console.log(`server started on ${PORT}`);
});
