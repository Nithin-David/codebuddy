import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      default: null,
    },
    googleId: { type: String },
    githubId: { type: String },
    snippets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodeSnippet",
      },
    ],
    savedSnippets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodeSnippet",
      },
    ],
  },
  { timestamps: true }
);

// Optional: Custom validation (at least password OR googleId must exist)
userSchema.pre("validate", function (next) {
  if (!this.password && !this.googleId && !this.githubId) {
    next(new Error("User must have either password or Google ID or GitHub ID"));
  } else {
    next();
  }
});

//hash password before saving to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});

//compare password
userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
