import  { ServerApiVersion,MongoClient } from 'mongodb';
export const DATABASE = "CateringAppDatabase"
export const URI = "mongodb+srv://CateringAppBackend:LXDqxcqT8RUgJO0G@cateringappdatabase.sksedte.mongodb.net/?retryWrites=true&w=majority";
export const CONFIG = { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 };

export const CLIENT = new MongoClient(URI, CONFIG);
export const DATABASE_CONNECTION = CLIENT.db(DATABASE);
export const DISHES_COLLECTION = DATABASE_CONNECTION.collection("Dishes");
export const COMMENTS_COLLECTION = DATABASE_CONNECTION.collection("Comments");
