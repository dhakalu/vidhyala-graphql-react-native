const Subject = require("../models/subject");
const Class = require("../models/class");
const Comment = require("../models/comments");
const User = require("../models/user");

const findSubjectsByIds = async (subjectIds) => {
  const subjects = await Subject.find({
    _id: {
      $in: subjectIds,
    },
  });
  return subjects.map(transformSubject);
};

const findCommentsByIds = async (commentIds) => {
  const comments = await Comment.find({
    _id: {
      $in: commentIds,
    },
  });
  return comments.map(transformComment);
};

const findUserById = async (userId) => {
  const user = await User.findById(userId);
  return transformUser(user);
};

const findClassById = async (classId) => {
  try {
    const classById = await Class.findById(classId);
    return transformClass(classById);
  } catch (error) {
    throw error;
  }
};

const transformComment = (comment) => ({
  ...comment._doc,
  id: comment.id,
  creator: findUserById.bind(this, comment._doc.creator),
});

const transformClass = (cls) => ({
  ...cls._doc,
  id: cls.id,
  subjects: findSubjectsByIds.bind(this, cls._doc.subjects),
});

const transformPost = (post) => ({
  ...post._doc,
  id: post.id,
  creator: findUserById.bind(this, post._doc.creator),
  comments: findCommentsByIds.bind(this, post._doc.comments),
  likes: post._doc.likes.length,
});

const transformSchool = (school) => ({ ...school._doc, id: school.id });
const transformSubject = (subject) => ({ ...subject._doc, id: subject.id });
const transformUser = (user) => ({ ...user._doc, id: user.id });
const transformAnnouncement = (announcement) => ({
  ...announcement._doc,
  subject: announcement._doc.subject.toString(),
  id: announcement.id,
});

const transformStudent = (student) => {
  return {
    ...student._doc,
    id: student.id,
    class: findClassById.bind(this, student._doc.class.toString()),
  };
};

module.exports = {
  transformClass,
  transformSchool,
  transformSubject,
  transformStudent,
  transformUser,
  transformAnnouncement,
  transformPost,
  transformComment,
};
