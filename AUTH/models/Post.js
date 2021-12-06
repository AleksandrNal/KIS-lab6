const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  content: { type: String, require: true },
  liked: [{ type: Types.ObjectId, ref: "User" }],
});

module.exports = model("Post", schema);
