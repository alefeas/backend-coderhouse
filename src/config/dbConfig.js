import mongoose from "mongoose"
import { options } from "./options.js"

mongoose.set("strictQuery", false)
mongoose.connect(options.mongoDb.url, (err) => {
    err ? console.log('There was an error connecting to the database') : console.log('Successful connection')
})