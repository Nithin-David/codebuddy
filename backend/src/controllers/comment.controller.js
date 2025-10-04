import Comment from "../models/comments.model.js";
import CodeSnippet from "../models/codeSnippet.model.js";

export const createComment = async (req, res) => {
  try {
    const { id: snippetId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const userName = req.user.fullname || "Anonymous";

    const comment = await Comment.create({ text, creatorName: userName });

    const snippet = await CodeSnippet.findByIdAndUpdate(
      snippetId,
      {
        $push: {
          comments: {
            $each: [comment._id],
            $position: 0, // ✅ newest first
          },
        },
      },
      { new: true }
    ).populate("comments");

    res.status(201).json({
      message: "Comment created successfully",
      comments: snippet.comments,
    });
  } catch (error) {
    console.error("Error in createComment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



