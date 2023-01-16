
import express from 'express';
import { DISHES_COLLECTION as dishes, COMMENTS_COLLECTION as comments} from '../consts.js';
import bodyParser from 'body-parser';
import {deleteComments} from './comments.js';
import {authenticateToken} from './authorization.js';

export const router = express.Router();
const jsonParser = bodyParser.json({limit: '50mb'});

async function getDishes(req, res) {
    try {
        const result = await dishes.find({}).toArray();
        res.json(result);
    } catch(err) {
        res.status(400).send("Error fetching dishes")
    }
    
}

async function getDish(req, res) {
    const id = req.params.id;

    try {
        const query = { id: Number(id)};
        const result = await dishes.findOne(query);
        res.json(result);
    } catch(err) {
        res.status(400).send("Error fetching dish")
    }
    
}

async function addDish(req, res) {
    const dish = req.body;

    try {
        const result = await dishes.insertOne(dish);
        res.status(201).json("Dish Added") 
    } catch(err) {
        res.status(400).send(err)
    }
}

async function deleteDish(req, res) {
    try {
        const query = {id: Number(req.params.id)};
        comments.find({dishId: Number(req.params.id)}).toArray().then(result => {
           if (result.length > 0) {
               deleteComments(Number(req.params.id)).catch(err => {throw(err)});
           }
        }).catch(err => {
            res.status(400).send(err)
        })

        dishes.deleteOne(query).then(result => {
            res.status(200).json({status: "Deleted"})
        }).catch(err => {
            res.status(400).send(err)
        })
    } catch(err) {
        res.status(400).send(err)
    }
    
}

async function getLastID(req, res) {
    try {
        const sort = {id: -1}
        const result = await dishes.find({}).sort(sort).limit(1).toArray();
        res.status(200).json(result[0].id);
    } catch(err) {
        res.status(400).send("Error fetching last ID")
    }
}

async function updateDish(req, res) {
    try {
        const value = req.body;
        const filter = { id:Number(req.params.id)};
        const avarageRating = value.avarageRating;
        const userBought = value.servingsPerDay;
        if (avarageRating !== undefined) {
            const update = {
                $set: {
                    avarageRating: avarageRating
                }
            }
            const result = await dishes.updateOne(filter, update);
            res.status(200).json(result);
        }
    
        else if (userBought) {
            const dish = await dishes.findOne(filter);
            const oldCount = dish.servingsPerDay;
            const update = {
                $set: {                   
                    servingsPerDay: oldCount - userBought
                }
            }
            const result = await dishes.updateOne(filter, update);
            res.status(200).json(result);
        }
    
        else{
            res.status(400).send("Bad request")
        }
    } catch(err) {
        res.status(400).send("Error updating dish")
    }
   

}

router.get('/', getDishes);
router.get("/lastID", authenticateToken,  getLastID);
router.route('/:id')
    .get(authenticateToken, getDish)
    .delete(authenticateToken, deleteDish)
    .patch(authenticateToken, jsonParser, updateDish);
router.post('/new', authenticateToken, jsonParser, addDish);
