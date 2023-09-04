import { Router } from "express";
const router = Router()

import { dirname, join } from "path";
import { fileURLToPath } from "url";

router.get("/La%20Esquina", (req, res) => {
    res.send("Holaa")
})

export default router

