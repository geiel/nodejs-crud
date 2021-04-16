import mongoose from "mongoose";

interface IStudent {
    studentId: string,
    firstName: string,
    lastName: string,
    age: number
};

interface StudentModelInterface extends mongoose.Model<StudentDocument> {
    build(student: IStudent): StudentDocument
}

export interface StudentDocument extends mongoose.Document {
    studentId: string,
    firstName: string,
    lastName: string,
    age: number
};

const studentSchema = new mongoose.Schema({
    studentId: String,
    firstName: String,
    lastName: String,
    age: Number
});

studentSchema.statics.build = (student: IStudent) => {
    return new Student(student);
}

const Student = mongoose.model<StudentDocument, StudentModelInterface>('Student', studentSchema);

export { Student }