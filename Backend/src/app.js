import express from 'express'
import config from './config';
import cors from "cors";
import morgan from "morgan";

import querysRouters from './routes/querys.routers'
const app = express()
//settings
app.set('port', config.port );

//middelewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(querysRouters)
export default app