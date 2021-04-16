import express from "express";
import * as studentController from "../controllers/student.controller";

const router = express.Router();

router.post('/students', studentController.saveStudent);
router.get('/students', studentController.getStudent);
router.put('/students/:studentId', studentController.updateStudent);
router.patch('/students/:studentId', studentController.mergeStudent);
router.delete('/students/:studentId', studentController.deleteStudent);

export default router;