import { Router } from "express";
const routeBase = Router();

routeBase.get('/sayhello', (req, res) => { res.send('Hello World!') });

export default routeBase;