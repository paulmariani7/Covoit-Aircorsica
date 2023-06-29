const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    message: {
      type: String
    },
    sender: {
      type: String
    },
  
  timestamps: {
    type: String
  },
  room: {type: String}
  }
);

let Chat = mongoose.model("CHAT", chatSchema);

module.exports = Chat;
