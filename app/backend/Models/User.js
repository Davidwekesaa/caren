const mongoose = require("mongoose");
let User;
if (mongoose.models.User) {
  User = mongoose.model("User");
} else {
  const userSchema = new mongoose.Schema(
    {
      userName: {
        type: String,
        required: true,
      },

      userEmail: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      profile: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      userRights: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

  User = mongoose.model("User", userSchema);
}

export default User;
