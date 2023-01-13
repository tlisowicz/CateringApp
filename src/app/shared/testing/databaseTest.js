import {image} from './base64encodedImg.js'
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://CateringAppBackend:LXDqxcqT8RUgJO0G@cateringappdatabase.sksedte.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const database = client.db("CateringAppDatabase");
    const collection = database.collection("Dishes");
    const query = { id: 1 };
    const dish = await collection.findOne(query);
    console.log(dish);
    client.close();
}

async function getAll() {
    const database = client.db("CateringAppDatabase");
    const collection = database.collection("Dishes");
    const dish = await collection.find({}).toArray();
    console.log(dish);
    client.close();
}

async function insert() {
    try {

        const database = client.db("CateringAppDatabase");
        const collection = database.collection("Comments");
        // const dish = {
        //     id: 10,
        //     img : ["assets/imgs/gyros-souvlaki-zawija-sie-w-chleb-pita-z-kurczakiem-ziemniakami-i-sosem-tzatziki_79830-1779.jpg"],
        //     name: "Souvlaki"}
            const result = await collection.insertMany([{"dishId":4,"rating":5,"comment":"Imagine all the eatables, living in conFusion!","author":"John Lemon","addedAt":"2023/01/13"},{"dishId":1,"rating":4,"comment":"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!","author":"Paul McVites","addedAt":"2023/01/13"},{"dishId":1,"rating":4,"comment":"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!","author":"Paul McVites","addedAt":"2023/01/13"},{"dishId":1,"rating":4,"comment":"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!","author":"Paul McVites","addedAt":"2023/01/13"},{"dishId":1,"rating":4,"comment":"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!","author":"Paul McVites","addedAt":"2023/01/13"},{"dishId":1,"rating":4,"comment":"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!","author":"Paul McVites","addedAt":"2023/01/13"},{"dishId":2,"rating":3,"comment":"Eat it, just eat it!","author":"Michael Jaikishan","addedAt":"2023/01/13"},{"dishId":3,"rating":4,"comment":"Ultimate, Reaching for the stars!","author":"Ringo Starry","addedAt":"2023/01/13"}]);
            console.log(`${result.insertedCount} documents were inserted`);
            client.close();
    } catch(err) {
        console.log(err);
    }
}


async function update() {
    const database = client.db("CateringAppDatabase");
    const collection = database.collection("Dishes");
    const filter = { id: 123123 };
    const updateDoc = {
        $set: {
            'img.0': image
        }
    };
    const result = await collection.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    client.close()
}


insert()