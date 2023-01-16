import {USERS_COLLECTION as users, TOKEN_SECRET, REFRESH_TOKEN_SECRET} from '../consts.js';
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
                role: fetchedUser.role, 
                token: generateJWT(fetchedUser, false),
                refreshToken: generateJWT(fetchedUser, true)
            });
    }
    else {
        res.status(400).send(false);
    }
};

function generateJWT(user, refresh) {
    if (refresh) {
        return jwt.sign({username: user.username, role: user.role}, REFRESH_TOKEN_SECRET);
    }
    return jwt.sign({username: user.username, role: user.role}, TOKEN_SECRET, {expiresIn: '3h'});
}

export function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.post('/login', jsonParser, login);