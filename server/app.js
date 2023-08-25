import express from "express";
import cors from "cors";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

// app.use(authRoutes);

app.use(express.static(join(__dirname, "./../client/build")));

export default app;
