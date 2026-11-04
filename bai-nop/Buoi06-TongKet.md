# BUỔI 6 – TỔNG KẾT ĐỢT KIỂM THỬ

- **Họ tên:** Phạm Nguyễn Minh Luân
- **MSSV:** 65131848

## 1. Hồ sơ kiểm thử
| Buổi | Hiện vật | Số lượng / đường dẫn |
|---|---|---|
| 1 | Review SRS, khám phá và phân tích tĩnh | 4 báo cáo `bai-nop/Buoi01-*.md`; 12 phát hiện review |
| 2 | Thiết kế ca, dữ liệu, quyết định, phân hoạch, pairwise, trạng thái và truy vết | 7 file `bai-nop/Buoi02-*` |
| 3 | Jest và báo cáo | 4 file test unit/ví dụ chạy trong Jest; 2 báo cáo `bai-nop/Buoi03-*` |
| 4 | Kế hoạch, xác nhận hồi quy và exploratory | 3 báo cáo `bai-nop/Buoi04-*`; bảng 12 lỗi F-01–F-12 |
| 5 | Khung E2E và báo cáo | 4 file `tests/e2e/*.spec.js`, 2 báo cáo `bai-nop/Buoi05-*`; còn ca skip và báo cáo chưa điền |
| 6 | API, CI, phản biện, tổng kết | 20 ca `tests/api/`; workflow và 3 báo cáo Buoi06; 11 ca AI ở `tests/gen-ai/` |

## 2. Bản đồ lỗi theo tầng
X chỉ đánh dấu khi có chứng cứ trong hiện vật; trống không có nghĩa tầng ấy không thể phát hiện. Các phát hiện tĩnh thuộc SRS v1.0, không khẳng định còn tồn tại ở v1.2. Dùng mã R của bảng review Buổi 1 và tên lỗi v1.1 để không nhầm các phiên bản.

| Phát hiện | Tĩnh | Đơn vị | Thủ công | E2E | API |
|---|---|---|---|---|---|
| R01 mâu thuẫn tuổi | X | | | | |
| R02 mật khẩu mơ hồ | X | | | | |
| R03 mâu thuẫn số lần khóa | X | | | | |
| R04 giới hạn giỏ mơ hồ | X | | | | |
| R05 mâu thuẫn ngưỡng phí | X | | | | |
| R06 thiếu định nghĩa khách thân thiết | X | | | | |
| R07 email ngoài phạm vi | X | | | | |
| R08 voucher thiếu đặc tả | X | | | | |
| R09 thời gian phản hồi không định lượng | X | | | | |
| R10 độ sẵn sàng không khả thi | X | | | | |
| R11 sai phí ngoại thành trong phụ lục | X | | | | |
| R12 thuật ngữ VIP không nhất quán | X | | | | |
| FR-06.5 sắp xếp giảm sai | | | X | | X |
| FR-06.6 còn hàng sai | | | X | | X |
| FR-05.2 thiếu phí trong tổng | | | | | X |
| FR-05.5 hủy đơn người khác | | | | | X |

Nguồn: `Buoi01-Phan2-BienBanReview.md`, `Buoi04-XacNhan-HoiQuy.md` mục 3 và ca API Buổi 6. Các lỗi F-01–F-12 lịch sử và những lỗi unit Buổi 3 được mô tả ở báo cáo trước, nhưng không gộp chúng thành cùng lỗi với R01–R12 chỉ vì trùng số; chứng cứ lịch sử có điểm không nhất quán, cần đối chiếu bản chạy gốc trước khi lập bản đồ hoàn chỉnh. Bảng trên **chưa** bao quát tất cả lỗi lịch sử.

R01–R12 chỉ có dấu tĩnh: bỏ review thì lỗi yêu cầu có thể đi xuống thiết kế và mã. FR-05.2, FR-05.5 chỉ có chứng cứ API ở bản hiện tại: bỏ API thì sai tiền/phân quyền có thể lọt đến người dùng; không có nghĩa E2E hoặc unit khác về nguyên tắc không thể được thiết kế để bắt chúng. E2E Buổi 5 chưa có kết quả đã điền, không tự đánh dấu X.

## 3. Chi phí và giá trị
| Tầng | Thời gian viết | Thời gian chạy có chứng cứ | Số lỗi riêng theo bảng |
|---|---|---|---:|
| Tĩnh | Không có nhật ký, chưa thể ước lượng đáng tin | ESLint có chạy nhưng chưa đo thời gian riêng; review thủ công không có số đo | 12 |
| Đơn vị | Không có nhật ký | Jest 0,591 giây, 46 ca | 0 trong bảng có chứng cứ |
| Thủ công | Không có nhật ký | Không có số đo trong báo cáo | 0 |
| E2E | Không có nhật ký | Chưa đo hợp lệ: thiếu Chromium | 0 |
| API | Không có nhật ký | 6,3 giây / 20 ca | 2 |

Không dựng số giờ viết hoặc thời gian chạy thủ công. Nếu còn một nửa thời gian, ưu tiên API phân quyền và tiền, unit nhanh cho nghiệp vụ, review tĩnh các thay đổi yêu cầu, sau đó hồi quy thủ công rủi ro cao và E2E luồng chính; đây là ưu tiên theo rủi ro, không phải kết luận ROI đã đo. FR-06 được cả thủ công lẫn API phát hiện.

## 4. Khuyến nghị phát hành
Kế hoạch Buổi 4 mục 5 yêu cầu: (1) 100% ca xác nhận 12 lỗi F-01–F-12 và tính năng FR-06 đã thực thi; (2) không còn Blocker/Critical/High chưa xử lý; lỗi Low/Medium có kế hoạch. Báo cáo Buổi 4 ghi 12/12 lỗi đã xác nhận, FR-06 có 6 ca, 2 thất bại. Nhưng hiện không có bằng chứng chạy lại đầy đủ sau các thay đổi, E2E còn 6 skip. Điều kiện (1) cho đợt hiện tại chưa xác minh; điều kiện (2) **không đạt** do lỗi phân quyền Critical được API chứng minh (200 và đổi trạng thái đơn người khác). Ngoài ra API 4/20 đỏ; 7/46 ca unit đỏ cần phân loại lại, không mặc định là 7 lỗi sản phẩm.

**Không đủ điều kiện phát hành.** Thứ tự: (1) đăng issue và sửa phân quyền, kiểm xác nhận và hồi quy bảo mật; (2) sửa tổng tiền, sắp xếp và tồn kho, xác nhận FR-05/06; (3) rà soát 7 ca unit theo SRS, cập nhật ca lỗi thời và điều tra đầu vào âm; (4) hoàn thiện E2E bị skip, cài Chromium, chạy đủ và lấy bằng chứng CI; (5) chạy lại toàn bộ tiêu chí kết thúc, xử lý/duyệt rủi ro còn tồn đọng trước khi quyết định lại.

## 5. Tự đánh giá
Điểm tốt: đối chiếu SRS để đặt oracle, kiểm cả tác dụng phụ phân quyền, giữ ca đỏ thay vì che lỗi. Sẽ làm khác: cập nhật unit sau thay đổi yêu cầu, hoàn thiện E2E và báo cáo từ Buổi 5, ghi thời gian và bằng chứng ngay khi chạy. Muốn học sâu kiểm thử bảo mật API vì phân quyền chéo dễ bị UI che khuất.

## 6. Chuyển giao
1. Đọc `docs/SRS-MiniShop-v1.2.md`, `bai-nop/Buoi04-TestPlan.md`, báo cáo xác nhận Buổi 4, rồi `bai-nop/Buoi06-BaoCaoAPI-CI.md` và báo cáo AI.
2. Node >=18.18: `npm ci`; `npx playwright install --with-deps chromium` ở máy được phép truy cập CDN; `npm test -- --runInBand`; `npm run api`; `npx playwright test tests/e2e`; `npm run coverage:ai -- --runInBand`; `node scripts/kiem-tra-buoi06.js`.
3. API có 4 ca đỏ sản phẩm; unit có 7 ca đỏ cần phân loại; bộ AI cố ý 2 ca sai kỳ vọng và tách khỏi `npm test`. E2E còn 6 skip; môi trường hiện tại không tải được Chromium nên kết quả sản phẩm E2E chưa xác định. Reset test bật tự động qua Playwright, không chạy server thường chiếm cổng 3000.
4. Workflow có 9 bước; [lần chạy GitHub](https://github.com/luanpnm65/kt/actions/runs/41906926693) đỏ, artifact tải lên thành công; chưa mở được artifact trong môi trường này. Không coi kết quả local là CI. Thực nghiệm `thu-ci` chưa thực hiện và không được gộp vào nhánh làm bài.
