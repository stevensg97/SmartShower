import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StatisticSchema = new Schema({
  date: String,
  liters: Number,
});

export default mongoose.model("Statistic", StatisticSchema);
