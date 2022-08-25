import express from 'express'
import config from './config';
const app = express()
//settings
app.set('port', config.port )
export default app