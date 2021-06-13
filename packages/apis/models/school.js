const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    }],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    staff: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
});

module.exports = mongoose.model('School', schoolSchema);