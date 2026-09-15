import mongoose from "mongoose";
import dotenv from "dotenv/config";


const url = process.env.URL;


export async function dbConnect() {
    try {
        mongoose.connect(url);
        console.log("Mongodb connected");

    } catch (error) {
        console.log("Mongodb not connected", error);
    }
}