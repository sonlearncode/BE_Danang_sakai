const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: { type: String, default: '' },

    // ref: topic thuộc về 1 Subject
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Topic', topicSchema);