const classResolver = require("./classes");
const subjectResolver = require("./subjects");
const schoolResolver = require("./schools");
const studentResolver = require("./students");
const userResolver = require("./users");
const announcementResolver = require("./announcement");
const postsResolver = require("./posts");
const commentsResolver = require("./comments");
const likesResolver = require("./likes");

module.exports = {
  ...classResolver,
  ...subjectResolver,
  ...schoolResolver,
  ...userResolver,
  ...studentResolver,
  ...announcementResolver,
  ...postsResolver,
  ...commentsResolver,
  ...likesResolver,
};

// userID; 60bad5d0baa0b925fe3423bc
