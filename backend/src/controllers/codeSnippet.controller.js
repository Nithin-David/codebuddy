import User from "../models/user.model.js"
import CodeSnippet from "../models/codeSnippet.model.js"


export const createCodeSnippet = async (req, res) => {
    try {
        const {title, code, link} = req.body;
        
        if(!title) return res.status(400).json({message: "Title is required"});
        if(!code && !link) return res.status(400).json({message: "Either code or link is required"});

        const user = await User.findById(req.user._id);

        const newSnippet = await CodeSnippet.create({
            title,
            code,
            link,
            createdBy: user._id,
        });

        if(!newSnippet) return res.status(500).json({message: "Failed to create code snippet"});

        user.snippets.push(newSnippet._id);
        await user.save();

        res.status(201).json({message: "Snippet created successfully", snippet: newSnippet});

    } catch (error) {
        console.log("error in createCodeSnippet", error)
        res.status(500).json({ message: "Internal server error" })
    }
};

// Get all code snippets for a user
export const getCodeSnippets = async (req, res) => {
    try {
        const snippets = await User.findById(req.user._id).populate('snippets');
        if(!snippets) return res.status(404).json({message: "No snippets found"});

        res.status(200).json({snippets});
    } catch (error) {
        console.log("error in getCodeSnippets", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// update a code snippet
export const updateCodeSnippet = async (req, res) => {
    try {
        const {id: snippetId} = req.params;
        const {title, code, link} = req.body;

        if(!title) return res.status(400).json({message: "Title is required"});
        if(!code && !link) return res.status(400).json({message: "Either code or link is required"});

        const updatedSnippet = await CodeSnippet.findByIdAndUpdate(snippetId, {
            title,
            code,
            link,
        }, {new: true});

        return res.status(200).json({message: "Snippet updated successfully", snippet: updatedSnippet});
    } catch (error) {
        console.log("error in updateCodeSnippet", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// delete a code snippet
export const deleteCodeSnippet = async (req, res) => {
    try {
        const {id: snippetId} = req.params;

        await CodeSnippet.findByIdAndDelete(snippetId);

        const snippets = await User.findById(req.user._id).populate('snippets');
        if(!snippets) return res.status(404).json({message: "No snippets found"});

        res.status(200).json({message: "Snippet deleted successfully", snippets});
       
    } catch (error) {
        console.log("error in deleteCodeSnippet", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// toggle saved snippets
export const toggleSavedSnippet = async (req, res) => {
    try {
        const {id: snippetId} = req.params;

        const user = await User.findById(req.user._id);
        if(!user) return res.status(404).json({message: "User not found"});

        let updatedUser;

        if(user.savedSnippets.includes(snippetId)){
            updatedUser = await User.findByIdAndUpdate(user._id, {
                $pull: {savedSnippets: snippetId}
            },{new: true});

            return res.status(200).json({message: "Snippet removed from saved", user: updatedUser});
        }else{
            updatedUser = await User.findOneAndUpdate(user._id, {
                $addToSet: {savedSnippets: snippetId}
            },{new: true});

            return res.status(200).json({message: "Snippet added to saved", user: updatedUser});
        }
    } catch (error) {
       console.log("error in toggleSavedSnippet", error);
       res.status(500).json({ message: "Internal server error" }); 
    }
};

// change a code snippet to public
export const changeToPublicCode = async (req, res) => {
    try {
        const {id: snippetId} = req.params;

        const snippet = await CodeSnippet.findById(snippetId);
        if(!snippet) return res.status(404).json({message: "Snippet not found"});

        snippet.isPublic = true;
        await snippet.save();

        res.status(200).json({message: "Snippet is now public"});
    } catch (error) {
        console.log("error in changeToPublicCode", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//get all public codes
export const getAllPublicSnippets = async (req, res) => {
    try {
        const publicSnippets = await CodeSnippet.find({isPublic: true});
        res.status(200).json({publicSnippets});
    } catch (error) {
        console.log("error in getAllPublicSnippets", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
