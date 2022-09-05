import { Router } from "express";
import { delUserById, getApuntes, getApuntesByIdUser, getApuntesByIdUserIdPDF, getUser, getUserByPasswordandUser, updateUserById } from "../controllers/querys.controlers";
import { addUser, addPDF } from "../controllers/querys.controlers";

const upload =  require("../utils/handleStorage");

const router = Router()
//Usuario
router.get('/User', getUser);  //general //eliminar en produccion, poco seguro
router.post('/User', addUser);
router.post('/UserLogin', getUserByPasswordandUser);
router.delete("/User/:ID", delUserById);
router.put("/User", updateUserById );
// Apuntes
router.get('/Apuntes', getApuntes); //PDF general
router.post('/Apuntes/User', getApuntesByIdUser); //PDF's por el ID
router.post('/Apuntes/User/ID', getApuntesByIdUserIdPDF); // PDF especifico, por el ID y ID_PDF


router.post("/PDF", upload.single("files"), addPDF);

//Listas
//Historial
//PDF
//router.post('/PDF', addPDF);
export default router;
