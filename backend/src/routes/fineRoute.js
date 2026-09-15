import express from "express"
import { fineCalculate } from "../controllers/fineCalculateController.js";
import { hashToken } from "../middleware/hashToken.js";
import { isStudent } from "../middleware/isStudent.js";

const fineRoute = express.Router();


fineRoute.put("/fineAmmount/:borrowId", hashToken, isStudent, fineCalculate)

export default fineRoute