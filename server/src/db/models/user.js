import mongoose from "mongoose";

const schema = new mongoose.Schema({
  //aka gUserId
  userId: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  created: {
    type: Date,
    default: new Date(),
  },
});

schema.set("toObject", {
  virtuals: true,
});

const User = mongoose.model("User", schema);

export default User;
