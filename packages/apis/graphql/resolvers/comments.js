const Comment = require("../../models/comments");
const Post = require("../../models/posts");

const transformComment = (post) => ({
  ...post._doc,
  id: post.id,
  commentIds: post._doc.commentIds || [],
});

module.exports = {
  comments: async ({ post }) => {
    const posts = await Comment.find({
      post,
    }).populate("creator");
    return posts.map(transformComment);
  },
  createComment: async ({ commentInput }) => {
    const post = await Post.findById(commentInput.post);
    if (!post) {
      throw new Error("Post does not exist anymore!");
    }
    const newComment = new Comment({
      ...commentInput,
    });
    const savedComment = await newComment.save();
    post.comments.push(newComment);
    await post.save();
    return transformComment(savedComment);
  },
};
