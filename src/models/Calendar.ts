import { Schema } from 'mongoose';

export default new Schema({
  _id: {
    type: String,
    default: () => Math.random().toString(36).substr(2, 5)
  },
  date: {
    type: Number,
    required: 'Enter a date between 0-30'
  },
  month: {
    type: Number,
    required: 'Enter a month between 0-11'
  },
  year: {
    type: String,
    required: 'Enter a year'
  },
  due_date: {
    type: Number,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  }
})