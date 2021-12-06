const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  lastSeen: { type: Types.ObjectId, ref: "Post" },
  status: {
    type: String,
    enum: ["user", "admin", "deleted", "blocked"],
    default: "user",
  },
});

module.exports = model("User", schema);
