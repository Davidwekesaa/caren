const mongoose = require("mongoose");

let Category;
if (mongoose.models.Category) {
  Category = mongoose.model("Category");
} else {
  const CategorySchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      imgSrc: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  Category = mongoose.model("Category", CategorySchema);
}

export default Category;
