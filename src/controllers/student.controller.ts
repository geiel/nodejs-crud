import {NextFunction, Request, Response} from 'express';
import { check, param, query, validationResult } from 'express-validator';
import { generateStudentId, validatePropertyErros } from '../utils/utils';
import { Student, StudentDocument } from '../models/student.model';
import { NativeError } from 'mongoose';
import constants from '../utils/constants';

export const saveStudent = async (req: Request, res: Response) => {
    await check('firstName').exists().withMessage('required value').run(req);
    await check('lastName').exists().withMessage('required value').run(req);
    await check('age').exists().withMessage('required value').isNumeric().run(req);

    validatePropertyErros(req, res);

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

export const getStudent = async (req: Request, res: Response, next: NextFunction) => {
    await query('studentId').exists().withMessage('required value')
        .matches(constants.STUDENT_ID_REGEX).withMessage('invalid value').run(req);

    validatePropertyErros(req, res);

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

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    await param('studentId').matches(constants.STUDENT_ID_REGEX)
        .withMessage('invalid value').run(req);

    validatePropertyErros(req, res);

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

export const mergeStudent = async (req: Request, res: Response, next: NextFunction) => {
    await param('studentId').matches(constants.STUDENT_ID_REGEX)
        .withMessage('invalid value').run(req);

    validatePropertyErros(req, res);

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

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    await param('studentId').matches(constants.STUDENT_ID_REGEX)
        .withMessage('invalid value').run(req);

    validatePropertyErros(req, res);

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