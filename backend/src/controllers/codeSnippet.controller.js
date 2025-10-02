

export const createCodeSnippet = async (req, res) => {
    try {
        console.log(req.user)
    } catch (error) {
        console.log("error in createCodeSnippet", error)
        res.status(500).json({ message: "Internal server error" })
    }
}