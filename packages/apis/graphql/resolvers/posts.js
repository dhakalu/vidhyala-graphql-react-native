const Post = require("../../models/posts");
const { transformPost } = require("../../mappings");

module.exports = {
  posts: async ({ subject }) => {
    let query;
    if (subject) {
      query = {
        subject,
      };
    }
    const posts = await Post.find(query);
    return posts.map(transformPost);
  },
  createPost: async ({ postInput }) => {
    const newPost = new Post({
      ...postInput,
    });
    const savedPost = await newPost.save();
    return transformPost(savedPost);
  },
};
