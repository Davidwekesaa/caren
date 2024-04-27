const mongoose = require("mongoose");
let Payments;
if (mongoose.models.Payments) {
  Payments = mongoose.model("Payments");
} else {
  const PaymentsSchema = new mongoose.Schema(
    {
      Phone: {
        type: String,
        required: true,
      },
      Amount: {
        type: String,
        required: true,
      },
      TransactionId: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  Payments = mongoose.model("Payments", PaymentsSchema);
}
export default Payments;
