import { check } from "express-validator";
import constants from "../utils/constants";

export const saveStudentValidation = [
    check('firstName').exists().withMessage('required value'),
    check('lastName').exists().withMessage('required value'),
    check('age').exists().withMessage('required value').isNumeric().withMessage('is numeric')
];

export const studentIdExistValidation = [
    check('studentId').matches(constants.STUDENT_ID_REGEX).withMessage('invalid value')
];

export const studentAgeValidation = [
    check('age').isNumeric().withMessage('is numeric')
];