const Post = require("../../models/posts");
const Like = require("../../models/like");

const transformLike = (like) => ({ ...like._doc, id: like.id });

module.exports = {
  likes: () => [],
  createLike: async ({ likeInput }) => {
    const { likedBy, likedObject } = likeInput;

    const likedPost = await Post.findById(likedObject);

    if (!likedPost) {
      throw new Error("Post does not exist anymore!");
    }

    const newLike = new Like({
      likedBy,
      likedPost,
    });

    const savedLike = await newLike.save();
    likedPost.likes.push(newLike);
    await likedPost.save();
    return transformLike(savedLike);
  },
};
