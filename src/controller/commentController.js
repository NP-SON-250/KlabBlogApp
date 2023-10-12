import blogmode from "../modules/blogmodules";


exports.addComment = async (req, res) => {
    const { blogId, user, comment } = req.body;
  
    try {
      const updatedBlog = await blogmode.findByIdAndUpdate(
        blogId,
        { $push: { blogComment: { user, comment } } },
        { new: true }
      );
  
      res.status(200).json({
        message: "Comment added successfully",
        data: updatedBlog,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to add comment",
        error: error.message,
      });
    }
  };