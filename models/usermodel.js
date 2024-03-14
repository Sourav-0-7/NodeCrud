const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Please enter the name"]
    },
    Mobile: {
      type: Number,
      required: true
    },
    Address: {
      type: String,
      required: false // Making the Address field optional
    },
    Date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = user;