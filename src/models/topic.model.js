const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: { type: String, default: '' },

    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
}, { timestamps: true });

// Index kép: Đảm bảo trong 1 môn học không có 2 chuyên đề trùng slug
topicSchema.index({ subjectId: 1, slug: 1 }, { unique: true });

module.exports = mongoose.model('Topic', topicSchema);