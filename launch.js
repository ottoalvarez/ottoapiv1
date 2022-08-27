/** GENERAL IMPORTS */
import moment from 'moment'
import path from 'path'
import fs from 'fs'

/** ENVIREOMENT IMPORTS */
import rfs from 'rotating-file-stream'
import morgan from 'morgan';
import dotenv from 'dotenv'
import cors from 'cors';
import express from 'express'
import efu from 'express-fileupload';

/** CONFIG IMPORTS */
import { allowdomains } from './src/config/cors.js';

/** INIT ENVIROMENT */
const api = express();
const routePath = path.join(path.resolve(), './src/routes');
const corsEnable = function(req, callback) {
    const corsOptions = (allowdomains.indexOf(req.header('Origin')) !== -1 ? { origin: true } : { origin: false });
    callback(null, corsOptions) // callback expects two parameters: error and options
}
const morganLogs = rfs.createStream(`morgan-${moment().format('MMMM-YYYY')}.log`, {
    interval: '1d',
    path: path.join(path.resolve(), './src/logs')
})

dotenv.config();
api.use(morgan('combined', { stream: morganLogs }))
api.use(cors(corsEnable));
api.use(efu({
    abortOnLimit: true,
    limits: { fileSize: 52428800 /** 50MB */ },
    useTempFiles: true,
    tempFileDir: path.join(path.resolve(), './src/tmp'),
    debug: false
}))

fs.readdirSync(routePath).forEach(async(filename) => {
    let route = path.join(routePath, filename);
    try {
        const item = await
        import (route);
        api.use('/v1', item.default);
    } catch (error) {
        console.log(error.message);
    }
});

api.listen(process.env.portAPI, () => console.log(`[${moment()}] "API launched on port ${process.env.portAPI}"`))