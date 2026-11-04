# BUỔI 4 – KẾ HOẠCH KIỂM THỬ (rút gọn)

- **Họ tên:** Phạm Nguyễn Minh Luân
- **MSSV:** 65131848
- **Phiên bản phần mềm:** MiniShop NTU v1.1.0
- **Tài liệu yêu cầu:** SRS v1.2

## 1. Mục tiêu đợt kiểm thử

Đợt kiểm thử này nhằm xác minh và đánh giá tính ổn định của phiên bản MiniShop NTU v1.1.0. Mục tiêu chính là trả lời câu hỏi: 12 lỗi từ F-01 đến F-12 đã thực sự được khắc phục hoàn toàn hay chưa, các tính năng mới (FR-06) có đáp ứng đúng đặc tả SRS v1.2 hay không, và việc sửa đổi mã nguồn có gây ra lỗi mới (tái phát) trên các chức năng hiện có của hệ thống hay không.

## 2. Phạm vi

| Nội dung | Có kiểm thử | Lý do |
|---|---|---|
| 12 lỗi nhóm phát triển khẳng định đã sửa | Có | Cần kiểm thử xác nhận (confirmation testing) để đảm bảo các lỗi F-01 đến F-12 đã được sửa đúng theo yêu cầu FR-01 đến FR-05. |
| Các chức năng không nằm trong danh sách sửa | Có | Cần kiểm thử hồi quy (regression testing) để đảm bảo việc sửa mã nguồn không làm hỏng các tính năng đang hoạt động bình thường. |
| Chức năng mới FR-06 | Có | Tìm kiếm và lọc sản phẩm là tính năng mới phát triển trong v1.1.0, cần kiểm thử toàn bộ các yêu cầu từ FR-06.1 đến FR-06.8. |
| Hiệu năng, bảo mật | Không | Đợt kiểm thử này tập trung vào kiểm thử chức năng (functional testing). Kiểm thử hiệu năng (NFR-01) và bảo mật chuyên sâu sẽ thực hiện ở giai đoạn sau. |

## 3. Rủi ro và mức ưu tiên

Liệt kê 3 vùng chức năng rủi ro cao nhất của đợt này, kèm lý do:

| # | Vùng chức năng | Mức rủi ro | Lý do | Thứ tự kiểm thử |
|---|---|---|---|---|
| 1 | Đặt hàng, Tính phí vận chuyển & Giảm giá (FR-04, FR-05) | Cao | Liên quan trực tiếp tới tiền bạc của khách hàng và doanh thu cửa hàng. Vùng này có nhiều lỗi bị sửa (F-09, F-10, F-11, F-12) làm tăng rủi ro phát sinh lỗi toán logic hoặc tái phát lỗi cũ. | 1 |
| 2 | Đăng ký & Đăng nhập / Khóa tài khoản (FR-01, FR-02) | Cao | Ảnh hưởng trực tiếp tới khả năng truy cập hệ thống của người dùng. Vùng này tập trung 5 lỗi đã sửa (F-01 đến F-05), bao gồm logic khóa tài khoản và đếm lỗi phức tạp. | 2 |
| 3 | Tìm kiếm và Lọc sản phẩm (FR-06) | Trung bình | Là chức năng mới hoàn toàn (N-01, N-02), tác động đến trải nghiệm mua sắm chính của người dùng và có sửa đổi cấu trúc dữ liệu sản phẩm trong kho (`store.js`). | 3 |

## 4. Chiến lược

| Loại kiểm thử | Phạm vi áp dụng | Công cụ |
|---|---|---|
| Kiểm thử xác nhận | Áp dụng cho 12 lỗi đã báo (F-01 đến F-12) để xác nhận lỗi đã được khắc phục hoàn toàn. | Jest (Unit Test), Kiểm thử thủ công (Manual Test) |
| Kiểm thử hồi quy | Áp dụng cho toàn bộ các luồng chức năng chính (Đăng ký, Đăng nhập, Giỏ hàng, Đặt hàng, Hủy đơn) để đảm bảo không phát sinh lỗi mới. | Jest / Automated Test Suite |
| Exploratory | Áp dụng cho Chức năng mới FR-06 (Tìm kiếm/Lọc) và các kịch bản kết hợp giỏ hàng để phát hiện các lỗi biên ngoài kịch bản. | Kiểm thử thủ công dựa trên kinh nghiệm |

## 5. Tiêu chí bắt đầu và kết thúc

**Tiêu chí bắt đầu (entry criteria):**
- Bản đóng gói MiniShop NTU v1.1.0 đã được triển khai thành công trên môi trường kiểm thử (staging/test environment).
- Đã nhận đầy đủ tài liệu SRS v1.2, Ghi chú phát hành v1.1.0 và bộ ca kiểm thử đã cập nhật.

**Tiêu chí kết thúc (exit criteria):**
- 100% các ca kiểm thử xác nhận cho 12 lỗi (F-01 đến F-12) và tính năng mới FR-06 đã được thực thi.
- Không còn lỗi nghiêm trọng (Blocker/Critical/High) nào chưa được xử lý; các lỗi còn tồn đọng (nếu có) thuộc mức Low/Medium và đã có kế hoạch xử lý.

## 6. Sản phẩm bàn giao

| Sản phẩm | Nơi nộp |
|---|---|
| Kế hoạch kiểm thử (`Buoi04-TestPlan.md`) | Repository GitHub của cá nhân/nhóm |
| Báo cáo kết quả kiểm thử (Test Execution Report) & Danh sách Bug mới | Repository GitHub / Hệ thống quản lý lỗi |