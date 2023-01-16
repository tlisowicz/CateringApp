import express from 'express';
import cors from "cors";
import {router as dishesRouter}  from './routes/dishes.js';
import {router as commentsRouter}  from './routes/comments.js';
import {router as usersRouter}  from './routes/users.js';
import {router as orderHistoriesRouter}  from './routes/orderHistories.js';
import {router as authRouter}  from './routes/authorization.js';

const app = express();
app.use(cors());
app.use("/", authRouter);
app.use('/dishes', dishesRouter);
app.use('/comments', commentsRouter);
app.use("/users", usersRouter);
app.use("/orderHistories", orderHistoriesRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
