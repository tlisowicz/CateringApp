import express from 'express';
import {USERS_COLLECTION as users, ORDER_HISTORIES as orderHistories, TOKEN_SECRET, REFRESH_TOKEN_SECRET} from '../consts.js';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import {authenticateToken, isAdmin} from './authorization.js';

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

async function getUsers(req, res) {
    users.find({})
        .toArray()
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
    const hash = crypto.createHash('sha256').update(user.password).digest('hex');
    user.password = hash;
    users.insertOne(user)
        .then(result => {
            console.log("Inserted user:"+ user.username);
           return res.status(201).json("User Added");
        }).catch(err => {
            res.status(400).send(err);
        });
}

async function banUser(req, res) {
    const username = req.body.username;
    const query = {username: username};
    console.log("Ban user: " + username);
    const update = {$set: {isBaned: true}};
    users.updateOne(query, update).then(result => {
        res.status(200).send(true);
    }).catch(err => {
        console.log("Jestem tutaj " + err);
        res.status(400).send(false);
    });  
}

async function unbanUser(req, res) {
    const username = req.body.username;
    const query = {username: username};
    const update = {$set: {isBaned: false}};
    users.updateOne(query, update).then(result => {
        res.status(200).send(true);
    }).catch(err => {
        res.status(400).send(false);
    });  
}

async function changeRoles(req, res) {
    const username = req.body.username;
    const roles = req.body.roles;
    const query = {username: username};
    const update = {$set: {roles: roles}};
    users.updateOne(query, update).then(result => {
        res.status(200).send(true);
    }
    ).catch(err => {
        res.status(400).send(false);
    });
}

router.get("/", authenticateToken, isAdmin, getUsers)
router.get('/:username', getUser)
      .patch('/ban', authenticateToken, isAdmin, jsonParser, banUser)
      .patch('/unban', authenticateToken, isAdmin, jsonParser, unbanUser)
      .patch('/changeRoles', authenticateToken, isAdmin, jsonParser, changeRoles);
router.post('/new', jsonParser, validateUsername, createUser);


