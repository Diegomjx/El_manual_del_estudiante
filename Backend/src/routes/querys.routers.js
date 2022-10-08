import { Router } from "express";
import { addList, addPDFalHistorial, addPDFalMegusta, addPDFtoList, addSeguir, Aprube, dellList, dellPDF, dellPDFalMegusta, dellPDFtoList, dellSeguir, delUserById, disapproved, getApuntes, getApuntesByIdUser, getApuntesByIdUserIdPDF, getApuntesByUSERNAME, getApuntesRevisedorNo, getExistInList, getInfoApunte, getListById, getListByIdandID_PDF, getPDFalHistorial, getPDFalMeGusta, getPDFsdelasListas, getSeguir, getUser, getUserByPasswordandUser, Serch, UpdateApuntesByIDPDF, updateList, updateUserById } from "../controllers/querys.controlers";
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
router.post('/Apuntes', getApuntes); //PDF general
router.post('/Apuntes/User', getApuntesByIdUser); //PDF's por el ID
router.post('/Apuntes/User/ID', getApuntesByIdUserIdPDF); // PDF especifico, por el ID y ID_PDF
router.delete("/Apuntes/:ID", dellPDF);
router.post("/PDF", upload.single("files"), addPDF);
router.post("/Apuntes/Update", UpdateApuntesByIDPDF);
router.post("/Apuntes/info", getInfoApunte);
router.post("/Apuntes/invitado", getApuntesByUSERNAME);

router.post('/Admin/getApuntesRevised', getApuntesRevisedorNo);
router.post('/Admin/Appunte/Aprube', Aprube);
router.post('/Admin/Appunte/disapproved', disapproved);

//seguir
router.post("/Seguidor/dell", dellSeguir);
router.post("/Seguidor/add",addSeguir);
router.post("/Seguidor/get",getSeguir );
//Lis
router.post('/List', addList); //agregar lista
router.post('/List/Dell',dellList);
router.post('/List/Update',updateList);
router.post('/List/ID', getListById);   //todas las listas de un usuario
router.post('/List/IDPDF',getListByIdandID_PDF); //para los ckeck list.
router.post('/List/addPDF',addPDFtoList); //agregar a la lista
router.post('/List/DELLPDF', dellPDFtoList); //eliminar de la lista
router.post('/List/getPDF',getPDFsdelasListas); //obtener los pdf de la lista

//Historial
router.post('/Historial/add', addPDFalHistorial);
router.post('/Historial/get',getPDFalHistorial);
//Megusta
router.post('/Megusta/add', addPDFalMegusta);
router.post('/Megusta/dell', dellPDFalMegusta);
router.post('/Megusta/get',getPDFalMeGusta);
//PDF
//router.post('/PDF', addPDF);
// Buscador
router.post('/Serch/:Serch', Serch);
export default router;
