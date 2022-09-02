import { Router } from "express";
import { delUserById, getUser, getUserByPasswordandUser, updateUserById } from "../controllers/querys.controlers";
import { addUser,getApuntesById, addPDF } from "../controllers/querys.controlers";


const router = Router()
//Usuario
router.get('/User', getUser);
router.post('/User', addUser);
router.post('/UserLogin', getUserByPasswordandUser);
router.delete("/User/:ID", delUserById);
router.put("/User", updateUserById );
// Apuntes
router.get('/Apuntes:id', getApuntesById);
//Listas
//Historial
//PDF
router.post('/PDF', addPDF);
export default router;
