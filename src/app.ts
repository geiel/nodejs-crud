import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./routes/student.routes";
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/studentsDB", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("mongo database conected"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);

export default app;