import express from 'express';
import cors from "cors";
const app = express();

import {router as dishesRouter}  from './routes/dishes.js' ;

app.use(cors());

app.use('/dishes', dishesRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});