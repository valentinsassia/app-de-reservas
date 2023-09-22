import { Router } from "express";
const router = Router();

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/", (req, res) => {
  res.redirect("/La%20Esquina");
});

router.get("/:nombre", (req, res) => {
  res.sendFile(join(__dirname, "../../client/build", "index.html"));
});

router.get("/:nombre/:hora/:cancha/:dia/:fecha", (req, res) => {
  res.redirect("/La%20Esquina");
});

router.get("/:nombre/login/:hora/:cancha/:dia/:fecha", (req, res) => {
  res.sendFile(join(__dirname, "../../client/build", "index.html"));
});

router.get("/:nombre/gestionar", (req, res) => {
  res.sendFile(join(__dirname, "../../client/build", "index.html"));
});

export default router;
