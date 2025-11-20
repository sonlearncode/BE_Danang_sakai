const mongoose = require('mongoose');
require('dotenv').config();

// Lưu ý: Giữ nguyên đường dẫn model nếu máy bạn đang chạy được dòng này
// Nếu báo lỗi không tìm thấy model, hãy thử đổi thành './src/models/Subject.model' (Viết hoa chữ cái đầu)
const Subject = require('./src/models/subject.model');
const Topic = require('./src/models/topic.model');
const { ENV } = require('./src/lib/env');

// ============================================================
// 1. DATA HELPER & CONFIG
// ============================================================

// Helper tạo slug tiếng Việt
const toSlug = (str) => {
    return str.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};

const createTopic = (name, description) => ({ name, slug: toSlug(name), description });

const GROUP_NATURAL = 'KHOI_TU_NHIEN';
const GROUP_SOCIAL = 'KHOI_XA_HOI';

const SUBJECT_DATA = [
    { name: 'Toán học', slug: 'toan-hoc', group: GROUP_NATURAL },
    { name: 'Vật lý', slug: 'vat-ly', group: GROUP_NATURAL },
    { name: 'Hóa học', slug: 'hoa-hoc', group: GROUP_NATURAL },
    { name: 'Sinh học', slug: 'sinh-hoc', group: GROUP_NATURAL },
    { name: 'Tin học', slug: 'tin-hoc', group: GROUP_NATURAL },
    { name: 'Ngữ văn', slug: 'ngu-van', group: GROUP_SOCIAL },
    { name: 'Lịch sử', slug: 'lich-su', group: GROUP_SOCIAL },
    { name: 'Địa lý', slug: 'dia-ly', group: GROUP_SOCIAL },
    { name: 'Giáo dục công dân', slug: 'gdcd', group: GROUP_SOCIAL },
    { name: 'Ngoại ngữ', slug: 'ngoai-ngu', group: GROUP_SOCIAL }
];

// --- DATA ĐẦY ĐỦ ---
const COMMON_EXAM_TOPICS = [
    createTopic('Đề thi Giữa Học kỳ 1', 'Tổng hợp đề thi, kiểm tra giữa học kỳ 1 các khối lớp.'),
    createTopic('Đề thi Cuối Học kỳ 1', 'Tổng hợp đề thi, kiểm tra cuối học kỳ 1 các khối lớp.'),
    createTopic('Đề thi Giữa Học kỳ 2', 'Tổng hợp đề thi, kiểm tra giữa học kỳ 2 các khối lớp.'),
    createTopic('Đề thi Cuối Học kỳ 2', 'Tổng hợp đề thi, kiểm tra cuối học kỳ 2 các khối lớp.'),
    createTopic('Đề thi Thử Tốt nghiệp THPT', 'Dành riêng cho khối 12 ôn thi THPT Quốc gia.'),
    createTopic('Đề thi Học sinh giỏi & Olympic', 'Đề thi chọn HSG các cấp và Olympic 30/4.')
];

const IT_EXAM_TOPICS = [
    createTopic('Đề kiểm tra Học kỳ (Lý thuyết & Thực hành)', 'Đề thi định kỳ các khối lớp.'),
    createTopic('Đề thi HSG & Tin học trẻ', 'Các bài toán lập trình thi đấu.')
];

const TOPIC_DATA = {
    'toan-hoc': [
        createTopic('Đại số & Bất đẳng thức', 'Mệnh đề, tập hợp, bất đẳng thức, bất phương trình (Lớp 10).'),
        createTopic('Vectơ & Hình học phẳng', 'Hệ trục tọa độ, tích vô hướng, hệ thức lượng (Lớp 10).'),
        createTopic('Lượng giác & Dãy số', 'Công thức lượng giác, cấp số cộng, cấp số nhân, giới hạn (Lớp 11).'),
        createTopic('Tổ hợp - Xác suất', 'Quy tắc đếm, nhị thức Newton, xác suất (Lớp 11 & 12).'),
        createTopic('Đạo hàm & Vi phân', 'Đạo hàm, tiếp tuyến, ứng dụng đạo hàm (Lớp 11).'),
        createTopic('Hàm số & Đồ thị', 'Khảo sát hàm số, cực trị, tiệm cận (Lớp 12).'),
        createTopic('Mũ - Logarit - Tích phân', 'Lũy thừa, Logarit, Nguyên hàm, Tích phân (Lớp 12).'),
        createTopic('Hình học không gian & Oxyz', 'Quan hệ vuông góc, khối đa diện, nón trụ cầu, tọa độ Oxyz.'),
        createTopic('Số phức', 'Số phức và các bài toán liên quan.'),
        ...COMMON_EXAM_TOPICS
    ],
    'vat-ly': [
        createTopic('Cơ học (Động lực học & Tĩnh học)', 'Chuyển động, Định luật Newton, Cân bằng lực (Lớp 10).'),
        createTopic('Năng lượng & Động lượng', 'Công, công suất, định luật bảo toàn (Lớp 10).'),
        createTopic('Nhiệt học & Khí lý tưởng', 'Chất khí, nhiệt động lực học (Lớp 10 & 12 mới).'),
        createTopic('Điện tích & Điện trường', 'Định luật Culong, tụ điện, dòng điện không đổi (Lớp 11).'),
        createTopic('Từ trường & Cảm ứng điện từ', 'Lực từ, từ thông, cảm ứng điện từ (Lớp 11).'),
        createTopic('Quang hình học', 'Khúc xạ, thấu kính, mắt, các dụng cụ quang học (Lớp 11).'),
        createTopic('Dao động & Sóng cơ', 'Dao động điều hòa, sóng cơ, giao thoa sóng (Lớp 12).'),
        createTopic('Dòng điện xoay chiều', 'Đại cương dòng điện xoay chiều, mạch RLC (Lớp 12).'),
        createTopic('Sóng ánh sáng & Lượng tử', 'Giao thoa ánh sáng, quang điện, hạt nhân (Lớp 12).'),
        ...COMMON_EXAM_TOPICS
    ],
    'hoa-hoc': [
        createTopic('Hóa đại cương & Vô cơ (Lớp 10)', 'Cấu tạo nguyên tử, bảng tuần hoàn, liên kết hóa học, phản ứng OXH-Khử.'),
        createTopic('Nhóm Halogen - Oxi - Lưu huỳnh', 'Tính chất các đơn chất và hợp chất phi kim (Lớp 10).'),
        createTopic('Sự điện li & Nitơ - Photpho', 'Dung dịch, pH, phân bón hóa học (Lớp 11).'),
        createTopic('Đại cương Hóa hữu cơ & Hydrocacbon', 'Ankan, Anken, Ankin, Aren (Lớp 11).'),
        createTopic('Dẫn xuất Halogen - Ancol - Phenol', 'Hợp chất hữu cơ có nhóm chức (Lớp 11).'),
        createTopic('Este - Lipit - Cacbohidrat', 'Chất béo, đường, tinh bột (Lớp 12).'),
        createTopic('Amin - Amino Axit - Protein', 'Hợp chất chứa Nitơ, Peptit (Lớp 12).'),
        createTopic('Polime & Vật liệu Polime', 'Chất dẻo, tơ, cao su (Lớp 12).'),
        createTopic('Kim loại & Hợp chất', 'Đại cương kim loại, kiềm, kiềm thổ, nhôm, sắt.'),
        ...COMMON_EXAM_TOPICS
    ],
    'sinh-hoc': [
        createTopic('Sinh học tế bào (Lớp 10)', 'Thành phần hóa học tế bào, cấu trúc tế bào, chuyển hóa vật chất.'),
        createTopic('Vi sinh vật & Virus', 'Chuyển hóa ở VSV, sinh trưởng, sinh sản, bệnh truyền nhiễm (Lớp 10).'),
        createTopic('Chuyển hóa vật chất & Năng lượng', 'Trao đổi chất ở thực vật và động vật (Lớp 11).'),
        createTopic('Cảm ứng - Sinh trưởng - Sinh sản', 'Các quá trình sinh lý ở thực vật và động vật (Lớp 11).'),
        createTopic('Di truyền & Biến dị', 'Cơ chế di truyền cấp độ phân tử và tế bào (Lớp 12).'),
        createTopic('Quy luật di truyền', 'Quy luật Menđen, liên kết gen, hoán vị gen (Lớp 12).'),
        createTopic('Tiến hóa & Sinh thái học', 'Học thuyết tiến hóa, cá thể, quần thể, quần xã (Lớp 12).'),
        ...COMMON_EXAM_TOPICS
    ],
    'ngu-van': [
        createTopic('Văn học Dân gian', 'Sử thi, truyền thuyết, cổ tích, ca dao, tục ngữ (Lớp 10).'),
        createTopic('Văn học Trung đại', 'Truyện Kiều, thơ Đường luật, văn học Lý - Trần - Lê (Lớp 10 & 11).'),
        createTopic('Thơ Mới & Văn học 1930-1945', 'Xuân Diệu, Huy Cận, Hàn Mặc Tử, Nam Cao, Vũ Trọng Phụng (Lớp 11).'),
        createTopic('Văn học Hiện đại (Kháng chiến)', 'Tây Tiến, Việt Bắc, Đất Nước, Rừng xà nu (Lớp 12).'),
        createTopic('Kịch & Văn học nước ngoài', 'Hồn Trương Ba da hàng thịt, Số phận con người...'),
        createTopic('Lý luận văn học & Làm văn', 'Các thao tác lập luận, kỹ năng viết bài nghị luận.'),
        ...COMMON_EXAM_TOPICS
    ],
    'lich-su': [
        createTopic('Lịch sử Thế giới (Cổ - Trung đại)', 'Ai Cập, Hy Lạp, La Mã, Tây Âu, Trung Quốc phong kiến (Lớp 10).'),
        createTopic('Lịch sử Việt Nam (Cổ - Trung đại)', 'Các triều đại phong kiến Việt Nam, kháng chiến chống ngoại xâm (Lớp 10).'),
        createTopic('Lịch sử Thế giới Cận - Hiện đại', 'CMTS, CTTG 1 & 2, Chiến tranh lạnh (Lớp 11 & 12).'),
        createTopic('Lịch sử Việt Nam (1858 - 1945)', 'Pháp thuộc, phong trào yêu nước, CMT8 (Lớp 11 & 12).'),
        createTopic('Lịch sử Việt Nam (1945 - Nay)', 'Kháng chiến chống Pháp, chống Mỹ, Đổi mới (Lớp 12).'),
        ...COMMON_EXAM_TOPICS
    ],
    'dia-ly': [
        createTopic('Địa lý Đại cương', 'Bản đồ, Vũ trụ, Khí quyển, Thủy quyển, Thổ nhưỡng (Lớp 10).'),
        createTopic('Địa lý Kinh tế - Xã hội Thế giới', 'Nông nghiệp, Công nghiệp, Dịch vụ, Dân cư thế giới (Lớp 10).'),
        createTopic('Địa lý Khu vực & Quốc gia', 'Hoa Kỳ, EU, Trung Quốc, Nhật Bản, ASEAN (Lớp 11).'),
        createTopic('Địa lý Tự nhiên Việt Nam', 'Vị trí, địa hình, khí hậu, sông ngòi (Lớp 12).'),
        createTopic('Địa lý Kinh tế Việt Nam', 'Các ngành kinh tế và các vùng kinh tế trọng điểm (Lớp 12).'),
        ...COMMON_EXAM_TOPICS
    ],
    'gdcd': [
        createTopic('Triết học & Đạo đức', 'Thế giới quan duy vật, các phạm trù đạo đức (Lớp 10).'),
        createTopic('Kinh tế & Chính trị', 'Hàng hóa, tiền tệ, thị trường, cung cầu (Lớp 11).'),
        createTopic('Pháp luật & Đời sống', 'Hệ thống pháp luật, quyền và nghĩa vụ công dân (Lớp 12).'),
        ...COMMON_EXAM_TOPICS
    ],
    'ngoai-ngu': [
        createTopic('Ngữ pháp (Grammar) - Cơ bản', 'Các thì cơ bản, danh từ, tính từ, mạo từ (Lớp 10).'),
        createTopic('Ngữ pháp (Grammar) - Nâng cao', 'Mệnh đề quan hệ, câu bị động, câu điều kiện, đảo ngữ (Lớp 11 & 12).'),
        createTopic('Từ vựng (Vocabulary) theo chủ đề', 'Tổng hợp từ vựng theo các Unit trong SGK.'),
        createTopic('Kỹ năng (Skills): Nghe - Nói - Đọc - Viết', 'Tài liệu luyện kỹ năng toàn diện.'),
        createTopic('Luyện thi Chứng chỉ (IELTS/TOEIC)', 'Tài liệu bổ trợ ngoài chương trình SGK.'),
        ...COMMON_EXAM_TOPICS
    ],
    'tin-hoc': [
        createTopic('Tin học văn phòng & Căn bản', 'Word, Excel, PowerPoint, Hệ điều hành (Lớp 10).'),
        createTopic('Ngôn ngữ lập trình (Pascal/C++)', 'Lập trình cấu trúc, mảng, xâu, tệp (Lớp 11).'),
        createTopic('Lập trình Python & Thuật toán', 'Cú pháp Python, các thuật toán cơ bản và nâng cao.'),
        createTopic('Cơ sở dữ liệu & SQL', 'Hệ quản trị CSDL Access, SQL (Lớp 12).'),
        ...IT_EXAM_TOPICS
    ]
};

// ============================================================
// 2. LOGIC CHẠY SEED (SMART UPDATE)
// ============================================================

const runSeed = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI || process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // 1. Môn học
        const countSubject = await Subject.countDocuments();
        if (countSubject === 0) {
            console.log('⚡ Khoi tao danh sach mon hoc...');
            await Subject.insertMany(SUBJECT_DATA);
            console.log('✅ Da tao xong danh sach mon hoc.');
        } else {
            console.log('ℹ️ Mon hoc da ton tai.');
        }

        // 2. Chuyên đề (Topics)
        console.log('⚡ Dang kiem tra va cap nhat day du chuyen de...');

        const subjects = await Subject.find();
        let newTopicsCount = 0;
        let updatedTopicsCount = 0;

        for (const sub of subjects) {
            const topicsData = TOPIC_DATA[sub.slug];

            if (topicsData && topicsData.length > 0) {
                // console.log(`   🔍 Đang quét môn: ${sub.name}...`);

                for (const topicItem of topicsData) {
                    // Tìm topic (theo tên + subjectId)
                    const exists = await Topic.findOne({
                        name: topicItem.name,
                        subjectId: sub._id
                    });

                    if (!exists) {
                        // Tạo mới nếu chưa có
                        await Topic.create({
                            name: topicItem.name,
                            slug: topicItem.slug,
                            description: topicItem.description,
                            subjectId: sub._id
                        });
                        newTopicsCount++;
                    } else {
                        // Nếu đã có nhưng chưa có slug, thì update
                        if (!exists.slug) {
                            exists.slug = topicItem.slug;
                            await exists.save();
                            updatedTopicsCount++;
                        }
                    }
                }
            }
        }

        if (newTopicsCount > 0) {
            console.log(`✅ Đã thêm mới ${newTopicsCount} chuyên đề còn thiếu.`);
        }
        if (updatedTopicsCount > 0) {
            console.log(`✅ Đã cập nhật slug cho ${updatedTopicsCount} chuyên đề cũ.`);
        }
        if (newTopicsCount === 0 && updatedTopicsCount === 0) {
            console.log('✅ Dữ liệu đã đầy đủ và đồng bộ.');
        }

        console.log('👋 Seed completed. Exiting...');
        process.exit(0);

    } catch (error) {
        console.error('❌ Loi khi chay Seed Data:', error);
        process.exit(1);
    }
};

runSeed();