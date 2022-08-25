import { Router } from "express";
import { getUser } from "../controllers/querys.controlers";
import { addUser } from "../controllers/querys.controlers";

const router = Router()

router.get('/User', getUser);
router.post('/User', addUser);
router.delete("User", );
router.put("User",  );


export default router;
