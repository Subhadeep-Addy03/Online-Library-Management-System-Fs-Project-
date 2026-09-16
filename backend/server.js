import express from "express";
import dotenv from "dotenv/config";
import { dbConnect } from "./src/config/dbConnect.js";
import userRoute from "./src/routes/userRoutes.js";
import bookRoute from "./src/routes/bookRoutes.js";
import borrowBookRoute from "./src/routes/borrowBookRoute.js";
import fineRoute from "./src/routes/fineRoute.js";
import paymentRoute from "./src/routes/paymentRoute.js";
import cors from "cors"
import dueDateReminder from "./src/alert/dueDateReminder.js";

const app = express()
const portNo = process.env.PORT;

app.use(cors())
//Database
dbConnect()

//Middleware
app.use(express.json())

//corn
dueDateReminder()

//Routes
app.use("/user", userRoute)
app.use("/book", bookRoute)
app.use("/borrow", borrowBookRoute)
app.use("/fine", fineRoute)
app.use("/payment", paymentRoute)


app.get("/", (req, res) => {
    res.send("Api Working !")
})

app.listen(portNo, () => {
    console.log(`Server is running at port no : ${portNo}`);
})
