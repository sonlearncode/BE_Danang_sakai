// Định nghĩa 2 nhóm khối
const GROUP_NATURAL = 'KHOI_TU_NHIEN';
const GROUP_SOCIAL = 'KHOI_XA_HOI';

// Danh sách môn học phân theo nhóm
const SUBJECT_DATA = [
    // KHỐI TỰ NHIÊN 
    { name: 'Toán học', slug: 'toan-hoc', group: GROUP_NATURAL },
    { name: 'Vật lý', slug: 'vat-ly', group: GROUP_NATURAL },
    { name: 'Hóa học', slug: 'hoa-hoc', group: GROUP_NATURAL },
    { name: 'Sinh học', slug: 'sinh-hoc', group: GROUP_NATURAL },
    { name: 'Tin học', slug: 'tin-hoc', group: GROUP_NATURAL },

    // KHỐI XÃ HỘI 
    { name: 'Ngữ văn', slug: 'ngu-van', group: GROUP_SOCIAL },
    { name: 'Lịch sử', slug: 'lich-su', group: GROUP_SOCIAL },
    { name: 'Địa lý', slug: 'dia-ly', group: GROUP_SOCIAL },
    { name: 'Giáo dục công dân', slug: 'gdcd', group: GROUP_SOCIAL },
    { name: 'Ngoại ngữ', slug: 'ngoai-ngu', group: GROUP_SOCIAL }
];

// Trích xuất danh sách tên để validate Enum
const VALID_SUBJECT_NAMES = SUBJECT_DATA.map(s => s.name);

// HELPER: Danh sách đề thi (Áp dụng cho cả 3 khối 10, 11, 12) 
const COMMON_EXAM_TOPICS = [
    { name: 'Đề thi Giữa Học kỳ 1', description: 'Tổng hợp đề thi, kiểm tra giữa học kỳ 1 các khối lớp.' },
    { name: 'Đề thi Cuối Học kỳ 1', description: 'Tổng hợp đề thi, kiểm tra cuối học kỳ 1 các khối lớp.' },
    { name: 'Đề thi Giữa Học kỳ 2', description: 'Tổng hợp đề thi, kiểm tra giữa học kỳ 2 các khối lớp.' },
    { name: 'Đề thi Cuối Học kỳ 2', description: 'Tổng hợp đề thi, kiểm tra cuối học kỳ 2 các khối lớp.' },
    { name: 'Đề thi Thử Tốt nghiệp THPT', description: 'Dành riêng cho khối 12 ôn thi THPT Quốc gia.' },
    { name: 'Đề thi Học sinh giỏi & Olympic', description: 'Đề thi chọn HSG các cấp và Olympic 30/4.' }
];

const IT_EXAM_TOPICS = [
    { name: 'Đề kiểm tra Học kỳ (Lý thuyết & Thực hành)', description: 'Đề thi định kỳ các khối lớp.' },
    { name: 'Đề thi HSG & Tin học trẻ', description: 'Các bài toán lập trình thi đấu.' }
];

// DỮ LIỆU CHUYÊN ĐỀ CHI TIẾT (MỞ RỘNG CHO 10, 11, 12) 
const TOPIC_DATA = {
    'toan-hoc': [
        // Lớp 10 & 11
        { name: 'Đại số & Bất đẳng thức', description: 'Mệnh đề, tập hợp, bất đẳng thức, bất phương trình (Lớp 10).' },
        { name: 'Vectơ & Hình học phẳng', description: 'Hệ trục tọa độ, tích vô hướng, hệ thức lượng (Lớp 10).' },
        { name: 'Lượng giác & Dãy số', description: 'Công thức lượng giác, cấp số cộng, cấp số nhân, giới hạn (Lớp 11).' },
        { name: 'Tổ hợp - Xác suất', description: 'Quy tắc đếm, nhị thức Newton, xác suất (Lớp 11 & 12).' },
        { name: 'Đạo hàm & Vi phân', description: 'Đạo hàm, tiếp tuyến, ứng dụng đạo hàm (Lớp 11).' },
        // Lớp 12
        { name: 'Hàm số & Đồ thị', description: 'Khảo sát hàm số, cực trị, tiệm cận (Lớp 12).' },
        { name: 'Mũ - Logarit - Tích phân', description: 'Lũy thừa, Logarit, Nguyên hàm, Tích phân (Lớp 12).' },
        { name: 'Hình học không gian & Oxyz', description: 'Quan hệ vuông góc, khối đa diện, nón trụ cầu, tọa độ Oxyz.' },
        { name: 'Số phức', description: 'Số phức và các bài toán liên quan.' },
        ...COMMON_EXAM_TOPICS
    ],
    'vat-ly': [
        // Lớp 10
        { name: 'Cơ học (Động lực học & Tĩnh học)', description: 'Chuyển động, Định luật Newton, Cân bằng lực (Lớp 10).' },
        { name: 'Năng lượng & Động lượng', description: 'Công, công suất, định luật bảo toàn (Lớp 10).' },
        { name: 'Nhiệt học & Khí lý tưởng', description: 'Chất khí, nhiệt động lực học (Lớp 10 & 12 mới).' },
        // Lớp 11
        { name: 'Điện tích & Điện trường', description: 'Định luật Culong, tụ điện, dòng điện không đổi (Lớp 11).' },
        { name: 'Từ trường & Cảm ứng điện từ', description: 'Lực từ, từ thông, cảm ứng điện từ (Lớp 11).' },
        { name: 'Quang hình học', description: 'Khúc xạ, thấu kính, mắt, các dụng cụ quang học (Lớp 11).' },
        // Lớp 12
        { name: 'Dao động & Sóng cơ', description: 'Dao động điều hòa, sóng cơ, giao thoa sóng (Lớp 12).' },
        { name: 'Dòng điện xoay chiều', description: 'Đại cương dòng điện xoay chiều, mạch RLC (Lớp 12).' },
        { name: 'Sóng ánh sáng & Lượng tử', description: 'Giao thoa ánh sáng, quang điện, hạt nhân (Lớp 12).' },
        ...COMMON_EXAM_TOPICS
    ],
    'hoa-hoc': [
        // Lớp 10 & 11
        { name: 'Hóa đại cương & Vô cơ (Lớp 10)', description: 'Cấu tạo nguyên tử, bảng tuần hoàn, liên kết hóa học, phản ứng OXH-Khử.' },
        { name: 'Nhóm Halogen - Oxi - Lưu huỳnh', description: 'Tính chất các đơn chất và hợp chất phi kim (Lớp 10).' },
        { name: 'Sự điện li & Nitơ - Photpho', description: 'Dung dịch, pH, phân bón hóa học (Lớp 11).' },
        { name: 'Đại cương Hóa hữu cơ & Hydrocacbon', description: 'Ankan, Anken, Ankin, Aren (Lớp 11).' },
        { name: 'Dẫn xuất Halogen - Ancol - Phenol', description: 'Hợp chất hữu cơ có nhóm chức (Lớp 11).' },
        // Lớp 12
        { name: 'Este - Lipit - Cacbohidrat', description: 'Chất béo, đường, tinh bột (Lớp 12).' },
        { name: 'Amin - Amino Axit - Protein', description: 'Hợp chất chứa Nitơ, Peptit (Lớp 12).' },
        { name: 'Polime & Vật liệu Polime', description: 'Chất dẻo, tơ, cao su (Lớp 12).' },
        { name: 'Kim loại & Hợp chất', description: 'Đại cương kim loại, kiềm, kiềm thổ, nhôm, sắt.' },
        ...COMMON_EXAM_TOPICS
    ],
    'sinh-hoc': [
        // Lớp 10
        { name: 'Sinh học tế bào (Lớp 10)', description: 'Thành phần hóa học tế bào, cấu trúc tế bào, chuyển hóa vật chất.' },
        { name: 'Vi sinh vật & Virus', description: 'Chuyển hóa ở VSV, sinh trưởng, sinh sản, bệnh truyền nhiễm (Lớp 10).' },
        // Lớp 11
        { name: 'Chuyển hóa vật chất & Năng lượng', description: 'Trao đổi chất ở thực vật và động vật (Lớp 11).' },
        { name: 'Cảm ứng - Sinh trưởng - Sinh sản', description: 'Các quá trình sinh lý ở thực vật và động vật (Lớp 11).' },
        // Lớp 12
        { name: 'Di truyền & Biến dị', description: 'Cơ chế di truyền cấp độ phân tử và tế bào (Lớp 12).' },
        { name: 'Quy luật di truyền', description: 'Quy luật Menđen, liên kết gen, hoán vị gen (Lớp 12).' },
        { name: 'Tiến hóa & Sinh thái học', description: 'Học thuyết tiến hóa, cá thể, quần thể, quần xã (Lớp 12).' },
        ...COMMON_EXAM_TOPICS
    ],
    'ngu-van': [
        { name: 'Văn học Dân gian', description: 'Sử thi, truyền thuyết, cổ tích, ca dao, tục ngữ (Lớp 10).' },
        { name: 'Văn học Trung đại', description: 'Truyện Kiều, thơ Đường luật, văn học Lý - Trần - Lê (Lớp 10 & 11).' },
        { name: 'Thơ Mới & Văn học 1930-1945', description: 'Xuân Diệu, Huy Cận, Hàn Mặc Tử, Nam Cao, Vũ Trọng Phụng (Lớp 11).' },
        { name: 'Văn học Hiện đại (Kháng chiến)', description: 'Tây Tiến, Việt Bắc, Đất Nước, Rừng xà nu (Lớp 12).' },
        { name: 'Kịch & Văn học nước ngoài', description: 'Hồn Trương Ba da hàng thịt, Số phận con người...' },
        { name: 'Lý luận văn học & Làm văn', description: 'Các thao tác lập luận, kỹ năng viết bài nghị luận.' },
        ...COMMON_EXAM_TOPICS
    ],
    'lich-su': [
        { name: 'Lịch sử Thế giới (Cổ - Trung đại)', description: 'Ai Cập, Hy Lạp, La Mã, Tây Âu, Trung Quốc phong kiến (Lớp 10).' },
        { name: 'Lịch sử Việt Nam (Cổ - Trung đại)', description: 'Các triều đại phong kiến Việt Nam, kháng chiến chống ngoại xâm (Lớp 10).' },
        { name: 'Lịch sử Thế giới Cận - Hiện đại', description: 'CMTS, CTTG 1 & 2, Chiến tranh lạnh (Lớp 11 & 12).' },
        { name: 'Lịch sử Việt Nam (1858 - 1945)', description: 'Pháp thuộc, phong trào yêu nước, CMT8 (Lớp 11 & 12).' },
        { name: 'Lịch sử Việt Nam (1945 - Nay)', description: 'Kháng chiến chống Pháp, chống Mỹ, Đổi mới (Lớp 12).' },
        ...COMMON_EXAM_TOPICS
    ],
    'dia-ly': [
        { name: 'Địa lý Đại cương', description: 'Bản đồ, Vũ trụ, Khí quyển, Thủy quyển, Thổ nhưỡng (Lớp 10).' },
        { name: 'Địa lý Kinh tế - Xã hội Thế giới', description: 'Nông nghiệp, Công nghiệp, Dịch vụ, Dân cư thế giới (Lớp 10).' },
        { name: 'Địa lý Khu vực & Quốc gia', description: 'Hoa Kỳ, EU, Trung Quốc, Nhật Bản, ASEAN (Lớp 11).' },
        { name: 'Địa lý Tự nhiên Việt Nam', description: 'Vị trí, địa hình, khí hậu, sông ngòi (Lớp 12).' },
        { name: 'Địa lý Kinh tế Việt Nam', description: 'Các ngành kinh tế và các vùng kinh tế trọng điểm (Lớp 12).' },
        ...COMMON_EXAM_TOPICS
    ],
    'gdcd': [
        { name: 'Triết học & Đạo đức', description: 'Thế giới quan duy vật, các phạm trù đạo đức (Lớp 10).' },
        { name: 'Kinh tế & Chính trị', description: 'Hàng hóa, tiền tệ, thị trường, cung cầu (Lớp 11).' },
        { name: 'Pháp luật & Đời sống', description: 'Hệ thống pháp luật, quyền và nghĩa vụ công dân (Lớp 12).' },
        ...COMMON_EXAM_TOPICS
    ],
    'ngoai-ngu': [
        { name: 'Ngữ pháp (Grammar) - Cơ bản', description: 'Các thì cơ bản, danh từ, tính từ, mạo từ (Lớp 10).' },
        { name: 'Ngữ pháp (Grammar) - Nâng cao', description: 'Mệnh đề quan hệ, câu bị động, câu điều kiện, đảo ngữ (Lớp 11 & 12).' },
        { name: 'Từ vựng (Vocabulary) theo chủ đề', description: 'Tổng hợp từ vựng theo các Unit trong SGK.' },
        { name: 'Kỹ năng (Skills): Nghe - Nói - Đọc - Viết', description: 'Tài liệu luyện kỹ năng toàn diện.' },
        { name: 'Luyện thi Chứng chỉ (IELTS/TOEIC)', description: 'Tài liệu bổ trợ ngoài chương trình SGK.' },
        ...COMMON_EXAM_TOPICS
    ],
    'tin-hoc': [
        { name: 'Tin học văn phòng & Căn bản', description: 'Word, Excel, PowerPoint, Hệ điều hành (Lớp 10).' },
        { name: 'Ngôn ngữ lập trình (Pascal/C++)', description: 'Lập trình cấu trúc, mảng, xâu, tệp (Lớp 11).' },
        { name: 'Lập trình Python & Thuật toán', description: 'Cú pháp Python, các thuật toán cơ bản và nâng cao.' },
        { name: 'Cơ sở dữ liệu & SQL', description: 'Hệ quản trị CSDL Access, SQL (Lớp 12).' },
        ...IT_EXAM_TOPICS
    ]
};

module.exports = {
    GROUP_NATURAL,
    GROUP_SOCIAL,
    SUBJECT_DATA,
    VALID_SUBJECT_NAMES,
    TOPIC_DATA
};