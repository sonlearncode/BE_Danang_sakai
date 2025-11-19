const mongoose = require('mongoose');
require('dotenv').config();

const Subject = require('./src/models/subject.model');
const Topic = require('./src/models/topic.model');
const { SUBJECT_DATA, TOPIC_DATA } = require('./config/constants');
const { ENV } = require('./src/lib/env');

const runSeed = async () => {
    try {
        // Ket noi Database
        await mongoose.connect(ENV.MONGO_URI || process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // 1. Tao Mon hoc (Subjects) neu chua co
        const countSubject = await Subject.countDocuments();
        if (countSubject === 0) {
            console.log('Khoi tao danh sach mon hoc...');
            await Subject.insertMany(SUBJECT_DATA);
            console.log('Da tao xong danh sach mon hoc.');
        } else {
            console.log('Mon hoc da ton tai. Bo qua buoc tao mon hoc.');
        }

        // 2. Cap nhat Chuyen de (Topics)
        console.log('Dang kiem tra va cap nhat chuyen de...');

        const subjects = await Subject.find();
        let newTopicsCount = 0;

        for (const sub of subjects) {
            const topicsData = TOPIC_DATA[sub.slug];

            if (topicsData && topicsData.length > 0) {
                for (const topicItem of topicsData) {
                    // Kiem tra topic da ton tai chua (theo ten va subjectId)
                    const exists = await Topic.findOne({
                        name: topicItem.name,
                        subjectId: sub._id
                    });

                    if (!exists) {
                        await Topic.create({
                            name: topicItem.name,
                            description: topicItem.description,
                            subjectId: sub._id
                        });
                        newTopicsCount++;
                    }
                }
            }
        }

        if (newTopicsCount > 0) {
            console.log(`Da them moi thanh cong ${newTopicsCount} chuyen de.`);
        } else {
            console.log('He thong da day du chuyen de. Khong co du lieu moi.');
        }

        console.log('Seed completed. Exiting...');
        process.exit(0);

    } catch (error) {
        console.error('Loi khi chay Seed Data:', error);
        process.exit(1);
    }
};

runSeed();