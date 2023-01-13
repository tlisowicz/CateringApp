
import express from 'express';
import {CLIENT, DISHES_COLLECTION as dishes} from '../consts.js';
import bodyParser from 'body-parser';

export const router = express.Router();
const jsonParser = bodyParser.json();

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
        console.log(result);
        res.status(201).json("Dish Added") 
    } catch(err) {
        res.status(400).send(err)
    }
}

async function deleteDish(req, res) {
    try {
        dishes.deleteOne({id: Number(req.params.id)}).then(result => {
            res.status(200).json({status: "Deleted"})
        }).catch(err => {
            res.status(400).send(err)
        });

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
        const servingsPerDay = value.servingsPerDay;
        console.log(value);
        console.log(avarageRating)
        if (avarageRating !== undefined) {
            const update = {
                $set: {
                    avarageRating: avarageRating
                }
            }
            const result = await dishes.updateOne(filter, update);
            res.status(200).json(result);
        }
    
        else if (servingsPerDay) {
            const update = {
                $set: {
                    servingsPerDay: servingsPerDay
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
router.get("/lastID", getLastID);
router.route('/:id')
    .get(getDish)
    .delete(deleteDish)
    .patch(jsonParser, updateDish);
router.post('/new', jsonParser, addDish);
