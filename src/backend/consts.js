import  { ServerApiVersion } from 'mongodb';

export const DATABASE = "CateringAppDatabase"
export const COLLECTION = "Dishes";
export const URI = "mongodb+srv://CateringAppBackend:LXDqxcqT8RUgJO0G@cateringappdatabase.sksedte.mongodb.net/?retryWrites=true&w=majority";
export const CONFIG = { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 };

