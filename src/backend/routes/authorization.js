import {USERS_COLLECTION as users, TOKEN_SECRET, REFRESH_TOKEN_SECRET, REFRESH_TOKENS as tokens} from '../consts.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import express from 'express';
import bodyParser from 'body-parser';

export const router = express.Router();
const jsonParser = bodyParser.json();

async function login(req, res) {
    const user = req.body;
    const hash = crypto.createHash('sha256').update(user.password).digest('hex');
    const query = { email: user.email};
    const fetchedUser = await users.findOne(query);
    if (fetchedUser === null) {
        res.status(400).send(false);
        return;
    }    
    const fetchedHash = fetchedUser.password;
    
    if (hash === fetchedHash) {
        res.status(200).send(
            {
                username: fetchedUser.username, 
                roles: fetchedUser.roles, 
                token: generateJWT(fetchedUser, false),
                refreshToken: generateJWT(fetchedUser, true),
                isBaned: fetchedUser.isBaned
            });
    }
    else {
        res.status(400).send(false);
    }
};

function generateJWT(user, refresh) {

    const userState = 
    {
        username: user.username,
        roles: user.roles,
    }
    if (refresh) {
        const refteshToken = jwt.sign(userState, REFRESH_TOKEN_SECRET);
        tokens.insertOne({token: refteshToken, username: user.username});
        return refteshToken;
    }
    return jwt.sign(userState, TOKEN_SECRET, {expiresIn: '3h'});
}

export function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });
}

export function isAdmin(req, res, next) {
    if (req.user.roles.includes("admin")) {
        next();
    }
    else {
        res.sendStatus(403);
    }
}

export function isDishManagerOrAdmin(req, res, next) {
    if(req.user.roles.includes("dishManager") || req.user.roles.includes("admin")) {
        next();
    }
    else {
        res.sendStatus(403);
    }
}

async function logOut(req, res) {
    const username = req.body.username;
    tokens.deleteOne({username: username});
    res.status(200).json({message:"Logged out"});
}

async function refreshToken(req, res) {
    const token = req.body.token;
    const username = req.body.username;
    if (token == null) return res.status(401);

    const fetchedToken = await tokens.findOne({username: username});
    if (fetchedToken === null) return res.status(403);

    const newToken = generateJWT(req.body, false);
    return res.status(200).json({token:newToken})
}

router.post('/login', jsonParser, login);
router.post('/logout', jsonParser, logOut);
router.post('/auth/refresh', jsonParser, refreshToken);