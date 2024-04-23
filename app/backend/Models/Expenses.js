const mongoose = require("mongoose");

const ExpensesSchema = new mongoose.Schema({
  expenseName: {
    type: String,
    required: true,
  },
  expenses: {
    type: [Number],
  },
},
{ 
  timestamps: true,
});

module.exports = mongoose.model("Expenses", ExpensesSchema);
