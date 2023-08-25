import express from "express"
import http from "http"

import authRoutes from "./routes/auth.routes.js"

const app = express()
const server = http.createServer(app)

app.use(express.json());
app.use(authRoutes)

export default server
