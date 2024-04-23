import mongoose from "mongoose";

let BlogsModel;

if (mongoose.models.Blogs) {
  BlogsModel = mongoose.model("Blogs");
} else {
  const BlogSchema = new mongoose.Schema(
    {
      blogImage: {
        type: String,
      },
      blogHeading: {
        type: String,
      },
      blogBody: {
        type: String,
      },
      blogOwner: {
        type: String,
      },
      blogComments: {
        type: [],
      },
      blogDate: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

  BlogsModel = mongoose.model("Blogs", BlogSchema);
}

export default BlogsModel;
