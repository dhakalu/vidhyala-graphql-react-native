const Subject = require("../../models/subject");
const Class = require("../../models/class");

const transformSubject = (subject) => ({ ...subject._doc, id: subject.id });

module.exports = {
  subjects: async () => {
    try {
      const subjects = await Subject.find();
      return subjects.map(transformSubject);
    } catch (error) {
      throw error;
    }
  },
  createSubject: async ({ subjectInput }) => {
    try {
      const { title, description, classId } = subjectInput;
      const classToWhichSubjectBelongs = await Class.findById(classId);
      if (!classToWhichSubjectBelongs) {
        throw Error("Class does not exist");
      }
      const existingSubject = await Subject.findOne({
        class: classId,
        title,
      });
      if (existingSubject) {
        throw new Error("Subject already exists");
      }
      const newSubject = new Subject({
        title,
        description,
        class: classId,
      });
      const saveSubjectResponse = await newSubject.save();
      const createdSubject = transformSubject(saveSubjectResponse);
      classToWhichSubjectBelongs.subjects.push(newSubject);
      await classToWhichSubjectBelongs.save();
      return createdSubject;
    } catch (error) {
      throw error;
    }
  },
};
