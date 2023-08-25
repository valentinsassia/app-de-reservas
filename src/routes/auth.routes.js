import { Router } from "express";
import { funcioness } from "../controllers/auth.controller.js";

const router = Router()

router.get("/", funcioness)

export default router

