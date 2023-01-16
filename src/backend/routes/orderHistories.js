import express from 'express';
import {CLIENT, ORDER_HISTORIES as histories} from '../consts.js';
import bodyParser from 'body-parser';
import {authenticateToken} from './authorization.js';

export const router = express.Router();
const jsonParser = bodyParser.json();

async function getHistory(req,res) {
    const username = req.params.username;
    const query = {username: username};
    histories.find(query)
        .toArray()
        .then(result => {
        res.json(result);
    }).catch(err => {
        res.status(400).send(err);
    });
}

async function addHistory(req, res) {
    const history = req.body;
    histories.insertOne(history)
        .then(result => {
            res.status(201).json("History added");
        }).catch(err => {
            res.status(400).send(err);
        });
}

router.get('/:username', authenticateToken, getHistory);
router.post("/add", authenticateToken, jsonParser, addHistory);