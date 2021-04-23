import { check } from "express-validator";
import constants from "../utils/constants";

export const saveStudentValidation = [
    check('firstName').exists().withMessage('required value'),
    check('lastName').exists().withMessage('required value'),
    check('age').exists().withMessage('required value').isNumeric().withMessage('is numeric')
];

export const getStudentValidation = [
    check('studentId').matches(constants.STUDENT_ID_REGEX).withMessage('invalid value')
];

export const updateStudentValidation = [
    check('studentId').matches(constants.STUDENT_ID_REGEX).withMessage('invalid value'),
    check('age').isNumeric().optional().withMessage('is numeric')
];

export const mergeStudentValidation = [
    check('studentId').matches(constants.STUDENT_ID_REGEX).withMessage('invalid value'),
    check('age').isNumeric().optional().withMessage('is numeric')
];

export const deleteStudentValidation = [
    check('studentId').matches(constants.STUDENT_ID_REGEX).withMessage('invalid value')
];