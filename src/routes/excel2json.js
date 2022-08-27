import { Router } from "express";
import { xlsx2json } from "../controllers/e2jsonController.js";

const routeExcel2Json = Router();
routeExcel2Json.post('/excel/convertjson', xlsx2json);

export default routeExcel2Json;