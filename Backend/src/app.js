import express from 'express'
import config from './config';

import querysRouters from './routes/querys.routers'
const app = express()
//settings
app.set('port', config.port );

//middelewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(querysRouters)
export default app