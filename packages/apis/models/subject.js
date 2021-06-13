const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }
})

module.exports = mongoose.model('Subject', subjectSchema);

