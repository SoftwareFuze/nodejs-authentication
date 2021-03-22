const express = require('express');
const app = express();
const fs = require('fs');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.static('public'));

app.get('/api', (req, res) => {
    res.send('Welcome to the api!');
});

app.post('/api/login', (req, res) => {
    const user = {
        name: req.body.name,
        pass: req.body.pass
    };

    fs.readFile(process.env.DATABASE_PATH, (e, data) => {
        let exists = false;
        data = JSON.parse(String(data));
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == user.name && data[i].pass == user.pass) {
                const token = jwt.sign({ user }, process.env.API_SECRET_KEY);
                res.json({ token, status: 200 });
                return;
            } else {
                continue;
            }
        }
        res.json({ status: 406 });
    });
});

app.post('/api/register', (req, res) => {
    const user = {
        name: req.body.name,
        pass: req.body.pass
    };

    fs.readFile(process.env.DATABASE_PATH, (e, data) => {
        let exists = false;
        data = JSON.parse(String(data));
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == user.name) exists = true;
        }
        if (!exists) {
            const token = jwt.sign({ user }, process.env.API_SECRET_KEY);
            data[data.length] = user;
            fs.writeFile(process.env.DATABASE_PATH, JSON.stringify(data, null, 2), e => {});
            res.json({ token, status: 200 });
        } else 
            res.json({ status: 406 });
    });
});

const verifyToken = (req, res, next) => {
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(" ")[1];
        req.token = token;
        next();
    } else {
        res.json({ status: 401 });
    }
}

app.post('/getUser', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.API_SECRET_KEY, (e, data) => {
        if (e) 
            res.json({ status: 403 });
        else 
            res.json({ status: 200, data, token: req.token, message: "this is some protected text" });
    });
});


const server = app.listen(5000);