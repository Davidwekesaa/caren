const mongoose = require("mongoose");
let Expenses;
if (mongoose.models.Expenses) {
  Expenses = mongoose.model("Expenses");
} else {
  const ExpensesSchema = new mongoose.Schema(
    {
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
    }
  );

  Expenses = mongoose.model("Expenses", ExpensesSchema);
}

export default Expenses;
