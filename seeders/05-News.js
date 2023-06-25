"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const DEFAULT_YOUTUBE_URL = "https://www.youtube.com/embed/racj3osHouc";
        const news = [
            {
                title: "Việt Nam và Úc hướng tới việc nâng cấp quan hệ",
                content: `<h2>Hướng tới việc nâng cấp quan hệ lên tầm mức mới</h2>
                <p>Tổng Bí thư Nguyễn Phú Trọng nhấn mạnh VN và Úc là hai nước có nhiều sự tương đồng, quan hệ đã trải qua nhiều thời kỳ phát triển trong 50 năm qua, được mở rộng và đi vào chiều sâu trong nhiều lĩnh vực.</p>
                <p>Tổng Bí thư bày tỏ sự nhất trí về những phương hướng phát triển quan hệ, trong đó có việc đưa quan hệ hai nước lên tầm cao mới, hợp tác tốt hơn nữa và nâng cao hiệu quả việc thực hiện các thỏa thuận vì lợi ích của hai nước.</p>
                <p>Thủ tướng Albanese bày tỏ niềm tin về triển vọng phát triển của quan hệ và mong muốn đưa quan hệ hai nước lên đối tác chiến lược toàn diện.</p>
                <p>Cùng ngày, Chủ tịch nước Võ Văn Thưởng đã tiếp Thủ tướng Albanese. Chủ tịch nước đề nghị Úc tạo điều kiện thuận lợi cho cộng đồng người Việt tại Úc duy trì tiếng Việt, truyền thống, văn hóa Việt và các học sinh, sinh viên VN tiếp cận thủ tục visa và du học thuận lợi và mở thêm phân hiệu các trường đại học lớn tại VN.</p>
                <h2>Úc hỗ trợ VN 105 triệu AUD chuyển đổi năng lượng</h2>
                <p>Trước đó, sáng cùng ngày, Thủ tướng Phạm Minh Chính đã chủ trì lễ đón và hội đàm với Thủ tướng Úc Anthony Albanese. Thủ tướng Phạm Minh Chính nhấn mạnh VN bày tỏ sự cảm ơn khi Úc luôn đồng hành, ủng hộ VN trong công cuộc xây dựng và phát triển đất nước.</p>
                <p>Thủ tướng Albanese nhấn mạnh Úc coi trọng mối quan hệ Đối tác chiến lược với VN và xác định VN là trung tâm trong quá trình xây dựng chiến lược quan hệ của Úc đối với khu vực Đông Nam Á.</p>
                <p>Hai bên nhất trí triển khai hiệu quả Kế hoạch thực hiện Chiến lược tăng cường Hợp tác kinh tế (EEES) giữa hai nước giai đoạn 2021 - 2025; tăng cường kết nối giữa hai nền kinh tế; đẩy mạnh hợp tác trên nhiều lĩnh vực. Trên tinh thần đó, hai bên nhất trí thúc đẩy nâng cấp quan hệ lên tầm mức mới trong tương lai.</p>
                <p>Thủ tướng Phạm Minh Chính khẳng định sẽ tạo điều kiện thuận lợi cho các doanh nghiệp Úc đầu tư vào VN, đề nghị Úc tạo điều kiện cho doanh nghiệp VN đầu tư tại Úc và tạo điều kiện mở rộng thị trường cho hàng hóa xuất khẩu của VN. Đồng thời, đánh giá cao việc Úc tăng thêm 2,5% ODA cho VN trong năm tài khóa 2023 - 2024 và đề nghị xem hợp tác ODA là thành tố quan trọng trong quan hệ đối tác trong tương lai.</p>
                <p>Thủ tướng Anthony Albanese công bố khoản hỗ trợ 105 triệu đô la Úc (AUD) cho VN dành cho hợp tác về cơ sở hạ tầng, ứng phó biến đổi khí hậu và chuyển đổi năng lượng. Thủ tướng Phạm Minh Chính nhấn mạnh ủng hộ Úc tổ chức hội nghị cấp cao kỷ niệm 50 năm quan hệ Đối tác ASEAN - Úc tại nước này và Thủ tướng Úc cũng ủng hộ VN đăng cai tổ chức năm APEC 2027.</p>
                <p>Cùng ngày, trong cuộc gặp với Thủ tướng Úc, Chủ tịch Quốc hội Vương Đình Huệ cho biết Quốc hội VN cũng đang xem xét sửa đổi các luật về xuất cảnh, nhập cảnh, quá cảnh, cư trú của người nước ngoài tại VN, tạo thuận lợi về visa nhằm góp phần thúc đẩy hợp tác về thương mại, đầu tư và du lịch.</p>`,
                abstract: "Chiều 4.6, Tổng Bí thư Nguyễn Phú Trọng đã tiếp Thủ tướng Úc Anthony Albanese nhân chuyến thăm chính thức của Thủ tướng Úc tại VN từ 3 - 4.6.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-1-tiny.jpg?alt=media&token=769c854f-608f-467d-a331-87c0c920cadf",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/large-images%2Fnews-1.jpg?alt=media&token=15ebe3de-cedd-44dc-9405-e8ae342b0841",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 1,
                categoryId: 1,
            },
            {
                title: "Nữ đại biểu Quốc hội phải là những 'bông hồng thép'",
                content: `<p>Chiều 5.6, tại trụ sở T.Ư Đảng, Tổng Bí thư Nguyễn Phú Trọng đã gặp mặt thân mật Nhóm nữ đại biểu Quốc hội (QH) VN khóa XV.</p>
                <p>Tại cuộc gặp mặt, Tổng Bí thư Nguyễn Phú Trọng nêu rõ sự nghiệp đổi mới, công nghiệp hóa, hiện đại hóa, xây dựng và bảo vệ đất nước trong giai đoạn mới đang đặt ra yêu cầu rất cao đối với toàn Đảng, toàn dân, toàn hệ thống chính trị; trong đó có vai trò và trách nhiệm lớn lao của QH cũng như các đại biểu QH, trong đó có các đại biểu nữ.
                <p>Tổng Bí thư lưu ý các nữ đại biểu QH cần tiếp tục phát huy truyền thống anh hùng, vẻ vang của phụ nữ Việt Nam, hết lòng, hết sức vì lợi ích của quốc gia, dân tộc, vì cuộc sống hạnh phúc nhân dân; làm tốt hơn nữa vai trò là người đại biểu của nhân dân; phát huy tinh thần trách nhiệm cao trong việc xây dựng, hoàn thiện hệ thống pháp luật (trong đó có luật pháp, chính sách về bình đẳng giới), giám sát tối cao và quyết định các vấn đề quan trọng của đất nước trong hoạt động của QH.</p>
                <p>Tổng Bí thư căn dặn, mỗi nữ đại biểu QH cần không ngừng học tập, rèn luyện, nâng cao phẩm chất đạo đức và trình độ, năng lực chuyên môn, nghiệp vụ; phát huy được thế mạnh của phụ nữ, tạo sự thuyết phục cao trong ý kiến tham gia cũng như trong các hoạt động của QH. Đồng thời, phát huy bản lĩnh và trí tuệ, thực sự là những "bông hồng thép", những tấm gương sáng về sự đoàn kết, phấn đấu, tiến bộ, phát triển và lan tỏa, truyền cảm hứng cho phụ nữ cả nước, nhất là thế hệ trẻ.</p>
                <p>Tổng Bí thư yêu cầu Nhóm nữ đại biểu QH Việt Nam tiếp tục đổi mới về nội dung, đa dạng hóa phương thức hoạt động, nâng cao chất lượng, chia sẻ kinh nghiệm, trao đổi thông tin, kiến thức, kỹ năng trong các hoạt động của QH, tạo sự đồng thuận của QH trong tham gia xây dựng chính sách, pháp luật.</p>
                <p>Tổng Bí thư khẳng định Đảng và Nhà nước đã và đang tạo mọi điều kiện để các nữ đại biểu QH phát huy vai trò là người đại diện của nhân dân; bảo đảm các nguồn lực để pháp luật về bình đẳng giới được thực thi ngày càng tốt hơn.</p>
                <p>Theo Chủ nhiệm Ủy ban Xã hội, Chủ tịch Nhóm nữ đại biểu Quốc hội Việt Nam khóa XV Nguyễn Thúy Anh, nhiệm kỳ QH khóa XV có 151 nữ đại biểu QH, chiếm 30,26% tổng số đại biểu. Tất cả nữ đại biểu QH có trình độ đại học trở lên, trong đó có 79,5% có trình độ trên đại học; 30 đại biểu dưới 40 tuổi (chiếm 19,86%). Tại cuộc gặp mặt, các nữ đại biểu QH bày tỏ mong muốn lãnh đạo Đảng, Nhà nước tiếp tục quan tâm hơn nữa đến công tác cán bộ nữ, trong đó có các nữ đại biểu QH.</p>`,
                abstract: "Tổng Bí thư Nguyễn Phú Trọng lưu ý, các nữ đại biểu Quốc hội Việt Nam cần tiếp tục phát huy truyền thống anh hùng, vẻ vang của phụ nữ Việt Nam, hết lòng, hết sức vì lợi ích của quốc gia, dân tộc, vì cuộc sống hạnh phúc nhân dân.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-2-tiny.jpg?alt=media&token=8357b344-5464-4eab-8d87-1f4cab2d85f8",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/large-images%2Fnews-2.jpg?alt=media&token=431b45a1-588a-4256-9497-eaee65f95ede",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 2,
                categoryId: 1,
            },
            {
                title: "Bắt 7 nghi can trộm hàng trăm con chó của người dân",
                content: `<p>Trước đó, người dân ở H.Quỳ Hợp và các huyện lân cận bức xúc vì nhiều chó nuôi bị câu trộm. Nhóm trộm chó này rất manh động, luôn mang theo nhiều hung khí như: bình xịt hơi cay, ná cao su, dao kiếm... để chống trả khi bị phát hiện, truy đuổi.</p>
                <p>Sau một thời gian theo dõi, lực lượng công an bắt giữ 6 nghi can trộm cắp chó, thu giữ 14 con chó vừa bị bắt trộm, 3 xe máy gắn biển số giả, 1 bình xịt hơi cay, 2 cây kiếm, 3 súng bắn điện, 2 ná cao su và 9 cuộn băng dính màu đen cùng nhiều công cụ khác để trộm cắp chó.</p>
                <p>Cơ quan Công an xác định, cầm đầu ổ nhóm chuyên trộm chó này là Hoàng Đức Thuận (57 tuổi, ngụ xã Tam Hợp, H.Quỳ Hợp) và Nguyễn Thị Lan (32 tuổi, ngụ TT.Quỳ Hợp, H.Quỳ Hợp).</p>
                <p>Nghi can Thuận và Lan là các chủ lò mổ chuyên thu mua chó trộm cắp trên địa bàn H.Quỳ Hợp và các huyện lân cận.</p>
                <p>Để thực hiện các vụ trộm chó, 2 nghi can trên đã cấu kết với 4 nghi can khác ngụ cùng địa bàn. Khoảng 20 giờ hằng ngày, các nghi can này chia thành 2 cặp điều khiển xe máy gắn biển số giả, sử dụng súng bắn điện, bao bì xác rắn, băng keo, bình xịt hơi cay… để đi bắt trộm chó rồi mang về bán cho Hoàng Đức Thuận và Nguyễn Thị Lan.</p>
                <p>Tại cơ quan công an, các nghi can này khai nhận từ đầu tháng 5 đến khi bị bắt, nhóm này đã trộm và tiêu thụ hàng trăm con chó trên địa bàn các huyện: Quỳ Hợp, Nghĩa Đàn, Quỳ Châu, Tân Kỳ và TX.Thái Hòa…</p>
                <p>Vụ trộm hàng trăm con chó đang được công an điều tra mở rộng.</p>`,
                abstract: "Ngày 9.6, thông tin từ Phòng Cảnh sát hình sự Công an Nghệ An cho biết, cơ quan này và Công an H.Quỳ Hợp vừa triệt phá vụ trộm chó quy mô lớn trên địa bàn.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-3-tiny.jpg?alt=media&token=fb6d037a-7e1f-41d7-bb7d-faec6b626e34",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-3-tiny.jpg?alt=media&token=fb6d037a-7e1f-41d7-bb7d-faec6b626e34",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 3,
                categoryId: 2,
            },
            {
                title: "Tây Ninh: Điều tra vụ người chồng và vợ cũ tử vong tại nhà",
                content: `<p>Ngày 9.6, Văn phòng Cơ quan Cảnh sát điều tra Công an Tây Ninh cho biết đang thụ lý điều tra, làm rõ vụ việc vợ chồng tử vong tại nhà riêng thuộc ấp Lộc Thuận, xã Hưng Thuận (TX.Trảng Bàng). Hai nạn nhân được xác định là anh T.H.T (33 tuổi, ngụ ấp Lộc Thuận, xã Hưng Thuận, TX.Trảng Bàng) và chị N.T.T.C (36 tuổi, vợ cũ của anh T.).</p>
                <p>Theo thông tin ban đầu, anh T. và chị C. kết hôn năm 2009 và đến tháng 8.2022 ly hôn. Đến tháng 5.2023, cả hai quay lại chung sống với nhau tại nhà anh T. (ấp Lộc Thuận, xã Hưng Thuận, TX.Trảng Bàng).</p>
                <p>Ngày 7.6, anh T. và chị C. vẫn sinh hoạt tại nhà, đến 22 giờ cùng ngày đi ngủ như mọi khi. Khoảng 6 giờ ngày 8.6, T.T.B (13 tuổi), thức dậy đi ra phía sau nhà phát hiện người cha tử vong trong tư thế treo cổ tại mái che. Hoảng sợ, em B. đi vào nhà kêu mẹ thì phát hiện chị C. nằm chết trên giường, nên hô hoán nhờ người thân sống gần đó đến giúp đỡ.</p>
                <p>Nhận được tin báo, Công an TX.Trảng Bàng cùng Văn phòng cơ quan Cảnh sát điều tra Công an Tây Ninh và các phòng nghiệp vụ có mặt tại hiện trường để điều tra vụ việc. Sau khi hoàn tất các thủ tục, công an bàn giao thi thể 2 vợ chồng cho người nhà lo hậu sự.</p>
                <p>Vụ 2 vợ chồng tử vong tại nhà riêng đang được Công an Tây Ninh điều tra làm rõ.</p>`,
                abstract: "Sau khi thức dậy, người con 13 tuổi phát hiện cha mẹ tử vong trong nhà nên hô hoán người thân gần đó đến giúp đỡ.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-4-tiny.jpg?alt=media&token=cdf370e1-92db-4011-94a8-12e85c36df67",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-4-tiny.jpg?alt=media&token=cdf370e1-92db-4011-94a8-12e85c36df67",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 4,
                categoryId: 2,
            },
            {
                title: "Nhận nhiều cuộc gọi, cụ bà suýt bị lừa chuyển khoản 100 triệu đồng",
                content: `<p>Ngày 9.6, theo thông tin từ Công an tỉnh Hải Dương, trên địa bàn tỉnh vừa xảy ra vụ một người dân suýt bị lừa khoản tiền lớn dưới hình thức chuyển khoản.</p>
                <p>Trước đó, ngày 8.6, bà L.T.G (81 tuổi, trú tại thôn Lãng Xuyên, xã Gia Tân, H.Gia Lộc, tỉnh Hải Dương) nhận được nhiều cuộc gọi từ số điện thoại lạ. Người gọi tự xưng là cán bộ công an điều tra, thông báo bà G. có liên quan đến hành vi vi phạm pháp luật, yêu cầu bà chuyển số tiền 100 triệu đồng, nếu không sẽ bị bắt giam.</p>
                <p>Do lo sợ, khoảng 14 giờ 30 phút cùng ngày, bà G. một mình đến Quỹ tín dụng nhân dân xã Gia Tân, trụ sở đặt tại thôn Lãng Xuyên để rút tiền trong sổ tiết kiệm với mục đích chuyển cho đối tượng lừa đảo.</p>
                <p>Cùng thời điểm đó, lực lượng Công an xã Gia Tân đang thực hiện nhiệm vụ hướng dẫn, hỗ trợ người dân cài đặt tài khoản định danh điện tử tại khu vực gần quỹ tín dụng. Thấy bà G. có dấu hiệu lo lắng, hoảng loạn, liên tục yêu cầu nhân viên quỹ tín dụng rút tiền nhanh, đồng thời thường xuyên nghe điện thoại, cán bộ công an xã đã kịp thời tiếp cận bà G. và cán bộ quỹ tín dụng để tìm hiểu, nắm thông tin vụ việc.</p>
                <p>Sau khi kiểm tra lại thông tin do bà G. cung cấp, lực lượng công an xã đã động viên bà G. giữ bình tĩnh, đồng thời mời bà về trụ sở làm việc. Tại đây, cán bộ công an xã đã tuyên truyền về hành vi lừa đảo của các đối tượng qua điện thoại, vận động bà G. không nghe và làm theo bất cứ yêu cầu nào của đối tượng. </p>
                <p>Sau khi được phân tích rõ về phương thức, thủ đoạn của bọn tội phạm, bà G. nhận thức được tình hình, thoát khỏi bẫy lừa đảo, bảo toàn được số tiền 100 triệu đồng. Lực lượng công an sau đó hỗ trợ bà G. đi gửi tiết kiệm lại số tiền vừa rút.</p>`,
                abstract: "Giả mạ công an, đối tượng liên tục yêu cầu cụ bà L.T.G chuyển 100 triệu đồng qua tài khoản, dọa rằng bà vi phạm pháp luật, nếu không chuyển tiền sẽ bị bắt giam.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-5-tiny.jpg?alt=media&token=6162a856-e5c2-402b-9bef-5540d220aab8",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-5-tiny.jpg?alt=media&token=6162a856-e5c2-402b-9bef-5540d220aab8",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 5,
                categoryId: 3,
            },
            {
                title: "Việt Nam đăng cai Hội nghị Bộ trưởng ASEAN về quản lý thiên tai lần thứ 11",
                content: `<p>Theo trình tự luân phiên giữa các quốc gia ASEAN, năm 2023, Việt Nam đảm nhận vai trò Chủ tịch Ủy ban ASEAN về quản lý thiên tai (ACDM), đăng cai tổ chức Hội nghị Bộ trưởng ASEAN về quản lý thiên tai lần thứ 11 và các phiên họp liên quan của ACDM, Trung tâm Điều phối khu vực ASEAN về hỗ trợ nhân đạo trong thiên tai (AHA)...</p>
                <p>Việc đăng cai tổ chức diễn đàn lớn về quản lý thiên tai trong khu vực ASEAN là nghĩa vụ của Việt Nam, đồng thời là cơ hội để chủ động dẫn dắt, nâng cao hiệu quả, vị thế và thể hiện vai trò của Việt Nam trong hợp tác ASEAN về quản lý thiên tai nói riêng và trong xây dựng cộng đồng ASEAN nói chung.</p>
                <p>“Từ ứng phó đến hành động sớm và tăng cường chống chịu - ASEAN hướng đến mục tiêu lãnh đạo toàn cầu trong quản lý thiên tai” là chủ đề do Việt Nam đề xuất và được cơ quan quản lý thiên tai của các quốc gia ASEAN thống nhất lựa chọn cho hợp tác khu vực về quản lý thiên tai năm 2023.</p>
                <p>Ông Phạm Đức Luận, Cục trưởng Cục quản lý đê điều và phòng, chống thiên tai (Bộ NN-PTNT), cho biết từ đầu năm đến nay, với vai trò là Chủ tịch Ủy ban ASEAN về quản lý thiên tai, Việt Nam đã phối hợp chặt chẽ với Ban Thư ký ASEAN, AHA, các đối tác ASEAN cùng với các cơ quan liên quan tổ chức xây dựng kế hoạch, chương trình triển khai và huy động các nguồn lực để thực hiện các hoạt động quản lý thảm họa và ứng phó khẩn cấp trong năm.</p>
                <p>Theo ông Luận, từ ngày 12 - 20.2, tại TP.Đà Nẵng, Việt Nam đã phối hợp với AHA tổ chức đào tạo đội đánh giá và ứng phó khẩn cấp thiên tai ASEAN (ASEAN - ERAT) cho các cán bộ phòng, chống thiên tai của 10 nước thành viên ASEAN.</p>
                <p>Đây là một trong những cơ chế hợp tác mang tính hành động thiết thực trong khu vực. ASEAN - ERAT được thành lập theo sự đồng thuận của 10 nước ASEAN để tăng cường khả năng sẵn sàng và năng lực của các nước thành viên, đảm bảo ứng phó nhanh, đồng bộ, thống nhất trong nội khối, phát huy sức mạnh tổng hợp của khu vực trong việc hỗ trợ nước thành viên bị ảnh hưởng bởi thảm họa, thiên tai. Các thành viên của các đội ASEAN - ERAT luôn là nòng cốt trong các hoạt động cứu trợ, ví dụ như cứu trợ tại Myanmar sau bão MOCHA vừa rồi.</p>
                <p>"Để chia sẻ kinh nghiệm phòng, chống thiên tai cũng như các thành tựu về giảm nhẹ rủi ro thiên tai với các nước trong khu vực, chúng tôi cũng đã lên kế hoạch tổ chức một số cuộc hội thảo, diễn đàn chuyên môn và tham quan thực tế cho đại diện các cơ quan phòng, chống thiên tai trong khu vực trọng điểm cũng như các công trình phòng, chống thiên tai lớn, quan trọng tại Việt Nam, đặc biệt là tại khu vực ĐBSCL", ông Luận nói.</p>`,
                abstract: "Việc tổ chức Hội nghị Bộ trưởng ASEAN về quản lý thiên tai lần thứ 11 là cơ hội để Việt Nam chủ động dẫn dắt, nâng cao hiệu quả, vị thế và thể hiện vai trò nước ta trong hợp tác ASEAN về quản lý thiên tai nói riêng và trong xây dựng cộng đồng ASEAN nói chung.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-6-tiny.jpg?alt=media&token=4d3d9ca0-4575-4997-97e1-a82280750a01",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-6-tiny.jpg?alt=media&token=4d3d9ca0-4575-4997-97e1-a82280750a01",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 1,
                categoryId: 3,
            },
            {
                title: "Đà Nẵng: Lực lượng bảo vệ bờ biển Nhật Bản huấn luyện chung với Cảnh sát biển",
                content: `<p>Tàu tuần tra SETTSU ghé thăm hữu nghị TP.Đà Nẵng, nhân dịp kỷ niệm 50 năm thiết lập quan hệ ngoại giao giữa Việt Nam và Nhật Bản (1973 - 2023).</p>
                <p>Trong thời gian ở TP.Đà Nẵng (từ ngày 13 đến ngày 18.2), lực lượng tàu tuần tra SETTSU chào xã giao lãnh đạo TP.Đà Nẵng và giao lưu, huấn luyện chung với Bộ Tư lệnh Vùng Cảnh sát biển 2.</p>
                <p>Đoàn chỉ huy tàu SETTSU cũng sẽ làm việc với Trung tâm Điều phối hàng hải TP.Đà Nẵng, tham quan phố cổ Hội An (Quảng Nam).</p>
                <p>Nhân dịp này, Bộ tư lệnh Vùng Cảnh sát biển 2 và cơ quan chức năng Bộ tư lệnh Cảnh sát biển Việt Nam tổ chức đón đoàn Phó tư lệnh Lực lượng bảo vệ bờ biển Nhật Bản sang tham dự các hoạt động giao lưu với Bộ tư lệnh Vùng Cảnh sát biển 2. Đồng thời, hai bên sẽ phối hợp tổ chức luyện tập tìm kiếm cứu nạn, phòng, chống cháy nổ trên biển.</p>
                <p>Tàu tuần tra SETTSU thuộc biên chế của Bộ Tư lệnh Vùng 5 (Lực lượng bảo vệ bờ biển Nhật Bản), có trọng tải 3.304 tấn với 52 thuyền viên, do đại tá Niwa Satoshi làm thuyền trưởng.</p>
                <p>Tàu dài 105,4 m, rộng 14,6 m, chiều cao tối đa 29 m, tốc độ tối đa 18 hải lý/giờ. Nhiệm vụ của tàu tuần tra SESTSU là tuần tra chống cướp biển và cướp có vũ trang, mỗi đợt tuần tra thường kéo dài 1 tháng tại vùng biển Đông Nam Á.</p>
                <p>Theo Sở TT-TT TP.Đà Nẵng, chuyến thăm hữu nghị TP.Đà Nẵng của tàu tuần tra SETTSU làm sâu sắc hơn quan hệ hữu nghị giữa Việt Nam và Nhật Bản, góp phần duy trì và củng cố trật tự hàng hải tự do, cởi mở dựa trên thượng tôn luật pháp quốc tế ở khu vực Ấn Độ Dương - Thái Bình Dương.</p>`,
                abstract: "Ngày 13.2, tàu tuần tra SETTSU (Lực lượng bảo vệ bờ biển Nhật Bản) cập cảng Tiên Sa, chính thức thăm TP.Đà Nẵng.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-7-tiny.jpg?alt=media&token=5d4a0bd7-71b4-43a2-b5a2-ada22b3101f7",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-7-tiny.jpg?alt=media&token=5d4a0bd7-71b4-43a2-b5a2-ada22b3101f7",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 2,
                categoryId: 4,
            },
            {
                title: "Nghĩa vụ quân sự năm 2023, những thông tin cần biết",
                content: `Tất cả các thông tin liên quan đến nghĩa vụ quân sự năm 2023, đều được quy định chi tiết tại luật Nghĩa vụ quân sự năm 2015 và Thông tư 148/2018/TT-BQP quy định việc tuyển chọn và gọi công dân nhập ngũ.
                <h2>Các tiêu chuẩn đủ để được gọi nhập ngũ</h2>
                <p>Điều 4 luật Nghĩa vụ quân sự 2015 nêu, nghĩa vụ quân sự là nghĩa vụ vẻ vang của công dân phục vụ trong Quân đội nhân dân. Thực hiện nghĩa vụ quân sự bao gồm phục vụ tại ngũ và phục vụ trong ngạch dự bị của Quân đội nhân dân.</p>
                <p>Đồng thời, tại Điều 31 luật Nghĩa vụ quân sự 2015 cũng quy định công dân được gọi nhập ngũ khi có đủ các tiêu chuẩn:</p>
                <ul>
                <li>Có lý lịch rõ ràng;</li>
                <li>Chấp hành nghiêm đường lối, chủ trương của Đảng, chính sách, pháp luật của Nhà nước;</li>
                <li>Có đủ sức khỏe phục vụ tại ngũ theo quy định;</li>
                <li>Có trình độ văn hóa phù hợp.</li>
                </ul>
                <p>Trong đó, về tiêu chuẩn văn hóa, theo khoản 4, Điều 4, Thông tư 148/2018/TT-BQP, tuyển chọn và gọi nhập ngũ những công dân có trình độ văn hóa lớp 8 trở lên, lấy từ cao xuống thấp. Những địa phương có khó khăn không đảm bảo đủ chỉ tiêu giao quân thì báo cáo cấp có thẩm quyền xem xét, quyết định được tuyển chọn số công dân có trình độ văn hóa lớp 7.</p>
                <p>Về tiêu chuẩn về sức khỏe, Thông tư 148/2018/TT-BQP cũng nêu rõ phải có sức khỏe loại 1, 2, 3 theo quy định tại Thông tư liên tịch số 16/2016/TTLT-BYT-BQP, riêng những công dân có sức khỏe loại 3 bị cận thị 1,5 điop trở lên, viễn thị ở các mức độ, bị nghiện ma túy, nhiễm HIV, AIDS sẽ không được gọi nhập ngũ.</p>
                <h2>Tuổi nghĩa vụ quân sự</h2>
                <p>Theo Điều 30 luật Nghĩa vụ quân sự năm 2015, độ tuổi đi nghĩa vụ quân sự là từ đủ 18 tuổi đến hết 25 tuổi.</p>
                <p>Riêng trường hợp công dân nam được đào tạo trình độ cao đẳng, đại học đã được tạm hoãn gọi nhập ngũ, thì độ tuổi gọi nhập ngũ đến hết năm 27 tuổi.</p>
                <h2>Một số trường hợp tạm hoãn gọi nhập ngũ</h2>
                <p>Điều 41 luật Nghĩa vụ quân sự và Thông tư 148/2018/TT-BQP quy định một số trường hợp tạm hoãn gọi nhập ngũ:</p>
                <p>a) Chưa đủ sức khỏe phục vụ tại ngũ theo kết luận của Hội đồng khám sức khỏe.</p>
                <p>b) Là lao động duy nhất phải trực tiếp nuôi dưỡng thân nhân không còn khả năng lao động hoặc chưa đến tuổi lao động; trong gia đình bị thiệt hại nặng về người và tài sản do tai nạn, thiên tai, dịch bệnh nguy hiểm gây ra được Ủy ban nhân dân xã, phường, thị trấn (sau đây gọi chung là cấp xã) xác nhận.</p>
                <p>c) Một con của bệnh binh, người nhiễm chất độc da cam suy giảm khả năng lao động từ 61% đến 80%.</p>
                <p>d) Có anh, chị hoặc em ruột là hạ sĩ quan, binh sĩ đang phục vụ tại ngũ; hạ sĩ quan, chiến sĩ thực hiện nghĩa vụ tham gia Công an nhân dân.</p>
                <p>đ) Người thuộc diện di dân, giãn dân trong 3 năm đầu đến các xã đặc biệt khó khăn theo dự án phát triển kinh tế - xã hội của Nhà nước do Ủy ban nhân dân cấp tỉnh trở lên quyết định.</p>
                <p>e) Cán bộ, công chức, viên chức, thanh niên xung phong được điều động đến công tác, làm việc ở vùng có điều kiện kinh tế - xã hội đặc biệt khó khăn theo quy định của pháp luật.</p>
                <p>g) Đang học tại cơ sở giáo dục phổ thông; đang được đào tạo trình độ đại học hệ chính quy thuộc cơ sở giáo dục đại học, trình độ cao đẳng hệ chính quy thuộc cơ sở giáo dục nghề nghiệp trong thời gian một khóa đào tạo của một trình độ đào tạo.</p>`,
                abstract: "Tuổi đi nghĩa vụ quân sự là từ đủ 18 tuổi đến hết 25 tuổi, và thời gian phục vụ nghĩa vụ quân sự là 24 tháng.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-8-tiny.jpeg?alt=media&token=2bec2b14-fb85-46a0-9e52-3b3240d312fb",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-8-tiny.jpeg?alt=media&token=2bec2b14-fb85-46a0-9e52-3b3240d312fb",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 3,
                categoryId: 4,
            },
            {
                title: "Quang Hải chia tay CLB Pau trở về với V-League",
                content: `<p>Sau một thời gian thử sức mình ở giải hạng 2 Pháp trong màu áo CLB Pau, Quang Hải đã kết thúc hợp đồng với CLB này trước thời hạn 1 năm.</p>
                <p>Trên trang cá nhân của mình, người đại diện của Quang Hải chia sẻ: "Chắc các bạn cũng hiểu, sau rất nhiều tuần trao đổi với Pau FC, tôi đã trực tiếp đến gặp Pau FC để yêu cầu kết thúc hợp đồng với Quang Hải vào cuối mùa giải năm nay.</p>
                <p>Vì lý do đó, tôi đã đích thân đến gặp Chủ tịch Frey-Laporte Bernard thứ 5 ngày 1.6 và chúng tôi đã đạt được thỏa thuận ngày 3.6 để Quang Hải kết thúc mùa giải này với Pau FC vào ngày 30.06.2023 ( sớm hơn trước một năm so với hợp đồng). Chủ tịch Pau đã chấp nhận yêu cầu của chúng tôi và chúng tôi cảm ơn ông ấy vì điều đó.</p>
                <p>Chúng tôi cảm ơn Pau FC đã cho Quang Hải cơ hội đến Pháp và chơi ở Ligue 2, tất cả các nhân viên, cổ động viên, bạn bè và tất cả những người đã ủng hộ chúng tôi.</p>
                <p>Thông tin chi tiết về việc chấm dứt hợp đồng sẽ được thông báo qua các kênh báo chí trong vài ngày tới.</p>
                <p>Cảm ơn tất cả các bạn đã luôn ủng hộ".</p>
                <p>Như vậy, ngôi sao của bóng đá Việt Nam không tiếp tục thử sức mình tại châu Âu mà trở về Việt Nam. Có nhiều nguồn tin cho rằng, Quang Hải đã có thỏa thuận với 1 CLB tại V-League để thi đấu tại Việt Nam ở mùa giải tiếp theo.</p>
                <p>Việc Quang Hải đến Pháp thi đấu cho CLB Pau được xem là sự dũng cảm khi anh không có thể hình tốt nhưng vẫn mạnh dạn ra đi để thử sức mình.</p>
                <p>Trong năm vừa qua, Quang Hải chỉ ra sân thi đấu cho Pau Fc vỏn vẹn 254 phút và ghi 1 bàn thắng. Quang Hải thường xuyên ngồi dự bị hoặc không được đăng ký trước các trận đấu và anh cũng đã được chuyển xuống thi đấu cho đội hình B của CLB Pau.</p>
                <p>Giới chuyên môn cho rằng, Quang Hải sớm trở về Việt Nam là tốt cho anh, bởi nếu tiếp tục ở Pau FC, anh ít có cơ hội ra sân nên sẽ ảnh hưởng đến chuyên môn của mình.</p>`,
                abstract: "Tiền vệ Quang Hải đã chính thức chia tay CLB Pau (Pháp) để trở về thi đấu tại V-League.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-9-tiny.png?alt=media&token=3e8ced9d-66dc-412e-b13f-fcaa6cd108cc",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-9-tiny.png?alt=media&token=3e8ced9d-66dc-412e-b13f-fcaa6cd108cc",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 4,
                categoryId: 5,
            },
            {
                title: "Đội tuyển nữ Việt Nam có kịp 'lột xác' cho World Cup 2023?",
                content: `<p>Đội tuyển nữ Việt Nam chỉ còn cách World Cup 2023 khoảng 1 tháng chuẩn bị. Quá trình tập luyện được đẩy nhanh với chuyến tập huấn tại châu Âu, cùng 5 trận giao hữu với các đối thủ mạnh, nổi bật có đội tuyển nữ Đức hay U.23 Ba Lan. Thầy trò HLV Mai Đức Chung từng nhiều lần tập luyện tại châu Âu, gần nhất là chuyến đi tới Tây Ban Nha để rèn quân trước Asian Cup 2022. Tuy nhiên, đợt tập luyện này đặt ra cho đội tuyển nữ Việt Nam một nhiệm vụ khác, đó là làm quen với những đối thủ đẳng cấp cao để không bỡ ngỡ trong lần đầu bước ra "biển lớn" World Cup.</p>
                <p>HLV Mai Đức Chung chia sẻ: "Trong cuộc gặp gỡ đội tuyển nữ Việt Nam, Thủ tướng Phạm Minh Chính căn dặn toàn đội không đặt tham vọng lớn tại World Cup 2023, nhưng vẫn có những yêu cầu với cầu thủ. Trình độ của chúng ta chưa bằng đối thủ, đây cũng là lần đầu tiên tham dự, vì thế chúng tôi sẽ giữ cho tinh thần cầu thủ được thoải mái nhưng vẫn có những yêu cầu về chuyên môn. Chúng tôi sẽ cố gắng tối đa để gìn giữ hình ảnh của nhà vô địch SEA Games. Sau giải đấu sắp tới, chúng ta còn thi đấu ASIAD 19 và vòng loại thứ hai Olympic Paris 2024, đó cũng là mục tiêu của đội trong năm nay. Chúng ta cần đi xa hơn".</p>
                <p>Thủ tướng Phạm Minh Chính dặn dò, đội tuyển nữ Việt Nam cần cải thiện khâu thể lực. Đây cũng là vấn đề ban huấn luyện đội nữ đau đáu thời gian qua. Bởi dù giành vé dự World Cup 2023, nhưng khoảng cách trình độ giữa Việt Nam và những đội hàng đầu châu Á như Nhật Bản, Hàn Quốc, Trung Quốc vẫn rất lớn, thể hiện ở những thất bại rất đậm. Đội tuyển nữ Philippines mới nhập tịch một số cầu thủ trong 2 năm qua, cũng đã thắng thầy trò HLV Mai Đức Chung ở 2 trận gần nhất bởi những ưu thế vượt trội về sức vóc, thể lực. Ở sân chơi thế giới, các đội như Mỹ, Hà Lan còn mạnh hơn rất nhiều.</p>
                <p>Tất nhiên, đội tuyển nữ Việt Nam không đặt nặng thành tích ở sân chơi quá tầm, nhưng không đồng nghĩa toàn đội buông xuôi. Bởi đây là "vũ môn" để đội tuyển nữ Việt Nam lội ngược dòng nước, tự vượt qua giới hạn bản thân.</p>
                <p>HLV Mai Đức Chung đã chuẩn bị cho quá trình nâng cấp đội tuyển. Từ đầu năm, sơ đồ 3 trung vệ được sử dụng nhiều hơn. Đây cũng là công thức được ông Chung sử dụng để đối đầu với những đội bóng hùng mạnh ở World Cup. Trong các buổi tập chuẩn bị cho chuyến tập huấn, đội tuyển nữ Việt Nam rèn nhiều hơn các bài tập phối hợp một chạm ngắn, nhuyễn, giữ cự ly đội hình phòng ngự. Cường độ và độ khó trong các bài tập được HLV Mai Đức Chung đẩy lên liên tục mỗi ngày. Đặc biệt, các bài thể lực do trợ lý Cedric Roger thiết kế chiếm thời lượng lớn trong các buổi tập. Việc tập thể lực liên tục giúp cầu thủ rèn sức chịu đựng (cả về thể chất và tâm lý) trước những đội mạnh hơn. Các trận giao hữu với CLB nữ hay đội tuyển nữ Đức (đương kim á quân EURO 2022) là vốn quý để đội nữ Việt Nam học hỏi đối thủ.</p>
                <p>Trong các cầu thủ trẻ được tin dùng thời gian qua, nổi bật có Thanh Nhã, Hải Linh, Thu Thương, Vạn Sự,... Đây là lực lượng U.20 nữ Việt Nam năm 2019 được tạo điều kiện lên đội tuyển quốc gia để tạo thế hệ nòng cốt. Đội tuyển nữ Việt Nam vẫn phụ thuộc vào kinh nghiệm của những cầu thủ kinh nghiệm như Huỳnh Như, Tuyết Dung, Thùy Trang, nhưng vai trò của cầu thủ trẻ ngày càng quan trọng, bởi đây là những nhân tố còn "dư địa" tiến bộ, cũng như tốc độ và sự dẻo dai để va chạm với những đối thủ mạnh.</p>
                <p>HLV Mai Đức Chung cũng mở rộng quỹ cầu thủ, với 28 cái tên được lựa chọn tập huấn tại Đức để sàng lọc cho World Cup 2023. Từ sau khi giành vé dự World Cup hồi đầu năm 2022, ban huấn luyện đội nữ đã đôn nhiều cầu thủ trẻ, trong đó có những gương mặt mới như Vũ Thị Hoa, Ngọc Uyên, Nhật Lan. Đây là thế hệ đóng vai trò tiếp nối và đưa đội lên một tầm vóc cao hơn nếu được định hướng đúng đắn.</p>
                <p>Dù cho giải đấu trước mắt khó khăn đến mức ngay cả mục tiêu 1 điểm dường như cũng xa vời, đội tuyển nữ Việt Nam vẫn chuẩn bị rất nghiêm túc. Thành quả có thể chưa đến, nhưng chỉ cần vượt qua giới hạn và bản lĩnh hơn qua từng trận đấu, điều ấy đã rất quý giá với "những cô gái kim cương".</p>`,
                abstract: "Chuyến tập huấn tại châu Âu được kỳ vọng giúp đội tuyển nữ Việt Nam nâng cao trình độ để chuẩn bị tốt nhất cho sân chơi World Cup 2023. ",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-10-tiny.jpg?alt=media&token=c695732b-da7c-4aab-9d19-9bfdd14d09df",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-10-tiny.jpg?alt=media&token=c695732b-da7c-4aab-9d19-9bfdd14d09df",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 5,
                categoryId: 5,
            },
            {
                title: "Real Madrid nhắm Harry Kane trong ngày Karim Benzema thi đấu trận cuối",
                content: `<p>Trong ngày chia tay Real Madrid, Karim Benzema kịp ghi bàn gỡ hòa 1-1 trước Athletic Bilbao ở phút 72 từ chấm phạt đền, giúp nâng tổng số bàn thắng trong sự nghiệp tại sân Bernabeu lên 354 bàn và 165 kiến tạo.</p>
                <p>Pha lập công này cũng giúp Karim Benzema có lời chia tay hoàn hảo với Real Madrid và các CĐV trên sân Bernabeu. Khi được HLV Ancelotti thay ra ngay sau bàn gỡ hòa, Karim Benzema đã được toàn bộ các CĐV trên sân Bernabeu đứng dậy vỗ tay tri ân. Tiền đạo người Pháp đã bật khóc ngay giây phút chính thức chia tay đội bóng mà anh gắn bó đến 14 mùa giải, giành hàng loạt danh hiệu cùng các thành quả khác.</p>
                <p>Bên cạnh Karim Benzema, đây cũng là trận đấu cuối của nhiều cầu thủ Real Madrid khác như Marco Asensio, Mariano và Eden Hazard, khi họ cũng đều nói lời chia tay đội bóng trước ngày cuối mùa giải La Liga.</p>
                <p>Tuy nhiên, HLV Ancelotti xác nhận sẽ ở lại Real Madrid bất chấp sự quan tâm từ Liên đoàn Bóng đá Brazil, khi tuyên bố: "Tôi ở lại Real Madrid đến mùa tới, điều này chắc chắn 100%".</p>
                <p>HLV Ancelotti cũng cho biết: "Karim Benzema đã quyết định chia tay Real Madrid và nói với chúng tôi vào buổi sáng ngày thi đấu trận cuối mùa giải. Điều này hết sức bất ngờ. Sự chia tay của cậu ấy không nằm trong tính toán của chúng tôi. Bây giờ, chúng tôi phải xem xét tình hình và đánh giá cần phải mua một tiền đạo khác thay thế. Real Madrid cần tăng cường nhân sự ở hàng tấn công và chúng tôi sẽ làm điều này. Chúng tôi cần một tiền đạo có thể ghi bàn và biết cách liên kết tốt với các đối tác xung quanh. Vì thế, đó sẽ là một tiền đạo rất giỏi".</p>
                <p>Theo báo chí Tây Ban Nha, Real Madrid đang nhắm tiền đạo Harry Kane của Tottenham là người thay thế Karim Benzema, trong khi cũng đang chạy đua đàm phán chiêu mộ ngôi sao Kai Havertz từ Chelsea và tiền đạo Joselu từ Espanyol. Real Madrid dự kiến phải chi ra gần 200 triệu euro cho các bản hợp đồng này, sau khi đã tiết kiệm được hơn 75 triệu euro tiền lương nhờ chia tay Karim Benzema, Asensio, Mariano và Eden Hazard.</p>`,
                abstract: "Rạng sáng 5.6, tiền đạo Karim Benzema thi đấu trận cuối trong màu áo Real Madrid trước khi chia tay để đến CLB Al-Ittihad ở Ả Rập Xê Út. Đội bóng Hoàng gia Tây Ban Nha cũng đang nhắm mua tiền đạo Harry Kane để thay thế.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-11-tiny.jpeg?alt=media&token=7dc0730f-d1b1-4caf-9faa-47e374f31426",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-11-tiny.jpeg?alt=media&token=7dc0730f-d1b1-4caf-9faa-47e374f31426",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 1,
                categoryId: 6,
            },
            {
                title: "Mbappe sẽ đến Real Madrid vào mùa hè 2024",
                content: `<p>Mbappe đã có những liên hệ gần như sắp gia nhập CLB Real Madrid trong kỳ chuyển nhượng mùa hè 2022 với mức phí khoảng 200 triệu euro. Tuy nhiên, vào giờ chót cầu thủ này thay đổi quyết định để ký hợp đồng gia hạn với PSG đến tháng 6.2024, kèm điều khoản gia hạn thêm 1 năm.</p>
                <p>Sự thay đổi của Mbappe đã khiến ban lãnh đạo CLB Real Madrid với ông Chủ tịch Florentino Perez khi đó rất tức giận và gọi: "Mọi thứ với Mbappe coi như đã kết thúc".</p>
                <p>Tuy nhiên, theo tờ Relevo: "Tình hình đã có nhiều thay đổi gần đây, khi Mbappe có những động thái đích thân gửi lời xin lỗi đến ông Florentino Perez vì sự cố ở mùa hè 2022 và đã được chấp nhận. Mối quan hệ giữa Mbappe và Real Madrid hiện cũng đã được nối lại".</p>
                <p>Trong thời gian gần đây, Mbappe cũng đích thân xác nhận sẽ thi đấu tiếp cho PSG ở mùa giải 2023 - 2024, nhưng đồng thời đã có ý định không kích hoạt điều khoản gia hạn thêm 1 mùa giải (đến tháng 6.2025). Qua đó, tiền đạo người Pháp này mở khả năng sẽ gia nhập Real Madrid như mong muốn trước đây vào mùa hè 2024 và theo diện tự do.</p>
                <p>"CLB Real Madrid cũng đang có những động thái chờ đợi sự gia nhập của Mbappe, sau khi thuyết phục được tiền đạo kỳ cựu Karim Benzema thi đấu tiếp cho đội bóng thêm 1 mùa giải (đến tháng 6.2024) thay vì đến Ả Rập Xê Út. Động thái này cũng sẽ làm thay đổi dự định của Real Madrid trong kỳ chuyển nhượng mùa hè năm nay, khi chỉ hướng đến các tiền đạo có yếu tố dự phòng như Joselu, Marcus Thuram hay Roberto Firmino thay cho Marco Asensio (dự kiến đến PSG). Trong khi, có nhiều khả năng Real Madrid cũng không tham gia cuộc đua sở hữu tiền đạo Harry Kane (từ Tottenham) nữa, mà sẽ tiếp tục chờ đợi Mbappe", tờ Relevo cho biết.</p>`,
                abstract: "Theo báo chí Tây Ban Nha, tiền đạo Kylian Mbappe của PSG đã có những cam kết sẽ gia nhập CLB Real Madrid vào mùa hè 2024 theo diện chuyển nhượng tự do.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-12-tiny.jpeg?alt=media&token=2cd9d2fb-769b-49dc-98e2-afa19f73e954",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-12-tiny.jpeg?alt=media&token=2cd9d2fb-769b-49dc-98e2-afa19f73e954",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 2,
                categoryId: 6,
            },
            {
                title: "'Siêu phẩm' của Saigon Heat hứa hẹn tỏa sáng ở giải bóng rổ VBA 2023",
                content: `<p>Trước thềm VBA 2023, đội hình của CLB Saigon Heat - chủ nhân 3 chức vô địch VBA liên tiếp (2019, 2020, 2022) được người hâm mộ ngóng trông. Đội bóng có biệt danh “Ông 30” đã công bố danh sách thi đấu tại mùa VBA thứ 8 đi kèm với một bất ngờ lớn. “Với tiêu chí thúc đẩy sự phát triển của cầu thủ trẻ, tạo điều kiện cho các chàng trai có cơ hội được thi đấu cũng như cọ xát ở nhiều cấp độ, Saigon Heat tiên phong trong việc chỉ sử dụng duy nhất một cầu thủ ngoại binh ở mùa giải năm nay”, đại diện lãnh đạo CLB chia sẻ.</p>
                <p>Chủ động chịu “thiệt thòi” khi các đội còn lại đều sử dụng 2 ngoại binh, Saigon Heat kỳ vọng vào tay ném thượng thặng Kentrell Barkley. Ngoại binh này là chủ lực giúp CLB Singapore Slingers tiến vào bán kết giải bóng rổ nhà nghề Đông Nam Á 2023 diễn ra hồi đầu năm (ABL Invitational 2023). Tại sân chơi đẳng cấp khu vực, hảo thủ cao 1,98 m dẫn đầu chỉ số ghi điểm với trung bình 26 điểm/trận. Ngoài kỹ năng ghi điểm, Kentrell Barkley cũng là mẫu cầu thủ đa nhiệm, có thể tranh bóng, ném xa hoặc kiến tạo.</p>
                <p>Bên cạnh sự phục vụ của tay ghi điểm thượng hạng, Saigon Heat còn có sự bổ sung chất lượng từ cầu thủ gốc Việt Lê Hải Sơn (Hassan Thomas). Thể hình cao 2,03m và kỹ năng của Lê Hải Sơn được đánh giá không khác gì một ngoại binh. Ngoài ra, đội bóng hơn 10 năm tuổi cũng tiếp tục tin dùng nhiều trụ cột gắn bó nhiều năm như thủ quân Tim Waale (Đinh Khải Tâm), Võ Kim Bản, Nguyễn Huỳnh Phú Vinh, Dư Minh An,... Một số hảo thủ vắng bóng ở mùa trước như hậu vệ Lê Quang, xạ thủ Antony Sundberg,... cũng sẽ hội quân cùng HLV Matt Van Pelt để bảo vệ chức vô địch. Mục tiêu đầu tiên của đội bóng này là đánh bại Hanoi Buffaloes ở trận mở màn VBA 2023 hôm nay.</p>`,
                abstract: "19 giờ 30 hôm nay tại Nhà thi đấu Cầu Giấy (Hà Nội), đương kim vô địch Saigon Heat mang \"siêu phẩm\" là ngoại binh Kentrell Barkley đấu trận mở màn giải bóng rổ chuyên nghiệp Việt Nam VBA 2023 chạm trán đương kim á quân Hanoi Buffaloes.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-13-tiny.png?alt=media&token=c874876b-0b37-4d43-96a1-2e22dbbb7ea8",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-13-tiny.png?alt=media&token=c874876b-0b37-4d43-96a1-2e22dbbb7ea8",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 3,
                categoryId: 7,
            },
            {
                title: "Tuyển thủ bóng rổ Thái Lan gia nhập CLB của Việt Nam",
                content: `<p>Ja Morgan có 2 quốc tịch là Mỹ và Thái Lan. Anh là thành viên của đội tuyển bóng rổ Thái Lan thi đấu tại SEA Games 31 (năm 2022, tại Hà Nội) và SEA Games 32 (tháng 5.2023 ở Campuchia). Bên cạnh đó, cầu thủ sinh năm 1997 còn có hồ sơ khá ấn tượng khi từng thi đấu ở vị trí hậu vệ dẫn bóng cho đội Trường ĐH Bemidji State Beavers ở giải đấu NCAA Division II (Mỹ), với trung bình 14,4 điểm, 5,6 kiến tạo trong mỗi trận đấu.</p>
                <p>Đáng chú ý, Ja Morgan chính là em ruột của Moses Morgan (sinh năm 1992), người từng góp mặt trong đội hình của Saigon Heat tham dự ABL mùa giải 2017. Ja Morgan hứa hẹn sẽ là nhân tố đột phá mới cho Cantho Catfish và mùa giải VBA 2023. Cầu thủ 26 tuổi là mẫu cầu thủ thuần thiên hướng tấn công bằng tốc độ cùng khả năng dứt điểm vòng ngoài tốt.</p>
                <p>Người chơi cặp với Ja Morgan ở Cantho Catfish mùa giải năm nay chính là De Angelo Hamilton. De Angelo Hamilton vốn không còn lạ lẫm gì với người hâm mộ của đội bóng Tây đô. Hamilton đã cùng đội bóng rổ của miền Tây đi từ thăng trầm cho đến vinh quang trong nhiều mùa giải. Mùa giải VBA 2023 cũng là năm thứ 5 anh cống hiến trong màu áo xanh lá. Hamilton được xem "cơn ác mộng" ở khu vực dưới bảng rổ, và những lần ra tay ném 3 thành công chính là lý do ban huấn luyện Cantho Catfish lựa chọn tiếp tục gắn bó với anh.</p>
                <p>Trên sân, Hamilton rất máu lửa, nhưng ngoài sân, anh lại là người có tính cách hài hước, thân thiện và khiến nhiều người hâm mộ luôn ủng hộ, yêu mến.</p>
                <p>Cầu thủ sinh năm 1990 được xem như linh hồn của đội hình Cantho Catfish. Dù đã có dấu hiệu của tuổi tác nhưng Hamilton vẫn thi đấu rất bùng nổ với trung bình 28,9 điểm/trận, dẫn đầu toàn mùa giải và xếp thứ 2 về chỉ số ném 3 điểm. Nhiều "fan" kỳ vọng rằng, nếu Cantho Catfish xây dựng được những vệ tinh thật tốt xung quanh Hamilton thì đội bóng miền Tây sẽ trở nên rất đáng gờm ở mùa giải 2023.</p>
                <p>Trước đó, Cantho Catfish cũng mang về tay ném Michael Soy (hay Nguyễn Toàn Anh). "Xạ thủ" này là một trong những VĐV gốc Việt thi đấu nổi bật tại VBA 2022 với 15,1 điểm/trận, cùng những pha ăn mừng ấn tượng mang đậm cá tính.</p>`,
                abstract: "CLB bóng rổ Việt Nam - Cantho Catfish đã chiêu mộ thành công tuyển thủ Thái Lan Ja Morgan để hướng đến mục tiêu chinh phục mùa giải VBA 2023.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-14-tiny.jpg?alt=media&token=73ce05d4-c701-44a2-888b-b5a769fbae74",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-14-tiny.jpg?alt=media&token=73ce05d4-c701-44a2-888b-b5a769fbae74",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 4,
                categoryId: 7,
            },
            {
                title: "Hạ đối thủ số 1 thế giới, Djokovic cách kỷ lục thế giới 1 trận thắng",
                content: `<p>Đây là trận đấu mà người hâm mộ làng banh nỉ thế giới chờ đợi rất nhiều. Cuộc đối đầu của hai thế hệ quần vợt thế giới khi Alcaraz đại diện cho những tay vợt trẻ đang được kỳ vọng sẽ thống trị làng banh nỉ trong tương lai, còn Djokovic được coi như một huyền thoại. Với 22 danh hiệu Grand Slam, Djokovic tạo nên tên tuổi lẫy lừng và cùng Rafael Nadal và Roger Federer để thống trị làng quần vợt thế giới sau hai thập niên.</p>
                <p>Ngay khi trận đấu bắt đầu, Djokovic chứng tỏ được sự dày dặn của mình bằng việc sớm có bàn bẻ giao bóng của tay vợt số 1 thế giới để vượt lên dẫn trước 3/1. Với lợi thế này, tay vợt 36 tuổi người Serbia đã có được chiến thắng ở ván đấu đầu tiên với tỷ số 6/3. Ván đấu thứ hai được xem là ván đấu hay nhất của trận "chung kết sớm" khi Alcaraz quyết tâm vùng lên mạnh mẽ.</p>
                <p>Với những quả đánh bóng mạnh mẽ lẫn khả năng di chuyển khó tin trên mặt sân đất nện, tay vợt 20 tuổi người Tây Ban Nha đã khiến Djokovic rơi vào thế bị động. Tuy nhiên, cựu số 1 thế giới vẫn cho thấy bản lĩnh cùng kinh nghiệm của mình để đeo bám đến điểm số 5/5. Vẫn với những cú đánh chính xác và đầy uy lực, Alcaraz cuối cùng cũng có được ván thắng với tỷ số 7/5.</p>
                <p>Đến lúc này, những người hâm mộ Djokovic bắt đầu lo lắng khi tay vợt trẻ Alcaraz đang hừng hực khí thế, nhưng bất ngờ tay vợt số 1 thế giới đã gặp phải chấn thương sau cú đánh ở đầu ván thứ ba. Chính chấn thương này khiến Alcaraz chỉ di chuyển khập khiễng trên sân, nên không quá khó khăn để Djokovic có được hai ván thắng dễ dàng liên tiếp đều với tỷ số 6/1.</p>
                <p>Với chiến thắng này, Djokovic tiến vào trận chung kết Pháp mở rộng lần thứ 7 và cũng là trận chung kết Grand Slam thứ 34 trong sự nghiệp của mình. Tuy nhiên, quan trọng nhất là Djokovic đang rất quyết tâm để tạo ra kỷ lục khi trở thành tay vợt nam đầu tiên của làng banh nỉ thế giới có được 23 danh hiệu Grand Slam. Hiện tại, tay vợt người Serbia và Nadal đang cùng chia sẻ kỷ lục 22 danh hiệu.</p>
                <p>Đối thủ trong trận chung kết của Djokovic sẽ là người thắng trong cặp đấu bán kết còn lại giữa Casper Ruud (Na Uy, 4) gặp Alexander Zverev (Đức, 22).</p>`,
                abstract: "Vượt qua tay vợt trẻ đang nắm giữ vị trí số 1 thế giới Carlos Alcaraz (Tây Ban Nha) trong trận bán kết giải Pháp mở rộng diễn ra vào tối nay (9.6, giờ Việt Nam) với tỷ số 3-1, Novak Djokovic (Serbia, 3) chỉ còn cách kỷ lục thế giới của làng banh nỉ với 1 trận thắng.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-15-tiny.jpg?alt=media&token=a570031d-f857-43dc-b8bc-ec2da4f7a130",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-15-tiny.jpg?alt=media&token=a570031d-f857-43dc-b8bc-ec2da4f7a130",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 5,
                categoryId: 8,
            },
            {
                title: "Billiards thế giới rúng động sau vụ 10 cơ thủ Trung Quốc dàn xếp tỷ số",
                content: `<p>Làng blliards thế giới đang quay cuồng với vụ bê bối dàn xếp tỷ số lớn nhất và Trung Quốc là tâm điểm của vụ này, với Liang Wenbo và Li Hang bị cấm thi đấu suốt đời vào ngày 6.6, theo AFP.</p>
                <p>Hiệp hội Blliards chuyên nghiệp thế giới (WPBSA) cũng ban hành lệnh cấm đối với 8 cơ thủ Trung Quốc khác, trong số đó có nhà vô địch giải Masters 2021 là Yan Bingtao. Các cáo buộc bao gồm thao túng kết quả trận đấu, tiếp cận cơ thủ để gian lận, cá cược blliards và dàn xếp tỷ số.</p>
                <p>Trong một tuyên bố, Hiệp hội Blliards và Snooker Trung Quốc (CBSA) cho biết họ sẽ "tổ chức giáo dục trong toàn ngành và đưa ra một loạt biện pháp để thực hiện chống cá cược và gian lận đến cùng".</p>
                <p>Nhiều cơ thủ chuyên nghiệp Trung Quốc đã đến Anh để phát triển sự nghiệp và CBSA cho biết họ sẽ "tăng cường quản lý các cơ thủ chuyên nghiệp ở Anh, tăng cường hợp tác với các tổ chức quốc tế và cùng nhau ngăn chặn những vụ việc tương tự tái diễn".</p>
                <p>Vụ bê bối này là một cú sốc lớn đối với blliards Trung Quốc, vốn đã sản sinh ra một số lượng ngày càng tăng những cơ thủ có trình độ cao trong những năm gần đây. Trong số những cơ thủ bị cuốn vào vụ việc này có cựu vô địch Anh Zhao Xintong, người bị cấm thi đấu 20 tháng. Cơ thủ số 11 thế giới đã được giảm hình phạt từ 2 năm rưỡi sau khi chủ động nhận tội.</p>
                <p>Zhao đã đưa ra lời xin lỗi trên mạng xã hội, nói rằng anh "không bao giờ có ý định hoặc hành động thao túng các trận đấu": "Tôi ngây thơ nghĩ rằng mình chỉ đáp ứng yêu cầu của một người bạn thân. Tôi đã phải trả giá đắt cho hành vi ngu ngốc của mình".</p>
                <p>Các tuyển thủ blliards đã bị lên án gay gắt trên mạng xã hội Trung Quốc, với tin tức về lệnh cấm tăng lên vị trí thứ 2 trong các chủ đề thịnh hành trên mạng xã hội Weibo. "Liang Wenbo đã một tay hủy hoại tương lai của blliards Trung Quốc", một người dùng Weibo bất bình bình luận.</p>`,
                abstract: "Tổ chức đứng đầu blliards Trung Quốc ngày 7.6 tuyên bố sẽ trấn áp nạn cá cược và khởi động một cuộc vận động giáo dục sau khi 10 cơ thủ nước này bị cấm thi đấu vì dàn xếp tỷ số.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-16-tiny.jpeg?alt=media&token=6557eb64-e64e-4e99-9eb7-cd95e9b3bc25",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-16-tiny.jpeg?alt=media&token=6557eb64-e64e-4e99-9eb7-cd95e9b3bc25",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 1,
                categoryId: 8,
            },
            {
                title: "Người Việt không còn mê vàng?",
                content: `<h2>Vắng khách, nhiều tiệm vàng ngưng kinh doanh</h2>
                <p>Dạo một vòng quanh những cửa hàng kinh doanh vàng tại khu vực chợ Bến Thành (Q.1, TP.HCM), chợ Tân Định (Q.1)… có thể nhận thấy rất rõ lượng khách đến giao dịch sụt giảm mạnh. Nhân viên tiệm vàng đa số ngồi bấm điện thoại hay tán gẫu. Nam nhân viên bảo vệ cửa hàng vàng trên đường Lê Thánh Tôn (Q.1) cho biết trước đây, vào buổi trưa nhiều người đi chợ Bến Thành mua sắm; cộng với lượng khách du lịch nước ngoài ra vô khiến khu vực quanh chợ luôn sầm uất, thậm chí nhiều thời điểm xảy ra tình trạng kẹt xe cục bộ. Thế nhưng nay không khí hoàn toàn thay đổi. Lượng xe vào các tiệm vàng thưa thớt. Khách du lịch hay người đi chợ cũng giảm khá nhiều. Không ít cửa hàng kinh doanh vàng không trụ nổi khó khăn trong thời gian dài mấy năm nay từ khi dịch Covid-19 xảy ra dẫn đến đóng cửa.</p>
                <p>Ông Trương Cẩm Cường (chủ tiệm vàng trên địa bàn Q.8, TP.HCM) thừa nhận: "Trong hơn 40 năm kinh doanh vàng, chưa bao giờ tôi chứng kiến cảnh giới kinh doanh lại khó khăn như vậy". Cùng với tình hình đóng cửa kinh doanh cửa hàng cà phê, quần áo, đồ ăn…, các tiệm vàng trên địa bàn TP cũng rơi rụng. Những cửa hàng kinh doanh vàng quanh chợ Xóm Củi (Q.8, TP.HCM), chợ Thiếc (Q.11), hay quanh khu phố vàng Nhiêu Tâm (Q.5) còn duy trì hoạt động cũng thưa thớt khách ra vào.</p>
                <p>Ông Trương Cẩm Cường kể trong nuối tiếc: Trước đây mỗi lần đến mua hàng ở khu vực Nhiêu Tâm về bán, ông phải đi từ sáng sớm để chọn sản phẩm, chiều quay lại lấy hàng. Thế nhưng nay, chỉ cần mất 15 phút là có thể lấy hàng về, không phải chờ đợi. Điều này cho thấy "nhà chành" (đơn vị sản xuất kinh doanh vàng) cũng gặp khó khăn lớn. Một số chành mới đây đã thông báo giảm tiền gia công sản phẩm cho các tiệm vàng 10% để kích nhu cầu từ các tiệm vàng nhỏ. "Về logic, nhiều tiệm vàng đóng cửa thì những tiệm còn hoạt động có lợi thế khai thác số khách hàng của tiệm kia. Thế nhưng điều này đã không xảy ra do nhu cầu mua vàng của người dân sụt giảm toàn diện. Lượng khách hàng mua bán chủ yếu của tiệm trước đây là công nhân. Mỗi tháng người lao động nhận lương sẽ trích ra một khoản mua từ 2 - 3 phân vàng, khi nào cần thì bán lại nhanh lấy tiền lo cho cuộc sống. Thế nhưng từ đầu năm đến nay, lượng công nhân nghỉ việc nhiều dẫn đến lượng khách mua vàng cũng giảm hơn, kinh doanh vàng cũng khó khăn hơn", ông Cường phân tích.</p>
                <p>Công ty CP vàng bạc đá quý Phú Nhuận (PNJ) là một trong những đơn vị có doanh thu lớn, mạng lưới cửa hàng bao phủ cả nước nhưng báo cáo kết quả kinh doanh mới công bố gần đây cho thấy doanh thu thuần giảm sút 6,6% so với cùng kỳ năm ngoái, xuống còn 12.059 tỉ đồng trong 4 tháng đầu năm. Trong đó, tăng trưởng doanh thu mảng bán lẻ giảm 5,7%, bán sỉ giảm 23,3%, vàng 24K giảm 2,4%. Là một trong những đơn vị bán sỉ sản phẩm nữ trang lớn cho các tiệm vàng trên thị trường nhưng doanh thu bán sỉ của PNJ giảm mạnh cho thấy tình hình các tiệm vàng còn khó khăn hơn. Lợi nhuận sau thuế của PNJ cũng giảm 0,7%, xuống còn 859 tỉ đồng.</p>
                <h2>Lượng vàng tiêu thụ giảm hơn một nửa</h2>
                <p>Cách đây 10 năm, VN đứng thứ 8 trong bảng xếp hạng toàn cầu về nhu cầu tiêu thụ vàng. Năm 2012, nhu cầu tiêu thụ vàng của người Việt khoảng 100 tấn nhưng đến năm 2022, con số này chỉ còn 43 tấn. Theo Hội đồng vàng thế giới (WGC), trong quý 1/2023, nhu cầu vàng của VN đã giảm 12% so với cùng kỳ năm trước, xuống còn 17,2 tấn. Sự suy giảm nhu cầu trang sức vàng một phần do tác động kéo giảm nhu cầu vàng của quý đi xuống. Nhu cầu trang sức giảm 18% so với cùng kỳ năm 2022, từ 5,6 tấn quý 1/2022 xuống còn 4,6 tấn trong quý 1/2023. Nhu cầu vàng thỏi và vàng xu cũng trải qua suy giảm, từ 14 tấn trong quý 1/2022 giảm 10%, còn 12,6 tấn trong quý 1/2023.</p>
                <p>Ông Trần Thanh Hải, Chủ tịch HĐQT Công ty CP vàng bạc đá quý SJC Phú Thọ, cho biết giới kinh doanh vàng hạng F1 (doanh nghiệp kinh doanh lớn) hiện gần như bỏ nghề. Trước đây, thời điểm thị trường vàng sôi động, lực lượng kinh doanh vàng khá đông đảo, có các F1, F2, F3… Những người kinh doanh mua bán vàng liên tục, tạo thanh khoản thị trường, giá cả biến động lên xuống thu hút nguồn vốn từ người dân tham gia. Từ sau Nghị định 24/2012 về quản lý hoạt động kinh doanh vàng, thị trường vàng dần dần thu hẹp lại. Giao dịch vàng trên thị trường không còn sôi động như trước dẫn đến nhiều người không mặn mà với việc kinh doanh vàng mà chuyển vốn đầu tư sang lĩnh vực khác, nhất là bất động sản. Đáng nói, ngay cả khi thị trường bất động sản gặp khó khăn nhưng dòng vốn này cũng không quay lại vàng. Thêm vào đó, thu nhập của người dân cũng sụt giảm khiến nhu cầu vàng bị ảnh hưởng. Không những công nhân mà cả người có nhu cầu mua vàng từ 20 - 30 cây trước đây vắng bóng. Bên cạnh đó, xu hướng thời trang liên quan đến vàng cũng đang thay đổi. Phụ nữ ngày nay đeo bộ vòng xi men lên cả chục chiếc, không như trước đây chỉ 5 - 7 vòng, thế nhưng số lượng người đeo ngày càng ít đi. Trong khi đó, giới trẻ có xu hướng đeo nữ trang vàng 12K thay vì 18K như trước.</p>
                <p>Đặc biệt, theo ông Trần Thanh Hải, giá vàng trong nước cứ "lì ra", không tăng giảm theo giá thế giới cũng ảnh hưởng đến nhu cầu vì thị trường thiếu sự thanh khoản. Đơn cử trong vài tuần trở lại đây, giá vàng thế giới biến động trong biên độ rộng, tăng giảm từ 100 - 150 USD/ounce nhưng vàng miếng SJC chỉ dao động quanh mức 67 triệu đồng/lượng khiến giới đầu tư, đầu cơ mất lửa tham gia mua bán. Từ nay đến cuối năm, có nhiều thông tin trên thị trường sẽ khiến giá biến động bất thường. Chẳng hạn cuộc đua bầu cử tổng thống Mỹ, ứng cử viên thuộc đảng Dân chủ hay Cộng hòa sẽ có chính sách tài khóa rất khác nhau, điều này sẽ tác động đến sự đi lên hay xuống của kim loại quý. Đó là chưa kể vàng chịu những bất lợi từ lợi suất trái phiếu kho bạc Mỹ tăng giảm như thế nào trong thời gian tới. Trước biến động của giá vàng, những người muốn đầu tư vào kim loại quý muốn tham gia nhưng trong nước không biến động thì ai cũng nản.</p>
                <p>Dù vậy, trong một cuộc trao đổi với báo chí gần đây, ông Shaokai Fan, Giám đốc điều hành mới khu vực châu Á - Thái Bình Dương kiêm Giám đốc toàn cầu về Ngân hàng Trung ương của WGC, vẫn bày tỏ sự tin tưởng vào tình yêu vàng của người Việt: "Trong bối cảnh lạm phát toàn cầu và suy thoái kinh tế, các nhà đầu tư VN vẫn tin tưởng vào vàng như một biện pháp tin cậy chống lạm phát. Người Việt luôn ưu ái vàng như một cách bảo vệ khỏi những rủi ro. Vì vậy, trong tình hình hiện tại, rất có khả năng rằng những yếu tố này vẫn tiếp tục thúc đẩy nhà đầu tư VN chú trọng đến vàng".</p>`,
                abstract: "TP.HCM là một trong những điểm tiêu thụ vàng nhiều nhất trên cả nước và cũng là nơi quy tụ nhiều đơn vị kinh doanh vàng. Thế nhưng giao dịch vàng ngày càng trở nên trầm lắng.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-17-tiny.png?alt=media&token=641afa38-934a-499b-bb19-92ab452377b6",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-17-tiny.png?alt=media&token=641afa38-934a-499b-bb19-92ab452377b6",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 2,
                categoryId: 9,
            },
            {
                title: "Lãi suất tiền đồng liên tục giảm",
                content: `<p>Ngày 8.6, Ngân hàng TMCP Bản Việt giảm lãi suất huy động tiền đồng khoảng 0,2%/năm. Lãi suất huy động từ 1 - 5 tháng từ 4,5 - 5%/năm; từ 6 tháng trở lên còn 7,1 - 7,9%/năm. Ngân hàng TMCP Sài Gòn (SCB) giảm lãi suất huy động tiền đồng kỳ hạn 1 - 5 tháng dao động từ 5%/năm; 6 tháng còn 7,35%; 7 tháng trở lên dao động từ 7,15 - 7,45%. Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank) huy động tiết kiệm tiền đồng từ 1 - 5 tháng ở mức 5%/năm, từ 6 tháng trở lên còn 7,15%. Ngân hàng TMCP Phương Đông (OCB) giảm lãi suất 0,2%/năm, theo đó lãi suất kỳ hạn 6 tháng còn 7,8%/năm, 12 tháng còn 7,9%, 36 tháng còn 7,7%… Lãi suất huy động tiền đồng trên thị trường liên tục giảm những ngày qua, mức 8%/năm xuất hiện rải rác ở một số ngân hàng.</p>
                <p>Trên thị trường liên ngân hàng, lãi suất tiền đồng giao dịch giữa các nhà băng tăng giảm mạnh từ 0,5 -1%/năm tuỳ theo kỳ hạn. Cụ thể, lãi suất tiền đồng kỳ hạn qua đêm ngày 8.6 xuống còn 3,09%/năm, 1 tuần còn 3,29%, 2 tuần còn 3,53%, 1 tháng xuống còn 4,21%, 3 tháng xuống 5,3% và mức lãi suất cao nhất trên thị trường này là 12 tháng ở 7,5%.</p>
                <p>Công ty CP chứng khoán VnDirect kỳ vọng lãi suất tiền gửi kỳ hạn 12 tháng bình quân sẽ giảm về mức 6,5 - 6,7%/năm vào cuối năm 2023. Nguyên nhân do nhu cầu tín dụng giảm do tăng trưởng kinh tế giảm tốc và thị trường bất động sản ảm đạm; Chính phủ thúc đẩy đầu tư công qua đó bơm thêm tiền vào nền kinh tế và vẫn còn dư địa giảm thêm lãi suất điều hành vào cuối năm 2023.</p>`,
                abstract: "Một số ngân hàng vừa tiếp tục giảm thêm lãi suất huy động tiền đồng từ 0,2 - 0,4%/năm so với tháng 5. Mức lãi suất 8%/năm chỉ còn xuất hiện ở một số nhà băng.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-18-tiny.jpeg?alt=media&token=972b930d-1cd0-4716-9f3e-0429ceaf4406",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-18-tiny.jpeg?alt=media&token=972b930d-1cd0-4716-9f3e-0429ceaf4406",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 3,
                categoryId: 9,
            },
            {
                title: "Giao dịch cổ phiếu giảm, HOSE vẫn đạt lợi nhuận gần 2.000 tỉ đồng",
                content: `<p>Theo báo cáo thường niên năm 2022 vừa công bố, Sở Giao dịch Chứng khoán TP.HCM (HOSE) ghi nhận tổng doanh thu đạt trên 2.508 tỉ đồng, giảm gần 729 tỉ đồng, tương ứng giảm 23% so với năm 2021. Tổng chi phí năm 2022 là 562 tỉ đồng, giảm 20% so với năm 2021. Kết quả, HOSE đạt lợi nhuận trước thuế gần 1.946 tỉ đồng, giảm 23% so với mức lãi kỷ lục 2.536 tỉ đồng của năm 2021.</p>
                <p>Doanh thu năm vừa qua của HOSE sụt giảm chủ yếu do giảm doanh thu từ hoạt động giao dịch chứng khoán trong khi hoạt động cung cấp dịch vụ vẫn tăng gần 11% so với năm 2021. Khối lượng giao dịch chứng khoán bình quân trong năm 2022 giảm so với năm trước đó. Cụ thể, khối lượng bình quân đạt hơn 693,65 triệu chứng khoán/ngày, giảm 9% và giá trị giao dịch đạt gần 17.185 tỉ đồng/ngày, giảm 22% về giá trị bình quân so với năm 2021.</p>
                <p>Nhìn lại năm 2022, HOSE đánh giá đây là một năm thử thách đối với nền kinh tế Việt Nam khi chịu những tác động kép cả từ bên ngoài và bên trong đến cùng một thời điểm. Đối với thị trường chứng khoán Việt Nam, mặc dù trải qua nhiều biến động, thị trường tiếp tục giữ vững sự ổn định nhất định, vận hành an toàn và thông suốt, đa số các doanh nghiệp niêm yết đều hoạt động ổn định và có lãi, sự tham gia của các nhà đầu tư trong và ngoài nước ngày càng tăng. Hoạt động huy động vốn trên thị trường vẫn đạt mức cao với hơn 57.127 tỉ đồng, tăng 16,5% so với năm 2021.</p>`,
                abstract: "Sở Giao dịch chứng khoán TP.HCM vừa công bố báo cáo thường niên 2022 với lợi nhuận gần 2.000 tỉ đồng, giảm so với năm 2021.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-19-tiny.jpg?alt=media&token=28ad942a-542f-459b-96df-0d566e5c2712",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-19-tiny.jpg?alt=media&token=28ad942a-542f-459b-96df-0d566e5c2712",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 4,
                categoryId: 10,
            },
            {
                title: "Cổ phiếu VNG đắt nhất sàn chứng khoán thoát khỏi diện hạn chế giao dịch",
                content: `<p>Cổ phiếu của VNG (mã chứng khoán VNZ) thoát khỏi diện hạn chế giao dịch do công ty đã nộp lên Sở Giao dịch Chứng khoán Hà Nội báo cáo tài chính năm 2022 đã được kiểm toán theo quy định. Trước đó, việc chậm nộp báo cáo tài chính năm 2022 đã kiểm toán quá 45 ngày là lý do để cổ phiếu đắt nhất sàn chứng khoán này bị đưa vào diện hạn chế giao dịch từ ngày 25.5.</p>
                <p>Theo báo cáo tài chính kiểm toán 2022 đã được công bố, lợi nhuận sau thuế của VNG giảm thêm 219 tỉ đồng so với báo cáo tự lập, tương ứng, mức lỗ sau thuế cả năm 2022 của công ty lên 1.534 tỉ đồng. Giải trình của công ty cho biết, khoản lỗ sau thuế tăng lên do VNG ghi nhận thêm các khoản chi phí liên quan đến thuế, tài sản cố định vô hình và dự phòng cho các hoạt động đầu tư tài chính.</p>
                <p>Công ty cũng đã báo cáo kết quả kinh doanh quý 1/2023 với doanh thu đạt 1.853 tỉ đồng, tăng 11% so với cùng kỳ năm trước nhưng vẫn bị lỗ sau thuế 90 tỉ đồng. Khoản lỗ trong quý đầu năm nay của VNG đã thấp hơn số lỗ trên 130 tỉ đồng của cùng kỳ năm trước. Phần lớn nguyên nhân dẫn tới lỗ từ việc công ty vẫn có chi phí hoạt động lớn như chi phí tài chính 8 tỉ đồng, gồm lãi vay hơn 4,7 tỉ đồng trong khi quý 1/2022 không có; chi phí bán hàng 544 tỉ đồng và chi phí quản lý doanh nghiệp 337 tỉ đồng...</p>
                <p>Trong kỳ, VNG cũng báo cáo phần lỗ trong công ty liên kết 27,4 tỉ đồng, trong khi cùng kỳ năm trước chỉ lỗ hơn 7,6 tỉ đồng. Cụ thể, công ty chịu lỗ hơn 9 tỉ đồng khi đầu tư vào Telio - đơn vị được thành lập từ năm 2019 hoạt động trong lĩnh vực thương mại điện tử; lỗ từ công ty liên kết Funding Asia 12 tỉ đồng - có trụ sở tại Singapore... Ngoài ra, khoản lỗ từ Tiki trong 3 tháng đầu năm nay không còn ghi nhận sau khi đã báo cáo lỗ hết toàn bộ số tiền đầu tư hơn 510 tỉ đồng vào cuối năm 2022.</p>
                <p>Trên thị trường, cổ phiếu VNZ hiện đang có giá mức 771.900 đồng và vẫn đang là cổ phiếu có thị giá cao nhất sàn chứng khoán. Tuy nhiên, so với mức đỉnh đạt được vào giữa tháng 2 với hơn 1,5 triệu đồng, cổ phiếu này đã giảm gần 50%.</p>`,
                abstract: "Cổ phiếu của Công ty CP VNG được Sở Giao dịch Chứng khoán Hà Nội đưa ra khỏi diện hạn chế giao dịch từ ngày 5.6.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-20-tiny.jpg?alt=media&token=b342a0e2-c520-4b1d-ba8a-3c30317c7fc3",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-20-tiny.jpg?alt=media&token=b342a0e2-c520-4b1d-ba8a-3c30317c7fc3",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 5,
                categoryId: 10,
            },
            {
                title: "Vasta Stone hợp tác với MICHELIN Guide góp phần quảng bá ẩm thực Việt Nam",
                content: `<p>Sự hợp tác này có ý nghĩa chiến lược khi cả hai thương hiệu chia sẻ chung tầm nhìn về sự đổi mới, sáng tạo trong việc mang đến những không gian ẩm thực độc đáo - nơi tấm đá nung kết của Vasta Stone sẽ tôn vinh sự sáng tạo và tinh tế của các đầu bếp danh tiếng, để những người yêu thích ẩm thực sẽ được trải nghiệm những món ăn tuyệt vời và thưởng thức không gian sang trọng và ấm cúng, mang đậm bản sắc của văn hóa Việt Nam.</p>
                <p>Từ lâu, sao MICHELIN được biết đến là danh hiệu dành tặng cho các nhà hàng thông qua đánh giá về chất lượng. Những nhà hàng được nhận sao MICHELIN sẽ được vinh danh vào cuốn The MICHELIN Guide - cẩm nang ẩm thực hàng đầu thế giới (ra đời năm 1900). Giống như điện ảnh có giải Oscar, âm nhạc có Grammy thì ẩm thực sẽ có sự công nhận của MICHELIN Guide. Một nhà hàng có sao MICHELIN sẽ rất nổi trội cả chất lượng lẫn danh tiếng, khiến cho bất kỳ ai cũng muốn được thưởng thức.</p>
                <p>Đặt chân đến Hà Nội và TP.HCM năm 2023, MICHELIN Guide đã lựa chọn Vasta Stone để trở thành đối tác duy nhất trong lĩnh vực cung cấp đá nung kết cho nội thất căn bếp.</p>
                <p>Tự hào sản xuất tại Việt Nam, các sản phẩm Vasta Stone được sản xuất trên dây chuyền hiện đại nhất thế giới SACMI Continua+, mang đến chất lượng vượt trội, tính thẩm mỹ, độ bền cao và thân thiện với môi trường. Khả năng chống chịu thời tiết, kháng hóa chất, khả năng chống trầy xước ưu việt, cũng như không chứa silicat tránh được biến dạng và không gây ra các độc tố từ nhựa giúp cho Vasta Stone là giải pháp hoàn hảo cho bề mặt trong căn bếp, mang đến sự an toàn tuyệt đối trong việc sử dụng vật liệu này.</p>
                <p>Thực tế, các thẩm định viên của MICHELIN Guide không chỉ đánh giá chất lượng ẩm thực, mà còn xem xét và đánh giá các khía cạnh khác của nhà hàng như phong cách phục vụ và không gian. Việc MICHELIN Guide chọn Vasta Stone là đối tác chính thức chứng tỏ Vasta Stone đáp ứng những tiêu chuẩn cao nhất của họ và đáp ứng sự kỳ vọng của những người yêu thích ẩm thực, những người luôn muốn trải nghiệm những trải nghiệm tuyệt vời và tinh tế nhất trong lĩnh vực này.</p>
                <p>Để biết thêm thông tin chi tiết, vui lòng truy cập trang web chính thức của Vasta Stone tại vastastone.com hoặc theo dõi Vasta Stone LinkedIn.</p>
                <p>Vasta Stone là một thương hiệu cao cấp thuộc hệ sinh thái của Tập đoàn GELEX - Tập đoàn đầu tư hàng đầu Việt Nam. Hệ sinh thái của GELEX quy tụ nhiều thương hiệu uy tín hàng đầu như Viglacera, Cadivi, Thibidi, Khách sạn Melia Hà Nội... với sứ mệnh mang đến những sản phẩm chất lượng, sáng tạo và uy tín. Sự hợp tác này thể hiện khát vọng của Gelex trong việc hợp tác với các tập đoàn, thương hiệu toàn cầu để mở rộng thị trường, sản phẩm trong chuỗi giá trị các lĩnh vực kinh doanh cốt lõi. Đồng thời, cũng là cơ hội để quảng bá những điểm đến ẩm thực danh giá trong nước, góp phần đưa Việt Nam trở thành một điểm đến ẩm thực nổi tiếng trên thế giới.</p>`,
                abstract: "Vasta Stone, thương hiệu đá nung kết cao cấp tiên phong tại Việt Nam đã trở thành đối tác chính thức của MICHELIN Guide - cuốn cẩm nang ẩm thực lâu đời và uy tín nhất thế giới, tại Hà Nội và TP.HCM năm 2023.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-21-tiny.jpg?alt=media&token=26cc0b45-7a6c-4b00-8c6f-f76e2a5b6f5f",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-21-tiny.jpg?alt=media&token=26cc0b45-7a6c-4b00-8c6f-f76e2a5b6f5f",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 1,
                categoryId: 11,
            },
            {
                title: "Tập đoàn Mai Linh công bố chính thức cắt lỗ",
                content: `<p>Theo Báo cáo tài chính hợp nhất năm 2022, doanh thu thuần năm 2022 đạt xấp xỉ 1.647 tỉ đồng, tăng 583 tỉ đồng so với năm 2021. Lợi nhuận gộp đạt 416 tỉ đồng, tương ứng tỷ suất sinh lời gần 25%. Các khoản chi phí biến động mạnh khiến lợi nhuận sau thuế chỉ đạt 1 tỉ đồng. Tại thời điểm ngày 31.12.2022, tổng tài sản của Mai Linh đạt mốc 4.135,4 tỉ đồng, gần như không thay đổi nhiều so với đầu năm.</p>
                <p>Đại diện Mai Linh cho biết, tập đoàn đã phải "gồng mình" gánh chịu hậu quả của đại dịch Covid-19 và tác động của giá năng lượng, xăng dầu tăng cao, ảnh hưởng đến hoạt động kinh doanh của cả hệ thống trong 2 năm tài chính trước đó. Tuy nhiên, tận dụng mạng lưới vận tải phủ sóng khắp 63 tỉnh thành và các huyện đảo, Mai Linh đã triển khai các ngành nghề mới như logistics, bảo hiểm, khai thác hệ sinh thái vận tải và tiết giảm tối đa các chi phí trong công tác vận hành để khắc phục khó khăn.</p>
                <p>Trong năm 2022, Mai Linh đã đầu tư tổng cộng 749 xe, đồng thời đa dạng phương thức gọi xe và thanh toán nhằm đáp ứng nhu cầu di chuyển ngày càng tăng của khách hàng. Ngoài ứng dụng đặt xe và tổng đài gọi xe toàn quốc 1055, Mai Linh còn hợp tác với các đơn vị fintech (công nghệ tài chính) khai thác thị trường mới, tiếp cận 25 triệu người dùng ứng dụng ngân hàng và ví điện tử trong hệ sinh thái đối tác. Mai Linh đã cải tiến app và giới thiệu thẻ MPASS với tính năng trả trước, nhằm tạo điều kiện thuận lợi cho khách hàng trong việc đặt xe.</p>
                <p>Mục tiêu năm 2023, Tập đoàn Mai Linh dự kiến đầu tư khoảng 3.500 phương tiện mới, đồng thời cải thiện chất lượng dịch vụ, giữ chân khách hàng doanh nghiệp, khách hàng truyền thống; cải thiện app, ứng dụng công nghệ, tăng trải nghiệm khách hàng. Ngoài ra, các sản phẩm bảo hiểm hợp tác cùng đối tác PTI tiếp tục được đẩy mạnh; hoạt động kinh doanh Logistics tiếp tục được đầu tư; tuyến tàu cao tốc Cần Thơ - Côn Đảo hoạt động hiệu quả và được sự tin dùng của hành khách; các lĩnh vực du học, xuất khẩu lao động, thương mại được chú trọng hơn…</p>`,
                abstract: "Tại Đại hội đồng cổ đông thường niên năm 2023 diễn ra sáng nay (30.5.2023), Hội đồng quản trị Công ty cổ phần Tập đoàn Mai Linh (MLG) công bố đã cắt được lỗ, kết thúc chuỗi 4 năm liên tiếp không có lãi.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-22-tiny.png?alt=media&token=cb92bb32-f147-4474-a8c4-e407200b2a31",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-22-tiny.png?alt=media&token=cb92bb32-f147-4474-a8c4-e407200b2a31",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 2,
                categoryId: 11,
            },
            {
                title: "Bí quyết nuôi chồn hương thu tiền tỉ của nông dân miền Tây",
                content: `<h2>Cho chồn nghe nhạc trữ tình, nhạc thiền</h2>
                <p>Thăm trang trại nuôi chồn hương của ông Tuấn vào buổi sáng, chúng tôi bất ngờ vì hàng trăm con nằm im trong chuồng, vừa ngủ vừa nghe nhạc trữ tình, nhạc thiền.</p>
                <p>Lý giải về 'độc chiêu' này, ông Tuấn cho biết, trại nuôi nằm ven đường lộ, nhiều xe cộ qua lại gây nên tiếng ồn dễ làm cho chồn hoảng sợ. Từ đó, ông nghĩ ra cách cho chồn nghe nhạc trữ tình và nhạc thiền để chồn giảm bản chất hoang dã, hung dữ. </p>
                <p>"Đặc biệt, đối với chồn mẹ đang trong giai đoạn nuôi con, nếu có nhiều tiếng ồn chúng rất dễ căng thẳng, lo âu, tha con đem giấu làm trầy xước, nhiễm trùng khiến con chậm lớn. Cho chồn nghe nhạc sẽ khắc phục được tình trạng này", ông Tuấn nói thêm.</p>
                <p>Hằng ngày, ông Tuấn mở loa cho chồn nghe nhạc từ 6 giờ sáng 9 giờ đêm. Sau thời gian nghe nhạc, chồn quen với tiếng nhạc, tiếng động nên dạn người, ngủ sâu và phát triển tốt. </p>
                <p>"Chồn là loài ăn đêm, ngủ ngày nên ban ngày chúng rất cần không gian yên tĩnh để ngủ. Với cách này, tôi chỉ tốn tiền mua loa, sau đó chép nhạc vào thẻ nhớ rồi mở cho chúng nghe mỗi ngày. Nhạc trữ tình giúp chồn ngủ sâu, quên tiếng ồn, tạp âm lộn xộn ngoài đường. Còn nhạc thiền giúp chồn tĩnh tâm, giảm bớt tính hoang dã, hung dữ", ông Tuấn tiết lộ.</p>
                <h2>Hiệu quả bất ngờ</h2>
                <p>Ông Tuấn kể, trong thời gian làm công chức nhà nước, ông mua 3 con chồn hương về nuôi cho vui, giải tỏa căng thẳng sau giờ làm việc. Quá trình nuôi, thấy chồn sinh sản, mang lại hiệu quả kinh tế cao nên ông mạnh dạn đầu tư nuôi loài động vật hoang dã này.</p>
                <p>Năm 2019, ông Tuấn quyết định nghỉ việc. Tận dụng diện tích nhà còn trống, ông xây dựng chuồng trại, xin cấp giấy chứng nhận nuôi động vật hoang dã. Sau đó, ông mua 60 con chồn cái từ trại ở Bình Dương về nhân đàn. Nhờ chịu khó học hỏi, ông nhân đàn thành công và duy trì số lượng chồn tại trại gần 200 con bố, mẹ, hậu bị.</p>
                <p>Để chăn nuôi đạt hiệu quả, ông xây dựng trại trên diện tích 300m2, chia làm 4 khu nuôi dành cho chồn sinh sản, chồn hậu bị và chồn con. Đặc biệt, khu nuôi chồn sinh sản đầu tư hệ thống lồng nuôi hiện đại, quây lưới sắt, hệ thống dẫn nước uống trực tiếp đến từng chuồng. Chất thải của chồn được xịt rửa mỗi ngày và dẫn trực tiếp xuống hầm biogas để giảm thiểu tối đa mùi hôi thối…</p>
                <p>Đặc tính của chồn hoang dã, ăn tạp nên dễ nuôi, ít bị bệnh, ít tốn công chăm sóc. Thức ăn chủ yếu là chuối, mít, cá da trơn, đầu chuột… nên mỗi con chồn chỉ tốn khoảng 2.000 - 3.000 đồng thức ăn mỗi ngày. "Chồn thích ăn chuối, nhưng chuối chín độ ngọt nhiều, ăn nhiều sẽ chuyển hóa thành đường làm chồn bị béo phì. Vậy nên, chồn từ 6 tháng trở đi, tôi chủ yếu cho ăn cá sống, đầu chuột qua sơ chế", anh Tuấn cho biết.</p>
                <p>Chồn nuôi khoảng 9 tháng có thể sinh sản. Tuy nhiên, ông Tuấn thường bỏ 3 lần chồn lên giống để khả năng sinh sản đạt kết quả tốt hơn. Mỗi năm, chồn đẻ 3 lứa, mỗi lứa 2 - 5 con. </p>
                <p>Mỗi năm, ông Tuấn xuất bán hàng trăm con chồn giống với giá 10 triệu đồng/cặp (đực 4 triệu, cái 6 triệu đồng/con). Nhờ đó, ông có thu nhập hơn 1 tỉ đồng/năm.</p>
                <p> "Nuôi chồn hương chi phí thấp. Chúng vừa ăn ít lại ăn được thức ăn mà người dân dễ tìm kiếm. Nếu nhà nào có vườn, gần mương hay kênh, rạch đều có thể tự trồng chuối và đánh bắt cá tạp cho chồn ăn mà hoàn toàn không tốn một chi phí nào", ông Tuấn chia sẻ.</p>
                <p>Bà Nguyễn Thị Phương Lan, Phó trưởng Trạm khuyến nông Q.Bình Thủy, nhận xét mô hình nuôi chồn hương của ông Tuấn cho hiệu quả kinh tế cao. Từ việc xây dựng chuồng trại bài bản, cách nuôi giúp chồn phát triển tốt. Đây là mô hình có thể nhân rộng để người dân chuyển đổi phát triển kinh tế.</p>`,
                abstract: "Sở hữu trại nuôi chồn hương gần 200 con, ông Phạm Văn Tuấn (45 tuổi, ngụ Q.Bình Thủy, TP.Cần Thơ) thu nhập trên 1 tỉ đồng mỗi năm.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-23-tiny.jpg?alt=media&token=02c5ad79-d660-4e19-ab11-269dff011ad2",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-23-tiny.jpg?alt=media&token=02c5ad79-d660-4e19-ab11-269dff011ad2",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 3,
                categoryId: 12,
            },
            {
                title: " Trồng dâu tây 'bằng smartphone' thu nhập tiền tỉ ",
                content: `<p>Trước đây, sau khi tan sở, vợ chồng anh Nam lại phải tất bật về tưới nước, bón phân cho vườn cà rốt, khoai tây của gia đình ở xã Xuân Thọ. Khi ngành hoa phát triển, họ chuyển đổi sang canh tác hoa trong nhà kính để có thu nhập cao hơn. Từ cuối năm 2018, trang trại trồng hoa của anh chị bắt đầu chuyển sang trồng dâu tây theo công nghệ Internet vạn vật (Internet of Things - IoT) để giảm bớt nhân công, vật tư, giảm bớt thời gian hiện diện tại trang trại, nhưng mang lại hiệu quả kinh tế cao hơn nhiều lần.</p>
                <p>Anh Nam kể anh biết đến IoT cũng là một cơ duyên. Đầu năm 2018, trong một lần được qua Nhật Bản học tập, nghiên cứu ngắn hạn ngay tại vùng chuyên canh tác dâu tây tự động bằng công nghệ IoT, anh nhận thấy ở Đà Lạt có rất nhiều lợi thế để trồng dâu tây nhưng chưa được tận dụng hết. Anh Nam thuyết phục vợ chuyển đổi 2.000 m2 vườn nhà sang trồng dâu tây theo công nghệ hiện đại này. “Sau khi được bà xã “duyệt”, tôi đi tìm mua thiết bị IoT, tìm mua giống dâu nhập từ Nhật, rồi viết phần mềm chăm sóc dâu tây hoàn toàn tự động. Sau đó, thuê một đơn vị lập trình, viết app trên điện thoại để phù hợp với cây dâu tây và hoàn thiện cho toàn hệ thống”, anh Nam hào hứng kể.</p>
                <p>Sau 3 tháng canh tác theo công nghệ IoT, vụ dâu tây đầu tiên cho thu hoạch rất khả quan. Nhờ dâu có chất lượng cao, đẹp mắt nên thu hoạch tới đâu bán hết tới đó. Hiệu quả từ canh tác dâu tây theo công nghệ IoT thấy rõ, nên đến nay trang trại trồng hoa rộng 2 ha của gia đình anh chị đã chuyển hoàn toàn sang canh tác dâu tây.</p>
                <p>Dù trồng tới 2 ha dâu tây nhưng vợ chồng chủ nhân không cần có mặt tại vườn mà vẫn biết dâu của mình phát triển thế nào. Anh Nam chia sẻ thêm trang trại được chia thành nhiều khu vực để quản lý. Chẳng hạn, khu vực 1 cây dâu bị thiếu nước hoặc độ ẩm cao thì con chíp lắp tại các điểm đặt thiết bị cảm biến sẽ báo về bộ máy chủ. Từ đó, máy chủ sẽ tự động kích hoạt hệ thống tưới cho khu vực thiếu nước.</p>
                <p>Với những trường hợp bất thường như thời tiết quá nóng, buổi sáng có sương muối, lượng phân bón thiếu hụt... thì hệ thống cảnh báo sẽ phát tín hiệu ngay vào điện thoại của chủ vườn để kịp thời xử lý. Nhờ vậy, trang trại chỉ cần sử dụng 14 lao động để hằng ngày thu hoạch dâu, đóng hộp xuất bán và mỗi tháng một lần tỉa bớt lá dâu để trái phát triển.</p>
                <p>Theo chia sẻ của anh Nam, vốn đầu tư cho trang trại dâu IoT khá cao, ngoài thiết bị IoT còn phải đầu tư nhà kính, giàn sắt đựng giá thể trồng dâu cao 1,2 m, hệ thống tưới nước, bón phân tự động…trung bình chi phí khoảng 6 tỉ đồng/ha, nhưng có thể sử dụng suốt 5 năm. Quá trình canh tác tiết kiệm 30% lượng nước, phân bón, các chỉ số EC, PH đầu vào, đầu ra chính xác đến 95%.</p>
                <p>Theo chủ vườn, dâu tây cho thu hoạch quanh năm, những tháng thấp điểm thu được khoảng 80 kg/ngày/ha, vào mùa rộ thu trên 150 kg/ngày/ha. Tính trung bình năng suất đạt khoảng 36 tấn/ha/năm. Dâu tây được đóng trong 2 loại hộp 0,25 kg hoặc 0,5 kg với thương hiệu “Nam Anh” để xuất bán đến các siêu thị ở TP.HCM, miền Tây, Đà Nẵng, Bình Dương, Tây Ninh... Sản phẩm đạt chứng nhận VietGap, Ocop, được sử dụng nhãn hiệu chứng nhận “Dâu tây Đà Lạt”.</p>
                <p>Hiện giá bán dâu từ 250.000 - 500.000 đồng/kg, tùy kích cỡ trái. Với 1 ha dâu tây canh tác theo công nghệ IoT, gia đình anh Nam có thu nhập trên dưới 10 tỉ đồng/năm.</p>`,
                abstract: "Xuất thân từ gia đình có truyền thống làm nông, dù đang là công chức nhưng vợ chồng anh chị Trần Đức Nam (44 tuổi) và Đặng Thu Hiền (38 tuổi) vẫn không thể buông bỏ khu vườn đất đỏ bazan phì nhiêu ở thôn Lộc Quý, xã Xuân Thọ (Đà Lạt, Lâm Đồng) mà người thân đã canh tác hàng chục năm qua.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-24-tiny.jpg?alt=media&token=c9982676-a289-4b94-b22f-4545fd6369a9",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-24-tiny.jpg?alt=media&token=c9982676-a289-4b94-b22f-4545fd6369a9",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 4,
                categoryId: 12,
            },
            {
                title: " Tra cứu, đặt vắc xin mọi lúc mọi nơi với Mobile App VNVC ",
                content: `<p>Từ hôm nay (5.6), ứng dụng "trợ lý tiêm chủng" - Mobile app VNVC chính thức có mặt trên cả hai nền tảng iOS và Android. Người dùng dễ dàng tải về, cài đặt và sử dụng trên thiết bị di động từ kho ứng dụng có sẵn trên Google Play và App Store.</p>
                <p>Sự kiện ra mắt Ứng dụng Mobile App VNVC nằm trong chuỗi chương trình "Hành động vì cộng đồng được bảo vệ bởi vắc xin" của Hệ thống tiêm chủng VNVC, bao gồm nhiều hoạt động giúp nâng cao nhận thức về vai trò của vắc xin và tiêm chủng để chủ động bảo vệ sức khỏe trước những dịch bệnh nguy hiểm, đồng thời giúp người dân dễ dàng tiếp cận với dịch vụ tiêm chủng vắc xin an toàn, chất lượng với chi phí hợp lý. VNVC cũng dành tặng hàng trăm nghìn mũi tiêm vắc xin Cúm miễn phí cho cộng đồng nhằm đưa tỷ lệ người dân Việt Nam được bảo vệ trước bệnh cúm nguy hiểm từ 4% lên 10% vào cuối năm 2025.</p>
                <h2>"Trợ lý tiêm chủng" cho mọi nhà</h2>
                <p>Chỉ với vài thao tác đơn giản, người dùng có thể hoàn tất việc đăng ký để trải nghiệm các tính năng trên app như: tra cứu lịch sử tiêm chủng, xem danh mục vắc xin cần thiết, đặt mua vắc xin ngay trên app, xem các mũi vắc xin đề xuất cho bản thân, đọc tin tức mới về vắc xin, nhận thông báo ưu đãi vắc xin…</p>
                <p>Đặc biệt, đây là ứng dụng tiêm chủng vắc xin hiếm hoi tại Việt Nam cung cấp toàn diện các tính năng quan trọng nhằm theo dõi và tra cứu thông tin tiêm chủng trọn đời.</p>
                <p>Lần đầu tiên tải app VNVC về sử dụng, chị N.N. Sương (30 tuổi, ngụ quận 3) cho biết rất bất ngờ khi lịch sử tiêm chủng từ 5 năm trước của chị vẫn còn được lưu rất chi tiết trên app.</p>
                <p>"Dựa trên lịch sử tiêm chủng và vắc xin đề xuất cho mỗi cá nhân, tôi và người thân dễ dàng chọn loại vắc xin để tiêm và tiêm nhắc, phòng ngừa bệnh tật. Thời gian gần đây, nghe thông tin nhiều loại vắc xin khan hiếm, tôi sẽ sử dụng tiện ích đặt mua vắc xin để giữ các loại vắc xin cần thiết cho bản thân và gia đình. Không chỉ thế trên app này mình có thể tra cứu các sản phẩm vắc xin để biết còn hay hết khỏi mất công đến trung tâm", chị Sương chia sẻ.</p>
                <h2>App VNVC nhắc lịch tiêm, hạn chế bỏ lỡ vắc xin quan trọng</h2>
                <p>Bà Vũ Thị Thu Hà, Giám đốc Cung ứng Hệ thống tiêm chủng VNVC cho biết, sau đại dịch, nhận thức về vai trò quan trọng của vắc xin đối với sức khỏe, tính mạng của trẻ em và người lớn tăng lên đáng kể. Bởi, người dân thấy được ý nghĩa của việc phòng bệnh dịch nguy hiểm nhờ vắc xin vừa đơn giản, hiệu quả, an toàn và ít chi phí so với điều trị bệnh. Do đó tỷ lệ trẻ em và người lớn chủ động đến các trung tâm VNVC tiêm chủng đầy đủ, đúng lịch đã gia tăng.</p>
                <p>Các chuyên gia khuyến cáo trong bất cứ trường hợp nào, trẻ em và người lớn cũng không nên trì hoãn hoặc chờ đợi vắc xin. Tiêm vắc xin đầy đủ, đúng lịch mới phát huy tối đa hiệu quả bảo vệ, phòng ngừa bệnh tật, nâng cao chất lượng cuộc sống.</p>
                <p>BS.CKI Bạch Thị Chính, Giám đốc Y khoa, Hệ thống tiêm chủng VNVC cho biết nhiều bệnh truyền nhiễm như sởi, viêm gan B, bạch hầu, ho gà, uốn ván, viêm màng não mủ do vi khuẩn Hib, bại liệt… vẫn chưa được loại trừ hoàn toàn, có thể lây nhiễm cho trẻ bất cứ lúc nào do vậy cần phải tiêm chủng ngay khi đến lịch.</p>
                <p>Theo bác sĩ Chính, trước tình hình vắc xin 5 trong 1 khan hiếm như hiện nay, phụ huynh có thể chuyển đổi sang vắc xin 6 trong 1 để đảm bảo lịch tiêm cho trẻ.</p>
                <p>"Nếu tiêm vắc xin 6 trong 1, bố mẹ không cần phải bổ sung thêm mũi vắc xin bại liệt hoặc viêm gan B tùy theo loại vắc xin như tiêm 5 trong 1", BS Chính nói.</p>
                <p>Theo ước tính của Quỹ Nhi đồng Liên hợp quốc UNICEF, tiêm chủng là một hoạt động đầu tư tài chính khôn ngoan vì chi phí khám và điều trị bệnh tốn kém gấp 16 lần chi phí tiêm vắc xin phòng bệnh. Chẳng hạn mỗi 100 USD (khoảng 2,5 triệu đồng) đầu tư vào chích ngừa giúp tiết kiệm 1.600 USD (khoảng 40 triệu đồng) chi phí khám và điều trị bệnh.</p>
                <p>Trong bối cảnh nhiều nơi thiếu vắc xin và nhiều bệnh dịch bắt đầu mùa cao điểm, giờ đây với sự hỗ trợ của Mobile App VNVC, người dùng dễ dàng quản lý trọn vẹn các thông tin về vắc xin, lịch tiêm, mũi tiêm và phác đồ khi thực hiện dịch vụ. Tính năng nhắc hẹn tích hợp trong ứng dụng giúp người dùng lưu ý lịch tiêm nhắc lại đúng lịch, nâng cao hiệu quả bảo vệ sức khỏe.</p>`,
                abstract: " Người dùng ứng dụng Mobile App VNVC thích thú khi dễ dàng tra cứu và quản lý lịch sử tiêm chủng trọn đời, đặt mua vắc xin online, tham khảo danh mục vắc xin đề xuất cho mỗi người… ngay trên app. ",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-25-tiny.jpg?alt=media&token=4f75ef64-c65d-41b3-a119-cbc564b1396b",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-25-tiny.jpg?alt=media&token=4f75ef64-c65d-41b3-a119-cbc564b1396b",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 5,
                categoryId: 13,
            },
            {
                title: " Vì sao giới trẻ ngày càng đề cao việc 'ăn khỏe' hơn là 'ăn ngon'? ",
                content: `<h2>Ăn không còn chỉ để 'ngon miệng' và 'no bụng'</h2>
                <p>Sự bùng nổ của công nghệ ngày nay dễ dàng cho phép thế hệ trẻ cập nhật các thông tin mới, đồng thời có đủ công cụ để lan tỏa những giá trị cũng như kiến thức đến cho cộng đồng. Những xu hướng của giới trẻ không chỉ dừng ở mức giải trí, mà còn thể hiện tư duy về lối sống cá nhân, đặc biệt là những lối sống mang lại sự lành mạnh và cân bằng cho các bạn trẻ về mặt thể chất lẫn tinh thần. Có thể kể đến các phương pháp chăm sóc sức khỏe như chế độ ngủ nghỉ khoa học, hoạt động thể lực, giải trí, tránh xa thuốc lá, hạn chế đồ uống có cồn và đặc biệt quan trọng là dinh dưỡng hợp lý. Trong đó "ẩm thực khoa học" đã trở thành một trong những xu hướng nổi trội và được các bạn trẻ quan tâm.</p>
                <p>Thay vì lựa chọn những món ăn ngon nhưng lại chứa các chất gây hại cho sức khoẻ, nhiều bạn trẻ đã bắt đầu quan tâm đến chế độ ăn uống lành mạnh hơn với mong muốn tăng cường, nâng cao sức khoẻ để tiếp tục với các mục tiêu cá nhân, hướng đến một cuộc sống cân bằng cả về thể chất và tinh thần giữa nhịp sống nhanh vội, bận rộn của việc học, việc làm. Gần đây, một phương pháp sử dụng thực phẩm vào chế độ ăn đang rộ lên trong giới trẻ là cắt giảm lượng đường trong thực đơn hàng ngày nhằm mang lại nhiều lợi ích cho sức khỏe.</p>
                <p>Theo tạp chí uy tín thế giới về y học thuộc nhà xuất bản học thuật Elsevier, chế độ ăn giảm đường đã xuất hiện từ lâu, cho đến nay vẫn được khẳng định là một phương pháp hiệu quả trong việc chăm sóc cho sức khỏe. Theo một khuyến nghị được đưa ra bởi Tổ chức Y tế thế giới (WHO), cần đảm bảo khẩu phần hằng ngày có < 10% tổng năng lượng dung nạp đến từ đường, sẽ giúp sẽ giúp giảm nguy cơ thừa cân, béo phì và phòng ngừa một số bệnh mạn tính. Nhiều người nổi tiếng khắp thế giới cũng là "fan cứng" của chế độ ăn ít đường như ngôi sao Hollywood Jennifer Aniston, diễn viên - doanh nhân Gwyneth Paltrow, cầu thủ bóng đá nổi tiếng Tom Brady... Họ thường xuyên chia sẻ về phương pháp ăn uống khoa học, hạn chế lượng đường đưa vào, tăng cường các chất dinh dưỡng có lợi khác như chất xơ, axit amin, chất khoáng… trên Instagram, tiếp thêm động lực cho giới trẻ từ bỏ niềm đam mê với đồ ngọt. </p>
                <p>Vậy điều gì sẽ xảy ra khi chúng ta cắt giảm đường trong cơ thể? Theo một chuyên trang về sức khỏe và lối sống lành mạnh "Health" của Hoa Kỳ, dưới đây là một số lợi ích bạn sẽ cảm nhận được sau một thời gian áp dụng theo chế độ ăn này:</p>
                <ul>
                <li>Kiểm soát cân nặng của cơ thể.</li>
                <li>Làn da sạch mụn hơn, làm chậm quá trình lão hóa da.</li>
                <li>Giảm lượng chất béo xấu trong cơ thể.</li>
                <li>Răng chắc khỏe hơn.</li>
                <li>Giảm nguy cơ mắc các bệnh liên quan đến huyết áp, tim mạch, tiểu đường, bệnh gan...
                </ul>
                <h2>Thay đổi lớn bắt đầu từ thói quen nhỏ hằng ngày</h2>
                <p>Sự thật là bạn không thể cắt giảm lượng đường chỉ sau một đêm, bạn nên để cho cơ thể thích nghi với thói quen tuy nhỏ nhưng có tính lâu dài. Hãy thử một vài gợi ý dưới đây để việc giảm đường trở nên dễ dàng hơn:</p>
                <ol>
                <li>Đọc kỹ thành phần trên bao bì để kiểm tra hàm lượng đường có trong sản phẩm, ưu tiên chọn những sản phẩm có lượng đường thấp hơn.</li>
                <li>Kiểm soát cảm xúc tiêu cực và stress: Thỉnh thoảng, cảm xúc tiêu cực và stress có thể dẫn đến việc sử dụng đường nhiều hơn. Hãy tìm hiểu và áp dụng các phương pháp điều hòa cảm xúc và stress như tập thể dục, hoặc tham gia hoạt động giải trí để giữ một tinh thần thoải mái.</li>
                <li>Tìm kiếm các thực phẩm thay thế: Thay vì ăn bánh mì trắng hoặc thực phẩm chứa nhiều tinh bột, bạn có thể thưởng thức bánh mì nguyên hạt giàu chất xơ và ít đường. Nên ăn các loại trái cây và rau củ tươi thay cho đồ ăn vặt có đường như dứa, dưa hấu, dâu tây và việt quất, không chỉ có hương vị thơm ngon mà còn cung cấp nhiều vitamin và chất chống oxy hóa.</li>
                <li>Thay thế đường bằng các nguyên liệu tự nhiên như hoa quả tươi, hoặc gia vị như vani để thêm hương vị ngọt vào món ăn mà không cần dùng đường.</li>
                <li>Hạn chế nước ngọt, nước giải khát, và đồ uống có gas thường chứa lượng đường cao</li>
                <li>"Khống chế" cơn đói bụng và cảm giác thèm ăn đồ ngọt bằng những món ăn có hàm lượng protein cao nhưng hàm lượng đường ít. Ví dụ như sữa chua ít đường - món ăn lý tưởng giúp giảm cân, làm đẹp da, cung cấp protein,... Khi kết hợp sữa chua ít đường cùng với hoa quả như chuối, táo, ngũ cốc, hoặc bột protein, ta có ngay một món ăn nhanh gọn và nhiều năng lượng cho bữa sáng, ăn xế/ăn khuya hoặc trước các buổi tập luyện thể thao.</li>
                </ol>
                <p>Nếu biến những thói quen trên thành hành động, tích cực chăm sóc sức khỏe và làm đẹp bằng cách ăn uống lành mạnh, giảm thiểu đường, bạn sẽ không những khỏe mạnh và tự tin hơn, mà còn tận hưởng cuộc sống hạnh phúc, trọn vẹn hơn.</p>`,
                abstract: " Theo báo cáo của Decision Lab 06.2022, có đến 64,3% người thuộc thế hệ Z (sinh sau 1995) và 71,6% người thuộc thế hệ Y (sinh sau 1980) lựa chọn ăn uống lành mạnh vì những lợi ích sức khỏe lâu dài và cải thiện sức khỏe tinh thần. Những con số này cho thấy rằng người tiêu dùng trẻ càng ngày càng chú trọng nhiều hơn trong việc lựa chọn những thực phẩm để dung nạp vào cơ thể. ",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-26-tiny.jpeg?alt=media&token=24d76944-d82b-4bd1-85bb-dbc294ce6cd7",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-26-tiny.jpeg?alt=media&token=24d76944-d82b-4bd1-85bb-dbc294ce6cd7",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 1,
                categoryId: 13,
            },
            {
                title: " Làm sao để cải thiện thâm quầng mắt cho đôi mắt tươi trẻ va tinh anh? ",
                content: `<p>Hãy cùng chuyên gia tìm hiểu ngay trong bài viết dưới đây để tìm ra giải pháp đánh bay quầng thâm cho làn đôi mắt tươi trẻ và thăng hạng thần thái. </p>
                <h2>Thâm quầng mắt là gì? </h2>
                <p>Bạn có biết, vùng da dưới mắt là mỏng manh và dễ nhảy cảm nhất trên cơ thể hay không. Cũng chính vì thế mà nó dễ bị tác động đầu tiên bởi các yếu tố khác và trong đó có tình trạng thâm quầng mắt. </p>
                <p>Mắt bị thâm quầng là vùng da dưới mắt bị đậm màu sau những đêm thức khuya, ngủ ít hay sinh hoạt không điều độ. Một số người thâm quầng mắt chỉ thoáng qua và có thể tự hết sau một vài ngày. Còn với một số trường hợp, thâm mắt rất sẫm màu và tồn tại lâu ngày. Nếu không có biện pháp cải thiện mà cứ để tình trạng quầng thâm mắt kéo dài không chỉ ảnh hưởng đến thẩm mỹ mà còn gây ra những hệ lụy về tâm lý. </p>
                <h2>Nguyên nhân nào gây thâm quầng khiến đôi mắt già nua và mệt mỏi? </h2>
                <p>Bạn muốn đánh bay quầng thâm lấy lại đôi mắt sáng ngời, tinh anh thì nhất định phải hiểu rõ nguyên nhân gây ra. Vậy cùng tìm hiểu xem những nguyên nhân nào dưới đây đang khiến bạn có đôi mắt gấu trúc nhé!</p>
                <ul>
                <li>Do yếu tố di truyền: Một trong những nguyên nhân gây quầng thâm mắt là do di truyền. Theo các chuyên gia da liễu, phần da ở quanh mắt mỏng hơn bình thường nên khi máu hoạt động qua các tĩnh mạch cũng dễ gây nên tình trạng sậm màu hơn. Và người nào đó có nhiều tĩnh mạch tập trung ở vùng da mắt sẽ dễ bị thâm quầng mắt hơn. </li>
                <li>Thiếu ngủ, thức khuya: Nếu bạn thiếu ngủ hay thức khuya thường xuyên sẽ khiến cơ thể thiếu sức sống, trong rất mệt mỏi và làn da xanh xao hơn. Cũng chính điều đó mà các mao mạch vùng da dưới mắt sẽ hiện rõ hơn và xuất hiện quầng thâm. Đồng thời, lượng nước cũng tích tụ ngày càng nhiều hơn. Chỉ sau một thời gian nếu không cải thiện sẽ dẫn đến bọng mắt. Thiếu ngủ hay thức khuya chính là nguyên nhân gây quầng thâm phổ biến, nhất là ở giới trẻ. Bên cạnh đó, sử dụng các thiết bị điện tử thường xuyên cũng khiến đôi mắt nhanh mỏi mệt và có thể làm mao mạch xung quanh mắt dần giãn ra.</li>
                <li>Lão hóa do tuổi tác: Vùng da quanh mắt đã mỏng hơn so với các trị trí khác trên cơ thể. Theo quy luật tự nhiên, càng lớn tuổi da càng mỏng đi và vùng da dưới mắt sẽ xuất hiện các mao mạch rõ rệt hơn. Vậy là quầng thâm mắt cũng biểu hiện ngày càng rõ nét.</li>
                <li>Nguyên nhân gây thâm quầng mắt do bệnh lý: Một số loại bệnh có thể gây nên thâm mắt và tiêu biểu chính là viêm mũi dị ứng. Bởi khi bị viêm mũi dị ứng, tuần hoàn ở vùng mũi và mắt hoạt động kém hiệu quả hơn. Dẫn đến máu bị ứ lại và có thể khiến vùng da quanh mắt trở nên tối màu hơn. </li>
                </ul>
                <p>Bên cạnh đó, một số bệnh như hen suyễn, dị ứng, hen suyễn, chàm… cũng có thể là nguyên nhân khiến thâm quầng mắt xuất hiện. Trong thời gian phụ nữ mang thai hay ngày đèn đỏ cũng khiến nội tiết tố thay đổi và làn da trở nên xanh xao hơn. Theo đó, các mao mạch quanh mắt cũng hiện rõ và gây nên thâm quầng mắt.</p>
                <h2>Chuyên gia gợi ý cách cải thiện quầng thâm cho đôi mắt tươi trẻ và tràn đầy sức sống</h2>
                <p>Bạn muốn thoát khỏi "đôi mắt gấu trúc" nhanh chóng thì đừng quên áp dụng ngay các cách đánh bay thâm quầng mắt hiệu quả dưới đây. Đôi mắt tươi sáng và thần sắc rạng rỡ sẽ sớm trở lại.</p>
                <h4>Làm mờ quầng thâm nhờ các nguyên liệu thiên nhiên</h4>
                <p>Thâm quầng mắt sẽ được đẩy lùi với một số nguyên liệu thiên nhiên dưới đây. Nhưng các bạn nên nhớ chỉ phù hợp với tình trạng thâm quầng mắt mức độ nhẹ. Có thể đắp túi trà lên mắt vì nó chứa caffeine và một số chất chống oxy hóa giúp thúc đẩy lưu thông máu, ngăn ngừa tích nước dưới da. Bạn chỉ ngâm túi trà lọc với nước nóng khoảng 5 phút rồi để vào tủ lạnh từ 15 - 20 phút. Sau đó, bạn đắp túi trà lạnh lên mắt khoảng 10 - 20 phút và rửa bằng nước sạch.</p>
                <p>Một cách khác là bạn có thể chườm lạnh cho đôi mắt giúp giảm sưng bong mắt và loại bỏ quầng thâm hiệu quả. Hoặc đắp mặt nạ dưa chuột với hàm lượng vitamin K cao có tác dụng giảm thâm quầng và bọng mắt. </p>
                <h4>Xây dựng chế độ ăn uống và nghỉ ngơi hợp lý</h4>
                <p>Không chỉ tác động từ bên ngoài mà xây dựng chế độ ăn uống lành mạnh, lối sống khoa học cũng giúp ngăn ngừa và giảm thâm quầng mắt hiệu quả. Vậy hãy áp dụng ngay theo các gợi ý dưới đây nhé!</p>
                <p>Uống đủ nước là điều đầu tiên bạn cần phải nhớ giúp ngăn ngừa và đánh bay thâm quầng mắt hiệu quả. Khi cơ thể đủ nước và vùng da quanh mắt cũng duy trì được lượng nước cần thiết ngăn ngừa hình thành bọng mắt cùng quầng thâm. Do đó, bạn cần uống đủ 2 lít nước mỗi ngày. </p>
                <p>Bổ sung vitamin C cho cơ thể với các loại trái cây như ổi, cam, chanh, dứa, cải xoăn, quả mọng, súp lơ, bông cải xanh, cà chua, xoài, đu đủ… cũng giúp ngăn ngừa và cải thiện quầng thâm mắt hiệu quả. Bên cạnh đó, bạn đừng quên dung nạp cho cơ thể thực phẩm giàu chất sắt như thịt bò, thịt gia cầm… Bởi khi cơ thể thiếu hụt sắt sẽ phá vỡ hemoglobin trong máu và thiếu oxy khiến vết thâm xuất hiện rõ ràng hơn. </p>
                <p>Hạn chế uống nước ngọt hay các loại thực phẩm chế biến công nghiệp, đồ ăn mặn. Ngủ đủ giấc và ngủ từ 10h đêm. Chú ý, khi ngủ nên kê gối cao để ngăn ngừa sự tích tụ chất lỏng có thể khiến mắt sưng và thâm quầng. </p>
                <p>Các bạn cũng đừng quên đi thăm khám thường xuyên tại phòng khám chuyên khoa mắt để sớm phát hiện các bệnh liên quan về mắt. Kết hợp với việc khám sức khỏe tổng quát để nếu nghi ngờ một số bệnh lý gây thâm quầng mắt. </p>
                <p>Cải thiện quầng thâm, bọng mắt giúp bạn lấy lại sự tươi trẻ và tinh anh cho đôi mắt cũng không quá khó đúng không nào! Vậy hãy áp dụng ngay để thoát khỏi đôi mắt gấu trúc mệt mỏi và già nua ngay thôi. </p>`,
                abstract: " Đôi mắt thâm quầng do bất cứ nguyên nhân nào cũng khiến bạn mất đi thần sắc, trông rất mệt mỏi và già đi cả chục tuổi. Vậy làm thế nào để đánh bay thâm quầng lấy lại đôi mắt tinh anh rạng ngời và tràn đầy sự tươi mới? ",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-27-tiny.jpg?alt=media&token=94770709-5a41-4838-a268-0371a4ce2149",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-27-tiny.jpg?alt=media&token=94770709-5a41-4838-a268-0371a4ce2149",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 2,
                categoryId: 14,
            },
            {
                title: " 7 tác dụng của chạy bộ đối với sức khỏe và tinh thần, bạn biết chưa? ",
                content: `<p>Vậy cùng tìm hiểu xem thực tế chạy bộ mang lại những tác dụng nào? Từ đó, các bạn sẽ có động lực hơn cho việc chạy bộ mỗi ngày để có một sức khỏe dẻo dai và nhan sắc trẻ trung mãi. </p>
                <h2>Tăng cường hệ miễn dịch</h2>
                <p></p>Nhiều nghiên cứu chỉ ra rằng, chạy bộ có tác dụng tăng cường sức đề kháng giúp cơ thể chống lại bệnh tật. Bên cạnh đó, chạy bộ thường xuyên cũng giúp giảm viêm và hạn chế nguy cơ nhiễm trùng đường hô hấp, bệnh cúm. Chú ý, trong quá trình chạy bộ không nên chạy quá sức bởi điều này có thể tạm thời làm giảm khả năng miễn dịch của cơ thể.</p>
                <h2>Cho giấc ngủ ngon hơn</h2>
                <p>Khi bạn có một giấc ngủ ngon sẽ giúp tăng khả năng tập trung, cải thiện sức khỏe và sức đề kháng. Một giấc ngủ sâu cũng là tiền đề giảm nguy cơ mắc một số bệnh như béo phì, đột quỵ, tiểu đường, trầm cảm hay viêm nhiễm. Nhiều nghiên cứu chỉ ra rằng, thói quen chạy bộ giúp bạn nhanh đi vào giấc ngủ sâu hơn.</p>
                <h2>Tốt cho xương khớp</h2>
                <p>Nhiều người không chạy bộ hay lười tập thể dục rất dễ gặp những vấn để liên quan tới xương khớp ở đầu gối và lưng. Thực tế, các nghiên cứu đã chứng minh những người thường xuyên chạy bộ ít mắc viêm khớp hơn những người không chạy bộ.</p>
                <h2>Duy trì vóc dáng</h2>
                <p>Những bài tập bộ giúp cơ thể đốt cháy nhiều calo nên chính là phương pháp giảm cân hiệu quả. Nhiều nghiên cứu cho kết quả đến 90% những người thường xuyên chạy bộ 1 giờ/ngày và 98% tuân thủ chế độ ăn kiêng đã giảm cân rõ rệt với một thân hình thon gọn, cân đối. </p>
                <h2>Giảm nguy cơ mắc ung thư</h2>
                <p>Năm 2016 đã có nghiên cứu chỉ ra rằng những người chạy bộ thường xuyên giảm nguy cơ mắc 26 loại bệnh ung thư khác nhau so với những người ít hay không chạy bộ. Nếu bạn không may bị ung thư thì chạy bộ mỗi ngày sẽ hạn chế những tác dụng phụ từ phương pháp điều trị ung thư.</p>
                <h2>Giảm nguy cơ mắc tiểu đường</h2>
                <p>Bạn có biết, nồng độ glucose trong máu cao sẽ gây ra chứng bệnh tiểu đường. Mà theo Hiệp hội Tiểu đường, chạy bộ có thể mang lại những tác dụng "vi diệu" như ngăn ngừa tiền tiểu đường, cải thiện tình trạng với những người mắc bệnh tiểu đường tuýp 1, giảm bệnh tiểu đường tuýp 2.</p>
                <h2>Giảm huyết áp</h2>
                <p>Nhiều nghiên cứu cho thấy bệnh huyết áp cao được cải thiện khi người bệnh chạy bộ hay tập các bài tập thể dục khác. Lý giải cho điều này là bởi chạy bộ thường xuyên làm giảm tình trạng cứng mạch máu nên máu lưu thông dễ dàng hơn. Huyết áp giảm đáng kể sau khi tập thể dục xong.</p>
                <p>Không thể phủ nhận những tác dụng bất ngờ của chạy bộ đối với cơ thể chúng ta đúng không nào. Vậy hãy lên lịch trình chạy bộ mỗi ngày để luôn có một sức khỏe dẻo dai, tinh thần tích cực tràn đầy sức sống và một vóc dáng cân đối, nhan sắc tươi trẻ. Bên cạnh đó, các bạn cũng nên tham gia các hoạt động chạy bộ được tổ chức quy mô lớn để nâng cao ý chí tập luyện giúp cơ thể khỏe mạnh hơn.</p>`,
                abstract: " Hầu hết mọi người chỉ biết chung chung về tác dụng của chạy bộ là tốt cho sức khỏe. Mà ít người biết, chạy bộ còn mang lại nhiều lợi ích về tinh thần, nhan sắc và phòng chống được nhiều loại bệnh. ",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-28-tiny.jpg?alt=media&token=79ac2f09-4816-46eb-b5d8-df486a5326c2",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-28-tiny.jpg?alt=media&token=79ac2f09-4816-46eb-b5d8-df486a5326c2",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 3,
                categoryId: 14,
            },
            {
                title: " Cụ ông bị thủng tim do nghẽn mạch vành được bác sĩ FV cứu sống kịp thời ",
                content: `<h2>Biến chứng nhồi máu cơ tim nặng gây thủng tim</h2>
                <p>Bác sĩ Hồ Minh Tuấn, Trưởng khoa Tim Mạch Bệnh viện FV cho biết, bệnh nhân Lê Quang Trung nhập viện vào lúc 1g sáng ngày 18.3 trong tình trạng bất tỉnh. Ông nhập viện muộn ở ngày thứ 7-8 sau cơn nhồi máu cơ tim, dẫn đến phù phổi, suy tim. Cơn nhồi máu cơ tim đã gây biến chứng thủng vách tim. Đây là trường hợp hiếm gặp với tỷ lệ 0,2% trên thế giới, tức trong 500 - 700 ca nhồi máu cơ tim mới có một ca như trên với tỷ lệ tử vong dao động từ 94 - 98%, có nghiên cứu báo cáo tỷ lệ tử vong lên đến 99%.</p>
                <p>Theo người nhà bệnh nhân, thời gian gần đây cụ ông có biểu hiện mệt mỏi, đau ngực, khó thở. Trước thời điểm nhập viện một tiếng, ông bị đau tức ngực dữ dội, khó thở nặng. Sau đó, ông được đưa vào cấp cứu tại Bệnh viện FV.</p>
                <p>Khi đó, cả gia đình ông Trung đã "chuẩn bị tâm lý" cho tình huống xấu nhất.</p>
                <h2>Giành lại sự sống cho bệnh nhân</h2>
                <p>Do bệnh nhân cao tuổi, bị thủng tim phù phổi nặng kèm theo nhiều bệnh nền như tiểu đường, tăng huyết áp nên việc can thiệp tim mạch sẽ có rủi ro cao. Tuy nhiên với tinh thần dù chỉ còn 2% cơ hội sống thì vẫn còn hy vọng để cố gắng, ê-kíp bác sĩ Bệnh viện FV ngay lập tức lên phương án điều trị cho ông Trung.</p>
                <p>Theo bác sĩ Hồ Minh Tuấn, với trường hợp này, bước đầu tiên cần phải xử lý vấn đề nhồi máu cơ tim cho bệnh nhân. Ê kíp tiến hành đặt stent để lưu thông dòng máu, giúp cơ tim sống lại. Quá trình này diễn ra rất nhanh trong khoảng 5-7 phút vì nếu càng chậm cơ tim càng mau chết.</p>
                <p>Khi bị nhồi máu cơ tim, mạch máu tim bị nghẽn, bác sĩ sử dụng các ống thông nhỏ luồn qua mạch máu ở tay theo đường động mạch ngoại biên. Sau khi xác định tổn thương, các bác sĩ tái thông đoạn hẹp bằng các stent để đảm bảo lưu thông tốt cho mạch máu tim.</p>
                <p>Sau 12 ngày, máu lưu thông ổn định, cụ ông được vá lỗ thủng ở tim. Đây là một kỹ thuật khó, đòi hỏi tay nghề, kinh nghiệm bác sĩ và các trang thiết bị hỗ trợ hiện đại.</p>
                <p>Sau 1 giờ đồng hồ cân não, với sự phối hợp nhịp nhàng các chuyên khoa, cùng nhiều trang thiết bị hỗ trợ, quá trình vá lỗ thủng tim diễn ra thành công, sức khỏe bệnh nhân ổn định.</p>
                <p>Theo bác sĩ Tuấn, so với trường hợp thủng tim bẩm sinh, thì việc vá lỗ thủng cho bệnh nhân nhồi máu cơ tim biến chứng sẽ khó khăn hơn, đòi hỏi tay nghề, kinh nghiệm, phương tiện trang thiết bị tiên tiến.</p>
                <p>Hiện tình trạng sức khỏe bệnh nhân ổn định, nằm ngủ không còn khó thở, có thể ăn uống, đi lại bình thường. Hình ảnh sức bóp cơ tim tốt tăng từ 30% lên 50%, bệnh nhân được xuất viện ngày 3.4.2023.</p>
                <p>"Sau mổ, sức khỏe tôi tốt lên rất nhiều, không còn đau đớn hay khó thở nữa. Tôi may mắn khi được bệnh viện cứu sống, trước đó đau đến mức tưởng chừng không qua khỏi", cụ ông hồ hởi chia sẻ.</p>
                <h2>Nguy cơ tử vong nếu bệnh nhân đến bệnh viện trễ hơn 10-20 phút</h2>
                <p>Bác sĩ Tuấn cho biết, khi bị nhồi máu cơ tim, mạch máu nuôi tim bị nghẽn lại, vùng cơ tim không có máu nuôi thì giai đoạn đầu bóp yếu hoặc không bóp. Do đó, nếu bệnh nhân tới bệnh viện muộn, vùng cơ tim bị hoại tử, gây tử vong. Trường hợp của cụ ông nếu nhập viện trễ 10 -20 phút thì nguy cơ tử vong rất cao.</p>
                <p>Ngoài ra, bệnh nhân có tiền sử tiểu đường, tăng huyết áp, hút thuốc lá. Đây là những yếu tố tăng nguy cơ hẹp mạch vành gây ra các biến chứng tim mạch, cần kiểm soát tốt để tránh nguy cơ tái lại.</p>
                <p>"Đối với người bệnh có yếu tố nguy cơ nhồi máu cơ tim, khi có triệu chứng nghi ngờ, phải đến bệnh viện chuyên khoa thăm khám sớm, tránh biến chứng cơ học như thủng tim, có thể gây tử vong. Các triệu chứng cần chú ý bao gồm tức ngực, khó thở, ngất, choáng váng…", bác sĩ Tuấn khuyến cáo.</p>
                <p>Cần tư vấn chi tiết về các bệnh lý tim mạch, bạn đọc có thể liên hệ ĐT: (028) 54113333.</p>`,
                abstract: "\"Bác sĩ cho biết với trường hợp như bố tôi, tỷ lệ sống chỉ có 2%, nhưng bác sĩ FV bảo \"còn nước còn tát\". Lúc đó anh em chúng tôi tập trung chờ đợi trong thấp thỏm, đã \"chuẩn bị tâm lý\" cho tình huống xấu nhất\", con trai cả của bệnh nhân Lê Quang Trung (75 tuổi, ngụ ở Bình Dương) kể lại. ",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-29-tiny.jpg?alt=media&token=3ade9331-53c1-4e14-b34e-b00e67c8df2d",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-29-tiny.jpg?alt=media&token=3ade9331-53c1-4e14-b34e-b00e67c8df2d",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 4,
                categoryId: 15,
            },
            {
                title: " BS Đỗ Tường Huân (Bệnh viện FV): 'Không gì vui bằng khi bệnh nhân thắng ung thư' ",
                content: `<h2>Phẫu thuật điều trị cho hàng ngàn ca bệnh</h2>
                <p>Tốt nghiệp Đại học Y Dược TP.HCM từ năm 1998, đến nay BS CKII Đỗ Tường Huân (Bệnh viện FV) đã có hơn 20 năm gắn bó với chuyên ngành phẫu thuật ung bướu vùng đầu cổ và trực tiếp phẫu thuật điều trị cho hàng ngàn ca bệnh.</p>
                <p>"Phẫu thuật đầu cổ là lĩnh vực có nhiều thách thức vì cấu trúc giải phẫu tương đối phức tạp. Trong đó, thách thức lớn nhất trong điều trị ung thư vùng đầu cổ là ngoài việc nỗ lực chữa khỏi bệnh thì còn phải đảm bảo thẩm mỹ và chức năng vùng đầu cổ, giúp người bệnh hòa nhập tốt với đời sống sau điều trị", bác sĩ Huân chia sẻ. Say mê công việc, bác sĩ Huân luôn tận dụng các cơ hội học hỏi, đào sâu chuyên môn trong lĩnh vực phẫu thuật ung thư đầu cổ. </p>
                <p>Tháng 10.2022, bác sĩ Huân chính thức tham gia đội ngũ khoa Tai Mũi Họng Bệnh viện FV với vị trí Bác sĩ phẫu thuật ung thư vùng đầu cổ. Đây có thể được xem là một bước ngoặt trong sự nghiệp của anh.</p>
                <p>Nói về lý do chọn Bệnh viện FV là nơi gắn bó quan trọng trong sự nghiệp của bản thân, bác sĩ Huân cho biết anh muốn phát triển nghề nghiệp của mình ở một tầm cao mới. Bệnh viện FV tập hợp đội ngũ bác sĩ giỏi, có phòng mổ hiện đại, đầu tư hẳn một trung tâm ung bướu rất phát triển là Trung tâm điều trị Ung thư Hy Vọng, với các phương tiện hỗ trợ điều trị ung thư rất tốt như xạ trị ngoài, xạ trị bằng đồng vị phóng xạ, giải phẫu bệnh kèm theo cắt lạnh… Hơn nữa, FV là một bệnh viện đa khoa quốc tế, với đầy đủ các chuyên khoa, nên việc điều trị có sự phối hợp liên chuyên khoa, mang lại sự thuận tiện nhanh chóng trong điều trị bệnh.</p>
                <p>"Không có niềm vui nào bằng khi thấy bệnh nhân của mình chiến thắng ung thư, tự tin lạc quan trở lại cuộc sống. Nụ cười của họ bên người thân sau mỗi ca phẫu thuật thành công là động lực để chúng tôi luôn cố gắng trau dồi chuyên môn và nâng cao chất lượng từng ca mổ", bác sĩ Huân bày tỏ.</p>
                <p>Cùng với các đồng nghiệp tại FV, bác sĩ Huân mong muốn phát triển nơi đây thành địa chỉ tin cậy cho các bệnh nhân trong và ngoài nước khi cần phẫu thuật điều trị các bệnh lý ung bướu nói chung và ung thư vùng đầu cổ nói riêng.</p>
                <h2>Chuyên gia dày dạn kinh nghiệm trong điều trị ung thư tuyến giáp</h2>
                <p>Theo bác sĩ Huân, ung thư vùng đầu cổ thường gặp gồm ung thư tuyến giáp, tuyến nước bọt mang tai và dưới hàm, ung thư da vùng đầu cổ. Trong số đó thì ung thư tuyến giáp là phổ biến nhất, lứa tuổi thường gặp là trung niên (45-50 tuổi), tuy vậy đôi khi có thể gặp ở cả thiếu niên 10-14 tuổi.</p>
                <p>Bác sĩ Huân cho biết ung thư tuyến giáp có tỷ lệ chữa khỏi cao: tiên lượng cơ hội sống sau 5 năm của bệnh ung thư tuyến giáp biệt hóa tốt đạt 98-99%, cơ hội khỏi bệnh sau 10 năm đạt 90% trở lên. "Thông thường có thể nhầm lẫn giữa bướu giáp lành tính và ác tính. Tuy nhiên các bướu giáp có bằng chứng lành tính trong phần lớn trường hợp nên người bệnh không nên quá lo lắng khi phát hiện có nhân giáp", bác sĩ Huân cho biết.</p>
                <p>Khi phát hiện có bướu giáp thì người bệnh nên đến cơ sở y tế hoặc đơn vị chuyên khoa ung bướu để thăm khám. Người bệnh sẽ được sinh thiết để chẩn đoán kỹ hơn, nếu nghiêng về ác tính thì tiến hành phẫu thuật. Ở giai đoạn bướu nhỏ, bác sĩ cân nhắc chỉ cắt một phần, nếu phát hiện trễ sẽ phải cắt hết tuyến giáp. Ở giai đoạn trễ, bướu có thể đã lan rộng ở vùng cổ và xâm lấn vào các cơ quan khác gây khàn tiếng, khó thở, nổi hạch cổ....</p>
                <p>Tại Bệnh viện FV, bệnh nhân ung thư có thể được điều trị kết hợp nhiều phương pháp tại cùng một điểm, với sự phối hợp liên chuyên khoa, trong đó có Trung tâm điều trị Ung thư Hy Vọng với đầy đủ trang thiết bị, luôn cập nhật các kỹ thuật điều trị ung thư tiên tiến nhất. </p>
                <p>Để đặt hẹn khám bệnh với BS CKII Đỗ Tường Huân khoa Tai Mũi Họng, vui lòng liên hệ: (028) 54113333, máy nhánh 7711.</p>`,
                abstract: " Bác sĩ Huân cho biết là một bác sĩ phẫu thuật ung thư, ngoài tay nghề vững vàng thì cần có sự đồng cảm, thấu hiểu người bệnh, bởi hầu như ai khi phát hiện ra mình mắc bệnh đều vô cùng tuyệt vọng. Với anh, không có niềm vui nào bằng khi thấy bệnh nhân của mình chiến thắng ung thư, tự tin lạc quan trở lại cuộc sống. ",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-30-tiny.jpg?alt=media&token=27ef9fd5-657a-49ea-b283-168cbef4ede2",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-30-tiny.jpg?alt=media&token=27ef9fd5-657a-49ea-b283-168cbef4ede2",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 5,
                categoryId: 15,
            },
            {
                title: "Những nguy cơ khi mang thai ở tuổi vị thành niên",
                content: `<h2>TÌNH DỤC KHÔNG CHUẨN BỊ, KHÔNG MONG MUỐN</h2>
                <p>Theo TS-BS Đỗ Minh Loan, Trưởng khoa Sức khỏe vị thành niên, Bệnh viện (BV) Nhi T.Ư (Hà Nội), trong giai đoạn vị thành niên, trẻ phát triển các chức năng sinh dục, sinh sản, nhu cầu tình dục xuất hiện nhưng chưa đủ kỹ năng để kiểm soát ham muốn. Cùng với sự thiếu hiểu biết về chu kỳ kinh nguyệt, cơ chế thụ thai, các biện pháp tránh thai, các em có thể có tình huống quan hệ tình dục không chuẩn bị, không mong muốn; quan hệ tình dục trước hôn nhân, sống thử trước hôn nhân. Trong khi đó, các em cũng thiếu tiếp cận với các dịch vụ chăm sóc sức khỏe sinh sản, chưa được giáo dục đầy đủ về sức khỏe giới tính dẫn đến nguy cơ mang thai ngoài ý muốn rất cao.</p>
                <p>TS-BS Đỗ Minh Loan khuyến cáo mang thai ở tuổi vị thành niên để lại nhiều hệ lụy về sức khỏe.</p>
                <p>Trước hết là ảnh hưởng không tốt đến sức khỏe, nguy cơ tử vong mẹ vẫn còn cao so với các bà mẹ sinh con ở tuổi trưởng thành. Mẹ dễ bị thiếu máu, tiền sản giật, đẻ non, sẩy thai, chuyển dạ đình trệ, bất tương xứng thai khung chậu. Trong lúc sinh, dễ bị đẻ khó, nhiều nguy cơ phải can thiệp bằng các thủ thuật và phẫu thuật.</p>
                <p>Tỷ lệ tử vong trẻ em sinh ra từ các bà mẹ tuổi vị thành niên cao hơn so với các bà mẹ sinh con ở tuổi trưởng thành. Con của các bà mẹ vị thành niên thường có tỷ lệ nhẹ cân, bệnh tật và tử vong cao gấp nhiều lần so với con của các bà mẹ tuổi trưởng thành.</p>
                <p>Khi có thai ở tuổi vị thành niên, các em phải gián đoạn việc học hành, khó khăn về kinh tế và không kiếm được việc làm, dẫn trẻ vào con đường bế tắc. Hạnh phúc gia đình có thể bị rạn nứt, dễ lâm vào cảnh éo le, ảnh hưởng đến tương lai. Tỷ lệ ly dị cao, dễ bị phân biệt đối xử. Làm mẹ sớm còn khiến các em dễ bị căng thẳng và khủng hoảng tâm lý.</p>
                <p>TS Đỗ Minh Loan cũng chia sẻ do mặc cảm, xấu hổ nên trẻ vị thành niên thường tìm kiếm dịch vụ phá thai không an toàn. Trẻ thường không biết các dấu hiệu để nhận biết thai nghén, nên không tìm đến cơ sở y tế sớm dẫn đến phá thai to. Do cơ thể chưa phát triển hoàn chỉnh, tâm lý lại lo sợ nên thủ thuật phá thai ở vị thành niên thường xảy ra nhiều tai biến hơn ở người trưởng thành. Những ảnh hưởng tâm lý sau phá thai ở tuổi vị thành niên có thể rất nặng nề và kéo dài.</p>
                <h2>CHA MẸ CẦN QUAN TÂM ĐẾN CON CÁI NHIỀU HƠN</h2>
                <p>Theo Bệnh viện Nhi T.Ư, vị thành niên (từ 10 - 18 tuổi) là giai đoạn thay đổi rất lớn về thể chất và tâm sinh lý.</p>
                <p>"Cha mẹ của các con trong độ tuổi vị thành niên nên quan tâm đến con cái nhiều hơn, nên dành nhiều thời gian trò chuyện, tâm sự với con những định hướng đúng đắn về tình cảm. Cha mẹ và nhà trường nên phối hợp để trang bị cho trẻ những kiến thức về sức khỏe sinh sản, giáo dục giới tính, giúp các em có kiến thức và nhận thức đúng đắn, tránh được những sai lầm không đáng có", TS-BS Loan chia sẻ.</p>
                <p>Chuyên gia về sức khỏe vị thành niên cho rằng ngành chức năng cần tăng cường giáo dục, chăm sóc sức khỏe tiền hôn nhân, các vấn đề liên quan đến sức khỏe sinh sản, hướng dẫn các biện pháp tránh thai phù hợp, hạn chế tình trạng phá thai và ngăn ngừa các bệnh lây qua đường tình dục. Đặc biệt, cần có sự phối hợp đồng bộ giữa nhà trường - gia đình - xã hội. Từ đó, giúp các em được trang bị đầy đủ kiến thức về giới tính và sức khỏe sinh sản, góp phần nâng cao chất lượng dân số trong tương lai.</p>
                <p>TS Loan cũng cho hay Khoa Sức khỏe vị thành niên - Bệnh viện Nhi T.Ư đã và đang thực hiện các chương trình giáo dục giới tính, cung cấp các dịch vụ chăm sóc sức khỏe sinh sản, sức khỏe tình dục lồng ghép các chương trình giáo dục tại các trường học nhằm giảm tỷ lệ mang thai ngoài ý muốn ở trẻ vị thành niên.</p>
                <p>Theo TS Loan: "Để giúp trẻ vị thành niên phòng tránh mang thai ngoài ý muốn, ngay bây giờ, rất cần sự chung tay xây dựng của gia đình, nhà trường và xã hội, để cuộc sống của các em được an toàn".</p>`,
                abstract: "Ở giai đoạn vị thành niên, trẻ phát triển các chức năng sinh dục, sinh sản, nhu cầu tình dục xuất hiện nhưng chưa đủ kỹ năng để kiểm soát.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-31-tiny.jpg?alt=media&token=8779d6b3-dcc0-4eb4-95fd-4e8bfc38fb10",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-31-tiny.jpg?alt=media&token=8779d6b3-dcc0-4eb4-95fd-4e8bfc38fb10",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: true,
                writerId: 1,
                categoryId: 16,
            },
            {
                title: "Nam giới có con ở độ tuổi nào là tốt nhất?",
                content: `<h2>Vậy độ tuổi nào là tốt nhất để làm cha?</h2>
                <p>Nhiều người nghĩ rằng đàn ông tuổi nào cũng có thể có con.</p>
                <p>Tuy nhiên, các chuyên gia cho rằng theo tuổi tác, số lượng và chất lượng “tinh binh” suy giảm, và ở góc độ sinh học, có một khung tuổi thích hợp nhất để làm cha.</p>
                <p>Các chuyên gia cho rằng thời điểm thích hợp nhất để làm cha là từ cuối độ tuổi 20 đến đầu 30, và sau tuổi này có thể gặp đôi chút khó khăn nếu muốn có con, theo tờ Times Now News.</p>
                <p>Nam giới trên 40 tuổi có thể cảm thấy vô cùng khó khăn khi sinh con vì khả năng vô sinh tăng lên đến mức cao nhất ở tuổi này.</p>
                <p>Các chuyên gia nói rằng theo tuổi tác, các “tinh binh” trải qua các đột biến di truyền do các vấn đề về môi trường và ADN có thể bị hỏng. Nó ảnh hưởng đến cơ hội sinh sản, ngoài việc tạo ra nguy cơ mắc các bệnh tiềm ẩn ở những đứa trẻ sau này.</p>
                <p>Nhiều nghiên cứu đã chỉ ra rằng nam giới ở độ tuổi lớn hơn sinh con có thể dễ mắc một số vấn đề về thần kinh và phát triển, mà đáng lo nhất là tự kỷ.</p>
                <h2>Tại sao tuổi tác ảnh hưởng đến sinh sản của nam giới?</h2>
                <p>Đàn ông lớn tuổi dễ gặp các vấn đề sức khỏe hoặc tiếp xúc với độc tố môi trường.</p>
                <p>Việc suy giảm hoóc môn nam giới testosterone có thể gây giảm ham muốn, rối loạn cương dương, khó xuất tinh.</p>
                <p>Lão hóa tác hại đến chức năng tình dục, chất lượng “tinh binh” và khả năng sinh sản của nam giới.</p>
                <p>Theo Tổ chức Y tế thế giới (WHO), một số thông số về tinh dịch, được coi là tiêu chuẩn cho “tinh binh” khỏe mạnh, bao gồm: số lượng tinh trùng, hình dạng tinh trùng, khả năng chuyển động của tinh trùng.</p>
                <p>Điều quan trọng, các thông số này bắt đầu suy giảm sau tuổi 35, các bác sĩ cho biết, theo Times Now News.</p>
                <h2>Làm gì để cải thiện chất lượng “tinh binh” và tránh vô sinh?</h2>
                <p>Theo Times Now News, một số mẹo giúp nam giới cải thiện khả năng “tinh binh” khỏe mạnh và thoát khỏi các vấn đề vô sinh, bao gồm:</p>
                <ul>
                <li>Bỏ hút thuốc. Nam giới nghiện thuốc lá nặng tạo ra ít “tinh binh” hơn. Hút thuốc cũng làm hỏng ADN trong “tinh binh” và gây vô sinh. Tuy nhiên, có thể tránh được bằng cách bỏ thuốc lá.</li>
                <li>Giảm béo. Nam giới béo phì dù ở độ tuổi nào cũng khó có con do chất lượng “tinh binh” kém. Giảm vài kg có thể cải thiện đáng kể chất lượng “tinh binh”.</li>
                <li>Giảm rượu. Cần giảm lượng rượu, bởi say rượu và uống nhiều rượu làm giảm số lượng và chất lượng “tinh binh”.</li>
                <li>Tránh quan hệ không an toàn. Điều này có thể dẫn đến các bệnh lây truyền qua đường tình dục làm giảm chất lượng “tinh binh”, tắc ống dẫn tinh. Nếu mắc bệnh, hãy điều trị sớm.</li>
                </ul>`,
                abstract: "Đàn ông có thể tiếp tục sản xuất “tinh binh” trong suốt cuộc đời của họ, nhưng cả số lượng và chất lượng đều giảm, gây ra các vấn đề về khả năng sinh sản. Do đó, điều quan trọng cần biết là có một khung tuổi nhất định là thời điểm tốt nhất để họ có thể trở thành cha.",
                tinyImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-32-tiny.jpg?alt=media&token=37b54e49-9e49-4cf8-9cf1-a605eada9d16",
                largeImagePath: "https://firebasestorage.googleapis.com/v0/b/katnews-d2310.appspot.com/o/tiny-images%2Fnews-32-tiny.jpg?alt=media&token=37b54e49-9e49-4cf8-9cf1-a605eada9d16",
                youtubePath: DEFAULT_YOUTUBE_URL,
                isDraft: false,
                isPremium: false,
                writerId: 2,
                categoryId: 16,
            },
        ];

        news.forEach((item) => {
            item.createdAt = Sequelize.literal("NOW()");
            item.updatedAt = Sequelize.literal("NOW()");
            // item.totalViewsCount = Math.floor(Math.random() * 10);  // Fake views count for testing
            item.totalViewsCount = 0;
            item.weeklyViewsCount = 0;
            item.isDeleted = false;
        });

        await queryInterface.bulkInsert("News", news, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('News', null, {});
    },
};
