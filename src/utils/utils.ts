import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const generateStudentId = () => {
    const date = new Date();
    return `${date.getFullYear()}-${Math.floor(Math.random() * 9999) + 1111}`;
};

export const validatePropertyErros = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
    }
}