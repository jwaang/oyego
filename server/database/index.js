const mongoose = require("mongoose");
const config = require("../config");

require("./models/review");

exports.connect = () => {
  mongoose.connect(
    "mongodb+srv://user_001:12345@cluster0.cbcig.mongodb.net/oyego?authSource=admin&replicaSet=atlas-j4meo1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => {
      console.log("Connected to DB");
    }
  );
};
