const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const likeSchema = Schema({
  likedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likedObject: {
    type: Schema.Types.ObjectId,
  },
});

module.exports = model("Like", likeSchema);
