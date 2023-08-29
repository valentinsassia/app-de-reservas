import app from "./app.js";
// import { PORT } from "./config.js";
import { connectDB } from "./db.js";

connectDB()
 
app.listen(4000)

console.log("server esta corriendo en el puerto",  4000)