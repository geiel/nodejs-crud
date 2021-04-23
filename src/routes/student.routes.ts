import express from "express";
import { 
    saveStudentValidation, 
    updateStudentValidation, 
    mergeStudentValidation, 
    deleteStudentValidation, 
    getStudentValidation 
} from "../validations/student.validation";
import * as studentController from "../controllers/student.controller";
import validations from "../validations/validations";

const router = express.Router();

router.post('/students', validations(saveStudentValidation), studentController.saveStudent);

router.get('/students', validations(getStudentValidation), studentController.getStudent);

router.put('/students/:studentId', validations(updateStudentValidation), studentController.updateStudent);

router.patch('/students/:studentId', validations(mergeStudentValidation), studentController.mergeStudent);

router.delete('/students/:studentId', validations(deleteStudentValidation), studentController.deleteStudent);

export default router;