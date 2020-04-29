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
const bcrypt = require('bcrypt');
// import { v4 as uuidv4 } from 'uuid';
let db = require('./models');
let user = require('./user.json');
const API_URL = process.env.MLAB
    ? 'https://taskmaster0.herokuapp.com' : 'http://localhost:8080';
// let sharedDashboard = require('./shared.json');

// const db_host = process.env.DB_HOST;
// console.log(process.env);

// session checking middleware
async function needSession(req, res, next) {
    console.log(`[middleware] session url(${req.url}) session(${req.headers.session || ''}) `);

    // check session set, and it's valid
    if (!req.headers.session ||
        req.headers.session.length !== 36 ||
        !(await checkSession(req.headers.session))) {

        console.log('[middleware:session] invalid session, indicating redirect');
        res.status(403).send({ error: 'Requires valid session. Please login again.' });
        return;
    }

    // session was good, let's continue endpoint processing...
    next();
}

// input: session
// output: boolean
async function checkSession(session) {
    const userData = await db.userprofile.findOne({ session });
    console.log(`[checkSession] session(${session}) -> valid? ${userData._id ? true : false}`);
    return (userData._id ? true : false);
}

// OAUTH Authentication
async function createOAuthSession(userData) {
    console.log('[createOAuthSession]', userData);

    // register user in system (if they aren't there, and get the associated session)
    const session = uuid();
    const authUserData = await registerUser(userData, session);

    // returns the logged-in user info to javascript
    return authUserData;
}
// oAuth - list providers we'll accept .env info for
require('./oAuth')(app, API_URL, ['twitter', 'google', 'facebook', 'github'], createOAuthSession);

// if we give a 'session', it will save that for this newly registered user
// OR if the user exists, it will UPDATE the session
// input: <object> { name, email, password }, session
// output: { message, id, name }
async function registerUser(userData, session = '') {
    if (!userData.name || (userData.type === 'local' && !userData.email)) {
        console.log('[registerUser] invalid userData! ', userData);
        return { message: 'Invalid user data', id: '', name: '' };
    }

    let passwordHash = '';
    if (!userData.type || userData.type === 'local') {
        if (!userData.password) {
            console.log('[registerUser] invalid userData (need password)! ', userData);
            return { message: 'Invalid user password', id: '', name: '' };
        }
        const saltRounds = 10;
        passwordHash = await bcrypt.hash(userData.password, saltRounds);
        console.log(`[registerUser] (hash=${passwordHash}) req.body:`, userData);
        userData.type = 'local';
    }

    console.log('[registerUser], userData: ', userData);



    // check if user exists, and refuse for local users, and quietly change just session for other types
    let duplicateUser = {};
    if (!userData.authId) {
        duplicateUser = await db.userprofile.findOne({ email: userData.email });

        if (duplicateUser && duplicateUser._id) {
            return {
                error: 'Duplicate email, try another or login',
                id: false, session: false
            };
        }
    } else {
        duplicateUser = await db.userprofile.findOne({ authId: userData.authId });

        if (duplicateUser && duplicateUser._id) {
            let saveUser = await db.userprofile.findByIdAndUpdate({ _id: duplicateUser._id }, { session });
            console.log(`   -> duplicate user (ie they've logged in before via oAuth), just update session: ${session}`, saveUser);
            saveUser = JSON.stringify(saveUser);
            saveUser = JSON.parse(saveUser);
            return {
                message: `Welcome back ${saveUser.name}`,
                id: saveUser._id,
                name: saveUser.name,
                email: saveUser.email,
                thumbnail: saveUser.thumbnail,
                session,
                createdAt: saveUser.createdAt
            };
        }
    }

    

    let userSave = {
        name: userData.name,
        firstname: userData.name,
        lastname: userData.name,
        email: userData.email || '',
        thumbnail: userData.thumbnail || '',
        authId: userData.authId || '',
        password: passwordHash,
        type: userData.type,
        session
    };
    user = { ...user, ...userSave}

    user.user_settings= {
        "theme" : "light",
            "profilePicUrl" : "url"
    };

    user.dashboards[0].owner = userData.email;
    user.dashboards[0].id = uuid();
    //saveData.dashboards[0].columns = [{}];
    user.dashboards[0].columns[0].id = uuid();
    //saveData.dashboards[0].columns[0].cards = [{}];
    user.dashboards[0].columns[0].cards[0].id = uuid();

    // saveData.sharedToUser = [];
    // saveData.sharedByUser = [];
    

    const dbUser = new db.userprofile(user);
    const saveUser = await dbUser.save();
    return {
        message: `Success! ${saveUser.name} was successfully registered`,
        id: saveUser._id,
        name: saveUser.name,
        email: saveUser.email,
        thumbnail: saveUser.thumbnail,
        session,
        createdAt: saveUser.createdAt
    };
}



async function getUsers() {
    const result = await db.find({}, { email: 1 });
    // console.log('function getUsers called', result);
}

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// // Serve the static files from the React app
// // if (process.env.PORT) {
//     app.use(express.static(path.join(__dirname, 'build')));
// // }
// app.get('/', (req, res) => {
//     //res.sendFile(path.join(__dirname + '../build/index.html'));
//     //res.sendFile(path.join('../build/index.html'));
//     res.sendFile(path.resolve("..","build", "index.html"));
// });


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
    let passwordHash = '';
    const saltRounds = 10;
    passwordHash = await bcrypt.hash(req.body.password, saltRounds);
    console.log(`[addUser] (hash=${passwordHash}) req.body:`, user);
    user.password = passwordHash;
    user.session = null;

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
    //const userProfile = await db.userprofile.findOne(query);
    let userProfile = await db.userprofile.find(query, { _id: 0, email: 1, password: 1 });
    // userProfile = JSON.stringify(userProfile);
    // userProfile = JSON.parse(userProfile);
    // console.log(b[0].password);

    // let userProfile = JSON.stringify(userProfile1);
    // userProfile = JSON.parse(userProfile);
    console.log(typeof userProfile);
    let response;
    if (userProfile) {
        userProfile = JSON.stringify(userProfile);
        userProfile = JSON.parse(userProfile);
        console.log(typeof userProfile);
        console.log(req.body.password);
        if (userProfile[0]) {
            console.log(userProfile[0].password);
            const isValidPassword = await bcrypt.compare(req.body.password, userProfile[0].password);
            if (isValidPassword) {
                response = {
                    message: 'OK',
                    email: userProfile[0].email
                };
            } else {
                response = { message: 'Invalid username/password' };
            }
        } else {
            response = { message: 'Invalid username/password' };
        }
    } else {
        response = { message: 'Database error' };
    }
    res.json(response);
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

let static_folder = (process.env.PORT) ? 'build' : 'public';
app.get('/login', (req, res) => {
    const options = {
        root: path.join(__dirname, static_folder),
    };
    res.sendFile('index.html', options);
});

app.get('/projectdashboard', (req, res) => {
    const options = {
        root: path.join(__dirname, static_folder),
    };
    res.sendFile('index.html', options);
});

app.get('/mytasks', (req, res) => {
    const options = {
        root: path.join(__dirname, static_folder),
    };
    res.sendFile('index.html', options);
});

app.get('/register', (req, res) => {
    const options = {
        root: path.join(__dirname, static_folder),
    };
    res.sendFile('index.html', options);
});
app.use(express.static('./' + static_folder));

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
    console.log(`server started on ${PORT}`);
});
