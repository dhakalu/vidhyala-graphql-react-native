const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }]
});

module.exports = mongoose.model('Class', classSchema);