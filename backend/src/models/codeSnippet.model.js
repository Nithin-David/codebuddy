import mongoose from "mongoose";

const codeSnippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
    },
    link: {
        type: String,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    publicSnippet: {
        type: Boolean,
        default: false,
    }
},{ timestamps: true });

const CodeSnippet = mongoose.model("CodeSnippet", codeSnippetSchema);
export default CodeSnippet;