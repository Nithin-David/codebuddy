import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    creatorName: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
},{ timestamps: true });

const Comment = mongoose.model("Comment", commentsSchema);
export default Comment;