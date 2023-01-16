import express from 'express';
import {USERS_COLLECTION as users, ORDER_HISTORIES as orderHistories, TOKEN_SECRET, REFRESH_TOKEN_SECRET} from '../consts.js';
import bodyParser from 'body-parser';
import crypto from 'crypto';

export const router = express.Router();
const jsonParser = bodyParser.json();

async function getUser(req, res) {
    const username = req.params.username;
    const query = { username: username};
    users.findOne(query)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(400).send(err);
        });
}

async function getOrderHistory(req, res) {
    const username = req.params.username;
    const query = { userName: username};
    orderHistories.findOne(query)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(400).send(err);
        });
}

async function validateUsername(req, res, next) {
    const user = req.body;
    users.find()
        .toArray()
        .then(result => {
            if (result.length === 0) {
                next();
                return;
            }
            if (result.some(r => r.username === user.username)) {
                console.log("Username already taken")
                return res.status(400).send("This username is already taken");
            }
            if (result.some(r => r.email === user.email)) {
                console.log("The is already an account with this email")
                return res.status(400).send("The is already an account with this email");
            }
            else {
                next();
            }
        }).catch(err => {
            console.log("Error catched: " + err);
            res.status(400).send(err);
        });
        
}

async function createUser(req, res) {
    const user = req.body;
    console.log("Creating user: " + user.username);
    const hash = crypto.createHash('sha256').update(user.password).digest('hex');
    user.password = hash;
    users.insertOne(user)
        .then(result => {
            console.log("Inserted");
            console.log(result);
           return res.status(201).json("User Added");
        }).catch(err => {
            res.status(400).send(err);
        });
}


router.get('/:username/orderHistory', getOrderHistory);
router.get('/:username', getUser);
router.post('/new', jsonParser, validateUsername, createUser);


