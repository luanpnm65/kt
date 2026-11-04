# BUỔI 6 – TỔNG KẾT ĐỢT KIỂM THỬ

- **Họ tên:** Phạm Nguyễn Minh Luân
- **MSSV:** 65131848
- **Phạm vi:** MiniShop NTU v1.0–v1.1.0; SRS v1.0–v1.2; số liệu đo được đến lần chạy Buổi 6.

## 1. Hồ sơ kiểm thử đã xây dựng

| Buổi | Loại hiện vật | Số lượng | Đường dẫn trong repo |
|---|---|---:|---|
| 1 | Báo cáo khám phá, phiếu và biên bản review, phân tích tĩnh | 4 file; 12 phát hiện review | `bai-nop/Buoi01-*.md` |
| 1 | Mã nguồn dùng cho bài phân tích tĩnh | 1 thư mục | `src/lab-static/` |
| 2 | Ca kiểm thử hộp đen | 32 dòng ca | `bai-nop/Buoi02-TestCase.csv` |
| 2 | Dữ liệu kiểm thử hướng dữ liệu | 20 dòng dữ liệu | `bai-nop/Buoi02-DuLieuKiemThu.csv` |
| 2 | Phân hoạch, bảng quyết định, pairwise, trạng thái, thực thi và RTM | 5 báo cáo | `bai-nop/Buoi02-PhanHoach.md`, `Buoi02-BangQuyetDinh.md`, `Buoi02-Pairwise.md`, `Buoi02-SoDoTrangThai.md`, `Buoi02-ThucThi-RTM.md` |
| 3 | Ca đơn vị nghiệp vụ | 3 file Jest | `tests/unit/*.test.js` |
| 3 | Báo cáo kết quả và độ phủ | 2 file | `bai-nop/Buoi03-PhanTichKetQua.md`, `bai-nop/Buoi03-DoPhu.md` |
| 4 | Kế hoạch, xác nhận/hồi quy, exploratory và báo cáo issue | 3 file | `bai-nop/Buoi04-TestPlan.md`, `Buoi04-XacNhan-HoiQuy.md`, `Buoi04-Exploratory.md` |
| 5 | Ca Playwright E2E | 4 file; 11 ca được khai báo, trong đó 6 ca skip | `tests/e2e/*.spec.js` |
| 5 | Page Object và báo cáo | 3 file Page Object; 2 báo cáo | `tests/pages/`, `bai-nop/Buoi05-BaoCaoE2E.md`, `Buoi05-Flaky-POM.md` |
| 6 | Ca API | 2 file; 20 ca | `tests/api/01-xac-thuc.spec.js`, `tests/api/02-nghiep-vu.spec.js` |
| 6 | CI và báo cáo API/CI | 1 workflow; 1 báo cáo và ảnh minh chứng | `.github/workflows/kiem-thu-day-du.yml`, `bai-nop/Buoi06-BaoCaoAPI-CI.md`, `bai-nop/hinh/Buoi06-Actions-moi.png` |
| 6 | Bộ ca AI, phản biện và báo cáo tổng kết | 11 ca; 2 báo cáo | `tests/gen-ai/ai-sinh.test.js`, `bai-nop/Buoi06-GenAI.md`, `bai-nop/Buoi06-TongKet.md` |

Số 46 ca Jest của CI bao gồm cả ca ví dụ `tests/vi-du/xep-loai.test.js`, không chỉ ba file unit nghiệp vụ. Bộ AI được tách khỏi `npm test`.

## 2. Bản đồ lỗi theo tầng kiểm thử

`X` nghĩa là có bằng chứng tầng đó **đã phát hiện** hiện tượng trong hồ sơ; ô trống nghĩa là chưa có bằng chứng, không có nghĩa tầng đó về nguyên tắc không thể phát hiện. Các ô trống ở F-04, F-06–F-09, F-11, F-12 cho biết báo cáo Buổi 4 có ghi xác nhận bản sửa nhưng không đủ bằng chứng trong hồ sơ để xác định tầng đã phát hiện lỗi ban đầu; **không tính một ca xác nhận đạt là phát hiện lỗi**. Các kết quả lịch sử không đồng nghĩa lỗi còn tồn tại trên v1.1.

### 2.1. Review SRS v1.0 — nguồn `Buoi01-Phan2-BienBanReview.md`

| Lỗi tài liệu | Tĩnh | Đơn vị | Thủ công | Đầu cuối | API |
|---|---|---|---|---|---|
| R01 mâu thuẫn tuổi tối thiểu | X | | | | |
| R02 mật khẩu mạnh mơ hồ | X | | | | |
| R03 mâu thuẫn số lần đăng nhập sai | X | | | | |
| R04 giới hạn giỏ hàng mơ hồ | X | | | | |
| R05 mâu thuẫn ngưỡng miễn phí | X | | | | |
| R06 thiếu định nghĩa khách thân thiết | X | | | | |
| R07 yêu cầu gửi email ngoài phạm vi | X | | | | |
| R08 bước voucher không có đặc tả | X | | | | |
| R09 thời gian phản hồi không định lượng | X | | | | |
| R10 độ sẵn sàng 100% không khả thi | X | | | | |
| R11 ví dụ phí ngoại thành sai số liệu | X | | | | |
| R12 thuật ngữ VIP không nhất quán | X | | | | |

### 2.2. Mã thực hành phân tích tĩnh — nguồn `Buoi01-Phan3-PhanTichTinh.md`

| Lỗi trong `src/lab-static/` | Tĩnh | Đơn vị | Thủ công | Đầu cuối | API |
|---|---|---|---|---|---|
| S01 khóa phí nội thành bị khai báo trùng | X | | | | |
| S02 tên biến `totl` không được khai báo | X | | | | |
| S03 gán thay vì so sánh số lượng trong điều kiện | X | | | | |
| S04 `typeof` sai tên kiểu | X | | | | |
| S05 so sánh trực tiếp với `NaN` | X | | | | |
| S06 nhánh `switch` thiếu `break` | X | | | | |
| S07 điều kiện `else if` trùng | X | | | | |
| S08 toán tử phủ định sai thứ tự khi kiểm `in` | X | | | | |
| S09 công thức tổng trừ phí thay vì cộng phí | X | | | | |
| S10 kiểm tra phạm vi số lượng sai | X | | | | |

S09–S10 được phát hiện bằng đọc mã tĩnh theo mục 4 của báo cáo Buổi 1, **không phải** bởi rule ESLint. Các cảnh báo trùng nguyên nhân trong báo cáo gốc không được đếm thành lỗi riêng; mã lab không phải điểm cuối đơn hàng của sản phẩm.

### 2.3. Lỗi sản phẩm và hồi quy

| Lỗi / phiên bản | Tĩnh | Đơn vị | Thủ công | Đầu cuối | API |
|---|---|---|---|---|---|
| F-01: chấp nhận tuổi 17, v1.0 | | X | | | |
| F-02: chấp nhận mật khẩu 21 ký tự, v1.0 | | X | | | |
| F-03: không kiểm thành phần mật khẩu, v1.0 | | X | | | |
| F-04: không đặt lại bộ đếm sai, v1.0 | | | | | |
| F-05: thông báo khóa thiếu hướng dẫn, v1.0 | | | X | | |
| F-06: chấp nhận số lượng 0, v1.0 | | | | | |
| F-07: không giới hạn tổng số lượng giỏ, v1.0 | | | | | |
| F-08: thêm sản phẩm không tồn tại, v1.0 | | | | | |
| F-09: đúng 500.000đ không miễn phí, v1.0 | | | | | |
| F-10: VIP ngoại thành vẫn bị tính phí, v1.0 | | X | | | |
| F-11: thiếu giảm 5% VIP, v1.0 | | | | | |
| F-12: hủy đơn thiếu gây lỗi 500, v1.0 | | | | | |
| Thông báo mật khẩu ngắn không đúng như ca mong đợi, Buổi 2 | | | X | | |
| FR-06.5: sắp xếp giá giảm sai, v1.1 | | | X | | X |
| FR-06.6: lọc còn hàng hiển thị hàng hết, v1.1 | | | X | | X |
| FR-05.2: tổng đơn thường thiếu phí giao hàng, v1.1 | | | | | X |
| FR-05.5: tài khoản khác hủy được đơn, v1.1 | | | | | X |

Nguồn: mô tả ca đỏ trong `Buoi03-PhanTichKetQua.md` cho F-01, F-02, F-03, F-10; `Buoi02-ThucThi-RTM.md` cho thông báo mật khẩu/khóa; `Buoi04-XacNhan-HoiQuy.md` mục 3 và `Buoi04-Exploratory.md` cho FR-06; `Buoi06-BaoCaoAPI-CI.md` cho API. **Cần đối chiếu lại log gốc Buổi 3**: mã ca và mô tả lỗi ở báo cáo đó không nhất quán với một số hàng CSV và báo cáo xác nhận Buổi 4. Bảng giữ dấu theo mô tả trong báo cáo, không coi ánh xạ mã ca là chứng cứ độc lập. F-06 chưa đánh dấu unit vì mô tả `TC-12` mâu thuẫn giữa kết quả và kết luận; F-04/F-07–F-09/F-11/F-12 có kết quả xác nhận trong Buổi 4 nhưng chưa có hồ sơ tầng phát hiện ban đầu. Đó là giới hạn của bản đồ, không phải khẳng định những lỗi này không được phát hiện.

Ba ca E2E đang đỏ trên CI chưa có log chi tiết để xác định là lỗi sản phẩm, lỗi ca hay flaky; không tự gán dấu `X` cho một lỗi sản phẩm. Bảy ca unit đỏ trên v1.1 cũng không mặc định là bảy lỗi sản phẩm: một số kỳ vọng trái SRS và các ca CSV cần kiểm lại dữ liệu.

### 2.4. Các lỗi chỉ có một dấu X và rủi ro nếu bỏ tầng

- **R01–R12:** chỉ có dấu tĩnh. Nếu bỏ review, mâu thuẫn, thiếu sót và thuật ngữ có thể đi vào thiết kế, rồi mã hoặc tiêu chí nghiệm thu; không khẳng định các lỗi này còn tồn tại ở SRS v1.2.
- **S01–S10:** chỉ có dấu tĩnh. Nếu bỏ phân tích và đọc mã, các lỗi ở bài lab có thể lọt vào phiên chạy hoặc công việc bảo trì; với S09–S10, chỉ chạy ESLint cũng không đủ.
- **F-01, F-02, F-03, F-10:** chỉ có dấu đơn vị theo hồ sơ lịch sử; nếu bỏ các ca đơn vị tương ứng, sai điều kiện đăng ký hoặc phí VIP có thể lọt sang tích hợp/người dùng nếu không có ca khác tương đương. Các bản vá được báo đã xác nhận ở Buổi 4; cần kiểm lại các ánh xạ đang mâu thuẫn trước khi kết luận chính thức.
- **F-05 và thông báo mật khẩu ngắn:** chỉ có dấu thủ công theo hồ sơ Buổi 2; nếu bỏ kiểm thử tay, sai thông báo có thể tới giao diện người dùng nếu bộ tự động không kiểm nguyên văn.
- **FR-05.2 và FR-05.5:** chỉ có dấu API trong bảng. Nếu bỏ các ca này, đơn có thể hiển thị/tính thiếu phí hoặc người dùng có thể hủy đơn người khác trước khi phát hiện. Điều này phản ánh phạm vi bộ ca hiện có, không phải nói unit/E2E không thể được viết để bắt lỗi.

FR-06.5 và FR-06.6 có cả dấu thủ công và API nên không phải lỗi chỉ một dấu. Các dòng F chưa có dấu không được tính là lỗi riêng của bất kỳ tầng nào.

## 3. Chi phí và giá trị từng tầng

Thời gian **viết** dưới đây là ước tính lập kế hoạch để so sánh khối lượng (không có nhật ký giờ thực tế), không phải số giờ đã được người làm xác nhận. Thời gian **chạy** lấy từ kết quả đã ghi, khác môi trường/phạm vi nên không so sánh như cùng máy.

| Tầng | Thời gian viết ước tính | Thời gian chạy đo được và phạm vi | Số lỗi chỉ có dấu của tầng trong bảng |
|---|---:|---|---:|
| Tĩnh | 1,5 giờ | Bước ESLint trên CI: 1 giây; không có số đo thời gian review SRS | 22 (R01–R12, S01–S10) |
| Đơn vị | 2 giờ | Jest trên CI: 0,95 giây / 46 ca | 4 theo báo cáo lịch sử, cần xác minh ánh xạ F |
| Thủ công | 2 giờ | Phiên exploratory CT-05: 25 phút theo `Buoi04-Exploratory.md`; không phải thời gian toàn bộ ca xác nhận/hồi quy | 2 theo báo cáo Buổi 2 |
| Đầu cuối | 2,5 giờ | Playwright trên CI: 8,3 giây / 11 ca khai báo, gồm 6 ca skip | 0 đã xác định; 3 ca đỏ chưa phân loại |
| API | 1,5 giờ | `npm run api` trên Windows: 5,6 giây / 20 ca | 2 |

Các số lỗi riêng là **theo dấu và chứng cứ hiện có**, không phải số lượng lỗi tầng khác không thể tìm thấy. Có tổng cộng 30 dòng lỗi/nhóm lỗi chỉ một dấu trong bảng: 22 tĩnh, 4 đơn vị, 2 thủ công và 2 API; 2 lỗi FR-06 có hai dấu. Các ước tính viết cần người thực hiện xác nhận lại; không cộng 25 phút một phiên thăm dò thành thời gian chạy của toàn bộ tầng thủ công.

Nếu chỉ còn một nửa thời gian, ưu tiên: **(1)** API phân quyền và tính tiền; **(2)** unit nhanh cho logic và biên; **(3)** review tĩnh đối với yêu cầu/mã thay đổi; **(4)** thủ công các hành trình rủi ro cao; **(5)** E2E luồng chính. Đây là lựa chọn theo rủi ro và bằng chứng hiện tại, không phải kết luận ROI đã đo. Không bỏ hẳn một tầng; vẫn cần phân loại 3 ca E2E đỏ và 6 ca skip.

## 4. Đánh giá chất lượng và khuyến nghị phát hành

### 4.1. Đối chiếu tiêu chí kết thúc

Trích `bai-nop/Buoi04-TestPlan.md`, mục 5:

1. **“100% các ca kiểm thử xác nhận cho 12 lỗi (F-01 đến F-12) và tính năng mới FR-06 đã được thực thi.”** Báo cáo Buổi 4 ghi nhận 12/12 lỗi được xác nhận và 6 ca FR-06 đã thực thi, trong đó 2 ca FR-06 thất bại. Hồ sơ trước đó có bất nhất về mã ca; chưa có bằng chứng chạy lại đầy đủ sau các thay đổi. Vì vậy **chưa xác minh được điều kiện 100% cho đợt hiện tại**; ca đã chạy không đồng nghĩa ca đã đạt.
2. **“Không còn lỗi nghiêm trọng (Blocker/Critical/High) nào chưa được xử lý; các lỗi còn tồn đọng (nếu có) thuộc mức Low/Medium và đã có kế hoạch xử lý.”** **Không đạt:** API xác nhận lỗi phân quyền FR-05.5, tài khoản khác nhận 200 và làm đơn chuyển `DA_HUY` thay vì 404, đánh giá Critical. FR-05.2 còn sai tổng; FR-06.5 và FR-06.6 còn sai (hai issue Buổi 4: #7, #8, mức Medium theo báo cáo). Không có bằng chứng các lỗi này đã được khắc phục và kiểm lại.

### 4.2. Số liệu hiện tại và quyết định

- API trên máy: **16/20 đạt, 4 thất bại**, 5,6 giây.
- Unit trên CI: **39/46 đạt, 7 thất bại**, 0,95 giây; không đồng nhất 7 ca đỏ với 7 lỗi sản phẩm.
- E2E trên CI: **2 đạt, 3 thất bại, 6 skip** trên 11 ca khai báo, 8,3 giây; chưa xác định nguyên nhân 3 ca đỏ.
- Bộ AI kiểm riêng: **9/11 đạt, 2 sai kỳ vọng**; không đưa vào CI. Coverage câu lệnh `shipping.js` là **91,66%**, không phải bằng chứng sản phẩm không lỗi.

**Kết luận: KHÔNG ĐỦ điều kiện phát hành.** Ít nhất một lỗi phân quyền Critical đang tái hiện và điều kiện thực thi đầy đủ chưa được chứng minh. Màu đỏ của CI phản ánh ca thất bại nhưng chưa đủ để suy ra mọi ca đỏ là lỗi sản phẩm.

### 4.3. Việc phải làm trước phát hành

1. Tạo/theo dõi issue cho FR-05.5, sửa kiểm tra chủ sở hữu đơn và chạy lại ca tấn công hai tài khoản cùng kiểm tra tác dụng phụ.
2. Sửa tổng tiền FR-05.2 và hồi quy cả trường hợp phí bằng 0 và khác 0; sửa FR-06.5/FR-06.6 rồi chạy lại API và ca thủ công, cập nhật issue #7–#8.
3. Rà soát 7 ca unit đỏ so với SRS và dữ liệu CSV; sửa ca sai, xác minh lại số âm/chỗ đặc tả chưa rõ, không xóa hay che lỗi để làm xanh CI.
4. Xác định nguyên nhân 3 ca E2E đỏ, hoàn thiện 6 ca skip, chạy lại với Chromium; thu thập báo cáo và ảnh minh chứng.
5. Xác minh lại 12 lỗi F-01–F-12 và FR-06, đối chiếu các bất nhất mã ca lịch sử, cập nhật trạng thái issue và kế hoạch cho lỗi tồn đọng; sau đó đánh giá lại hai tiêu chí kết thúc.

## 5. Tự đánh giá

**Ba điều làm tốt:** (1) đối chiếu SRS và bảng quyết định để xác định kết quả mong đợi; (2) kiểm thêm tác dụng phụ sau lời gọi hủy đơn bằng hai tài khoản; (3) giữ CI báo đỏ và đối chiếu với đường mốc thay vì che lỗi.

**Ba điều sẽ làm khác:** (1) ghi thời gian, phiên bản và log từ đầu để truy vết từng lỗi; (2) cập nhật dữ liệu/ca unit sau khi đặc tả thay đổi và xác minh mã ca không mâu thuẫn; (3) hoàn thiện E2E và phân loại lỗi trước khi kết luận từ màu CI.

**Kỹ thuật muốn học sâu:** kiểm thử bảo mật API và kiểm soát truy cập theo đối tượng, vì lỗi hủy đơn người khác không xuất hiện trong luồng giao diện thông thường và có tác động trực tiếp tới người dùng.

## 6. Danh mục chuyển giao trong một giờ

### 6.1. Đọc theo thứ tự

1. `README.md` và `docs/SRS-MiniShop-v1.2.md` (FR-02–FR-06); nắm dữ liệu mẫu và quy tắc.
2. `bai-nop/Buoi04-TestPlan.md`, `Buoi04-XacNhan-HoiQuy.md`, `Buoi04-Exploratory.md`: tiêu chí phát hành, 12 lỗi và hai issue FR-06.
3. `bai-nop/Buoi06-BaoCaoAPI-CI.md`, báo cáo này và `Buoi06-GenAI.md`: kết quả, giới hạn bằng chứng và danh sách ca đỏ.
4. `tests/api/`, `tests/unit/`, `tests/e2e/`, `.github/workflows/kiem-thu-day-du.yml`: cách dựng dữ liệu, assertion, ca skip và cấu hình CI.

### 6.2. Chuẩn bị và chạy

Trong môi trường Node.js >= 18.18, từ thư mục gốc repo:

```bash
npm ci
npx playwright install --with-deps chromium
npm test -- --runInBand
npm run api
npx playwright test tests/e2e
npm run test:ai -- --runInBand
npm run coverage:ai -- --runInBand
node scripts/kiem-tra-buoi06.js
```

Các lệnh unit, API, E2E và bộ AI có thể trả mã lỗi khác 0; chạy từng lệnh, lưu log và tiếp tục lệnh kế tiếp. Trên Windows có thể cài Chromium bằng `npx playwright install chromium`. Playwright tự khởi động server với chế độ reset dữ liệu; tránh để server thường chiếm cổng 3000. Kiểm tra runtime và phiên bản trước khi so sánh thời gian.

### 6.3. Những điều cần biết trước

- Đường mốc CI: unit **7 đỏ / 46**, API **4 đỏ / 20**, E2E **3 đỏ, 2 đạt, 6 skip / 11**. Đây là ca, không phải số lỗi sản phẩm độc lập; nguyên nhân unit/E2E cần đối chiếu, xem mục 7 báo cáo API/CI.
- Bộ AI có 2 ca sai kỳ vọng nên chạy riêng có chủ đích, không nhập vào `npm test`; không sửa kỳ vọng thành hành vi sai chỉ để CI xanh.
- [Lần chạy CI](https://github.com/luanpnm65/sot357-65131848/actions/runs/41923893525/job/126903127846) có artifact hai báo cáo HTML. [Lần thực nghiệm](https://github.com/luanpnm65/sot357-65131848/actions/runs/41926268417/job/126911365961) cố ý đổi ngưỡng khóa: API đỏ 4 → 6, unit 7 → 8, E2E 3 → 2; không gộp nhánh thử nghiệm và không kết luận lý do thay đổi E2E khi chưa có log chi tiết.
- Bản đồ lịch sử có các dòng chưa xác minh và các báo cáo Buổi 5 chưa điền; xác nhận trước khi dùng làm bằng chứng phát hành.
