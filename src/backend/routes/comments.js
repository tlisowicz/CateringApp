
import express from 'express';
import {CLIENT, COMMENTS_COLLECTION as comments} from '../consts.js';
import bodyParser from 'body-parser';

export const router = express.Router();
const jsonParser = bodyParser.json();


async function getComments(req, res) {
    comments.find({}).toArray().then(result => {
        res.json(result);
    }).catch(err => {
        res.status(400).send(`Error fetching comments: ${err}`)
    });
}

async function getCommentsByDish(req, res) {
    const id = req.params.id;
    const query = {dishId: Number(id)};
    comments.find(query).toArray().then(result => {
        res.json(result);
    }).catch(err => {
        res.status(400).send(`Error fetching comments: ${err}`)
    });
}

async function addComment(req, res) {
    const comment = req.body;
    comments.insertOne(comment).then(result => {
        res.status(201).json("Comment Added") 
    }).catch(err => {
        res.status(400).send(err)
    });
}

export async function deleteComments(dishID) {

    comments.deleteMany({dishId: dishID})
        .then(result => {
            console.log(`Deleted ${result.deletedCount} comments`)
        })
        .catch(err => {
            throw(`Error deleting comments: ${err}`)
        });
}

router.get('/', getComments);
router.get("/byDish/:id", getCommentsByDish);
router.post("/new", authenticateToken, jsonParser, addComment)