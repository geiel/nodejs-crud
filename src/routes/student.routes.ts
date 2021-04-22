import express from "express";
import { saveStudentValidation, studentIdExistValidation, studentAgeValidation } from "../controllers/student.validation";
import * as studentController from "../controllers/student.controller";

const router = express.Router();

router.post('/students', saveStudentValidation, studentController.saveStudent);
router.get('/students', studentIdExistValidation, studentController.getStudent);
router.put('/students/:studentId', [...studentIdExistValidation, ...studentAgeValidation] ,studentController.updateStudent);
router.patch('/students/:studentId', [...studentIdExistValidation, ...studentAgeValidation] ,studentController.mergeStudent);
router.delete('/students/:studentId', studentIdExistValidation ,studentController.deleteStudent);

export default router;