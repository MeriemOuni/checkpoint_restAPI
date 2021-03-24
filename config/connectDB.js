// mongoose
const mongoose = require("mongoose");

// connect DB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log(`Database connected ...`)
    } catch (error) {
        console.error(`Connection to DB failed !!! ${error}`)
    }
    
}

module.exports = connectDB