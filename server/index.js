import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";

connectDB()
 
app.listen(PORT)

console.log("server esta corriendo en el puerto",  PORT)