import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String
});

export default mongoose.model("User", UserSchema);
