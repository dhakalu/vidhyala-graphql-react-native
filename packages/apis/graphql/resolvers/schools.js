const School = require("../../models/school");

const transformSchool = (school) => ({ ...school._doc, id: school.id });

module.exports = {
  schools: async () => {
    try {
      const schools = await School.find();
      return schools.map(transformSchool);
    } catch (error) {
      throw error;
    }
  },
  createSchool: async ({ schoolInput }) => {
    const { name, address } = schoolInput;
    try {
      const existingSchool = await School.findOne({ name });
      if (existingSchool) {
        throw new Error("School already exists");
      }
      const newSchool = new School({
        name,
        address,
      });
      const createdSchool = await newSchool.save();
      return transformSchool(createdSchool);
    } catch (error) {
      throw error;
    }
  },
};
