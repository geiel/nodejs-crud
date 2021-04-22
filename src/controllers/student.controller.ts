import {NextFunction, Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { generateStudentId } from '../utils/utils';
import { Student, StudentDocument } from '../models/student.model';
import { NativeError } from 'mongoose';

export const saveStudent = (req: Request, res: Response, next: NextFunction) => {
    validationResult(req).throw();

    const student = Student.build({
        studentId: generateStudentId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age 
    });

    student.save((err, student) => {
        if (err) console.log(err);
        res.status(201).json(student);
    });
}

export const getStudent = (req: Request, res: Response, next: NextFunction) => {
    validationResult(req).throw();

    const studentId = req.query.studentId as string;
    Student.findOne({studentId}, (err: NativeError, student: StudentDocument) => {
        if (err) return next(err);

        if (!student) {
            res.status(404).json({
                studentId,
                message: "the student was not found"
            });
        } else {
            res.status(200).json(student);
        }
    })
}

export const updateStudent = (req: Request, res: Response, next: NextFunction) => {
    validationResult(req).throw();

    const studentId = req.params.studentId;
    const updateStudent = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    }

    Student.updateOne({studentId}, updateStudent, undefined, (err: NativeError, doc) => {
        if (err) return next(err);

        if (doc.n === 0) {
            res.status(404).json({
                studentId,
                message: "the student was not found"
            });
        }
        res.status(204).end();
    })
}

export const mergeStudent = (req: Request, res: Response, next: NextFunction) => {
    validationResult(req).throw();

    const studentId = req.params.studentId;
    const updateStudent = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    }

    Student.updateOne({studentId}, updateStudent, {omitUndefined: true}, (err: NativeError, doc) => {
        if (err) return next(err);

        if (doc.n === 0) {
            res.status(404).json({
                studentId,
                message: "the student was not found"
            });
        }
        res.status(204).end();
    })
}

export const deleteStudent = (req: Request, res: Response, next: NextFunction) => {
    validationResult(req).throw();

    const studentId = req.params.studentId;
    Student.findOneAndDelete({studentId}, undefined, (err: NativeError, student: StudentDocument) => {
        if (err) return next(err);

        if (!student) {
            res.status(404).json({
                studentId,
                message: "the student was not found"
            });
        }
        res.status(204).end();
    });
}