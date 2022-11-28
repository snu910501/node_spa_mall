const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/spa_mall")
    .catch(err => console.log(err));
};

mongoose.connection.on('disconnected', connect);

module.exports = connect;