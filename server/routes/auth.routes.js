import { Router } from "express";
const router = Router()

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/hola", (req, res) => {
    res.sendFile(join(__dirname, "./../client/build"))
})

export default router

