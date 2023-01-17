import  { ServerApiVersion,MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

export const DATABASE = "CateringAppDatabase";
export const URI = process.env.MONGODB_URI;
export const CONFIG = { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 };
export const TOKEN_SECRET = process.env.TOKEN_SECRET
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

export const CLIENT = new MongoClient(URI, CONFIG);
export const DATABASE_CONNECTION = CLIENT.db(DATABASE);
export const DISHES_COLLECTION = DATABASE_CONNECTION.collection("Dishes");
export const COMMENTS_COLLECTION = DATABASE_CONNECTION.collection("Comments");
export const USERS_COLLECTION = DATABASE_CONNECTION.collection("Users");
export const ORDER_HISTORIES = DATABASE_CONNECTION.collection("OrderHistories");
export const REFRESH_TOKENS = DATABASE_CONNECTION.collection("RefreshTokens");