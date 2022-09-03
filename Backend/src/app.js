import express from 'express'
import config from './config';
import cors from "cors";
import morgan from "morgan";
import multer  from "multer";
import querysRouters from './routes/querys.routers'
import {getConnection, sql} from "./database"
const app = express()


app.use(express.static("./public"));
//settings
app.set('port', config.port );

//middelewares
app.use(cors()); 
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(querysRouters)
/***************subir información ***********/
const storage = multer.diskStorage({
    filename: function (res, file, cb) {
      const ext = file.originalname;//.split(".").pop(); //TODO pdf / jpeg / mp3
      const fileName = Date.now(); //TODO 12312321321
      cb(null, `${fileName}.${ext}`); //TODO 123123213232.pdf
    },
    destination: function (res, file, cb) {
      cb(null, `./public`);
    },
  });

  const upload = multer({ storage });

  

  app.post("/PDF", upload.single("files"), async(req, res) => {
    const file = req.file.filename;
    const NAME = req.body.NAME;
    const ID = req.body.ID;
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input("NOMBRE", sql.VarChar, NAME)
        .input("ID",ID)
        .input("PDF", sql.VarChar, file)
        .query("INSERT INTO Apuntes (ID,NOMBRE,PDF) VALUES (@ID,@NOMBRE,@PDF) ");
        res.json({ status:1, msg: "ok" });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }

    
  });


export default app
