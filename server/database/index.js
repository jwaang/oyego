const mongoose = require("mongoose");
const config = require("../config");

require("./models/review");

exports.connect = () => {
  mongoose.connect(
    config.DATABASE,
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
