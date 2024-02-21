import mongoose from "mongoose";

const schema = new mongoose.Schema({
  contents: {
    type: String,
    required: true,
  },
});

schema.set("toObject", {
  virtuals: true,
});

const Email = mongoose.model("Email", schema);

export default Email;
