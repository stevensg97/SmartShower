import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: String,
  lastname: String,
  hobbie: String
});

export default mongoose.model("Student", StudentSchema);
