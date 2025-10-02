import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    text: {
        type: String,
        required: true,
    },
},{ timestamps: true });

const Comment = mongoose.model("Comment", commentsSchema);
export default Comment;