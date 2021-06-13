const Announcement = require("../../models/announcements");
const { transformAnnouncement } = require("../../mappings");

module.exports = {
  announcements: async ({ subject }) => {
    try {
      const announcements = await Announcement.find({
        subject,
      }).sort({
        createdAt: "desc",
      });
      return announcements.map(transformAnnouncement);
    } catch (error) {
      throw error;
    }
  },
  createAnnouncement: async ({ announcementInput }) => {
    try {
      const { subject, title, description } = announcementInput;
      console.log(subject);
      const newAnnouncement = new Announcement({
        subject,
        title,
        description,
      });
      const createdAnnouncement = await newAnnouncement.save();
      return transformAnnouncement(createdAnnouncement);
    } catch (error) {
      throw error;
    }
  },
};
