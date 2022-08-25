import { Router } from "express";
import { delUserById, getUser, getUserByPasswordandUser, updateUserById } from "../controllers/querys.controlers";
import { addUser,getApuntesById } from "../controllers/querys.controlers";

const router = Router()

router.get('/User', getUser);
router.post('/User', addUser);
router.post('/UserLogin', getUserByPasswordandUser);
router.delete("/User/:ID", delUserById);
router.put("/User", updateUserById );

router.get('/Apuntes:id', getApuntesById);
export default router;
