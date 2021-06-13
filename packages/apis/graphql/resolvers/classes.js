const Class = require("../../models/class");
const School = require("../../models/school");

const transformClass = (cls) => ({ ...cls._doc, id: cls.id });

module.exports = {
  classes: async () => {
    try {
      const classes = await Class.find().populate("subjects");
      return classes.map(transformClass);
    } catch (error) {
      throw error;
    }
  },
  createClass: async ({ classInput }) => {
    try {
      const { name, school } = classInput;
      const schoolToWhichClassBelongs = await School.findById(school);
      if (!schoolToWhichClassBelongs) {
        throw new Error("School does not exist");
      }
      const existingClass = await Class.findOne({
        name,
        school,
      });
      if (existingClass) {
        throw Error("Class already exists!");
      }
      const newClass = new Class({
        name,
        school,
      });
      const createClassResponse = await newClass.save();
      schoolToWhichClassBelongs.classes.push(newClass);
      await schoolToWhichClassBelongs.save();
      return transformClass(createClassResponse);
    } catch (error) {
      throw error;
    }
  },
};
