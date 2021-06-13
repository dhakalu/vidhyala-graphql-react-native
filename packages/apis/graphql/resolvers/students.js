const Student = require("../../models/student");
const Subject = require("../../models/subject");
const { transformStudent, transformSubject } = require("../../mappings");

module.exports = {
  students: async () => {
    try {
      const students = await Student.find();
      return students.map(transformStudent);
    } catch (error) {
      throw error;
    }
  },
  createStudent: async ({ studentInput }) => {
    try {
      const { userId, schoolId, classId } = studentInput;
      const existingStudent = await Student.findOne({
        user: userId,
        class: classId,
        school: schoolId,
      });
      if (existingStudent) {
        throw new Error("Student is already enrolled in this class.");
      }
      const newStudent = new Student({
        user: userId,
        class: classId,
        school: schoolId,
      });
      const createdStudent = await newStudent.save();
      const studentObject = await Student.findById(createdStudent.id).populate(
        "class"
      );
      return transformStudent(studentObject);
    } catch (error) {
      throw error;
    }
  },
};
