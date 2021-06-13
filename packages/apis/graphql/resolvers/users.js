const User = require("../../models/user");

const transformUser = (user) => ({ ...user._doc, id: user.id });

module.exports = {
  users: async () => {
    try {
      const users = await User.find();
      return users.map(transformUser);
    } catch (error) {
      throw error;
    }
  },
  createUpdateUser: async ({ userInput }) => {
    try {
      const { username, email, name } = userInput;
      const existingUser = await User.findOne({
        username,
      });
      if (existingUser) {
        existingUser.name = name;
        await existingUser.save();
        return transformUser(existingUser);
      }
      const newUser = new User({
        username,
        email,
        name,
      });
      const createdUser = await newUser.save();
      return transformUser(createdUser);
    } catch (error) {
      throw error;
    }
  },
};
