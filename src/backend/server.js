import express from 'express';
import cors from "cors";
const app = express();

import {router as dishesRouter}  from './routes/dishes.js';
import {router as commentsRouter}  from './routes/comments.js';

app.use(cors());

app.use('/dishes', dishesRouter);
app.use('/comments', commentsRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
