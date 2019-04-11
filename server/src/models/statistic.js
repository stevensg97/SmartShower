import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StatisticSchema = new Schema({
  date: Date,
  liters: Number
});

export default mongoose.model('Statistic', StatisticSchema);
