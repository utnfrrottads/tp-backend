const mongoose = require("mongoose");
require("dotenv").config({ path: "../../.env" });

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {})
            .then(console.log("Database is connected"));
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connection;