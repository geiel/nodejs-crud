import mongoose, { ConnectionOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer = new MongoMemoryServer();
const opts: ConnectionOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
};

export const connect = async () => {
    await mongoose.disconnect();

    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts, err => {
        if (err) {
            console.log(err);
        }
    });

    createStudent();
};

export const close = async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
}

const createStudent = () => {
    mongoose.models.Student.collection.insertOne({
        studentId: "2021-9343",
        firstName: "Test",
        lastName: "Test",
        age: 34
    });
}

