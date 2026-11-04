# BUỔI 4 – KIỂM THỬ THĂM DÒ VÀ BÁO CÁO LỖI

- **Họ tên:** Phạm Nguyễn Minh Luân
- **MSSV:** 65131848

## 1. Phiên kiểm thử thăm dò (session-based testing)

| Mục | Nội dung |
|---|---|
| Mã charter được giao | CT-05 |
| Nội dung charter | Thăm dò đăng nhập và khóa tài khoản: chuỗi đăng nhập sai và đúng xen kẽ, hành vi trong và sau thời gian khóa. |
| Thời gian bắt đầu | 11:00 |
| Thời gian kết thúc | 11:25 |
| Thời lượng thực tế | 25 phút |

### 1.1. Nhật ký phiên

Ghi theo dòng thời gian, kể cả những thử nghiệm không phát hiện gì.

| Thời điểm | Đã thử điều gì | Quan sát được |
|---|---|---|
| 11:00 | Chuẩn bị dữ liệu tài khoản thử nghiệm (`user1@ntu.edu.vn`), kiểm tra trạng thái ban đầu là S1 (Hoạt động), đếm sai = 0. | Hệ thống sẵn sàng, tài khoản đăng nhập bình thường. |
| 11:03 | Nhập sai mật khẩu 1 lần, sau đó nhập ĐÚNG mật khẩu ở lần thứ 2. | Đăng nhập thành công. Kiểm tra lại trạng thái: bộ đếm sai được reset về 0 (Đúng theo F-04). |
| 11:07 | Nhập sai mật khẩu 2 lần liên tiếp, sau đó nhập ĐÚNG mật khẩu ở lần thứ 3. | Đăng nhập thành công, không bị khóa tài khoản. |
| 11:11 | Nhập sai mật khẩu 3 lần liên tiếp để kích hoạt trạng thái bị khóa S3. | Báo lỗi "Tài khoản đã bị khóa, vui lòng thử lại sau 15 phút". Tài khoản chuyển sang S3. |
| 11:15 | Thử nhập ĐÚNG mật khẩu khi tài khoản đang trong 15 phút bị khóa. | Đăng nhập thất bại. Hệ thống vẫn báo lỗi bị khóa và giữ nguyên trạng thái S3. |
| 11:19 | Mô phỏng hết 15 phút khóa , nhập lại mật khẩu đúng. | Đăng nhập thành công. Tài khoản tự động mở khóa và chuyển về trạng thái S1, bộ đếm sai reset về 0. |
| 11:22 | Nhập sai mật khẩu 2 lần liên tiếp sau đó nhập đúng và nhập sai tiếp 2 lần  | Tài khoản đăng nhập thành công. |
### 1.2. Phân bổ thời gian

| Hoạt động | Ước lượng % thời gian |
|---|---|
| Thiết lập dữ liệu, chuẩn bị | 15% |
| Thăm dò theo charter | 75% |
| Ghi chép | 10% |

### 1.3. Phát hiện

| # | Hiện tượng | Có tái hiện được không | Mức nghiêm trọng dự kiến | Đã báo thành issue |
|---|---|---|---|---|
| 1 | Đăng nhập sai 3 lần liên tiếp kích hoạt khóa tài khoản thành công và tự động mở khóa sau 15 phút đúng theo đặc tả SRS v1.2. | Có | Hành vi đúng | Không |

### 1.4. Câu hỏi còn bỏ ngỏ

Những chỗ nghi ngờ nhưng chưa đủ thời gian hoặc chưa đủ căn cứ để kết luận:

1. 
2. 

## 2. Báo cáo lỗi trên GitHub Issues

Tạo **ít nhất 2 issue** trong repo của mình theo mẫu `.github/ISSUE_TEMPLATE/bao-cao-loi.md`.

| # | Tiêu đề issue | Đường dẫn issue | Severity | Priority | Nguồn phát hiện |
|---|---|---|---|---|---|
| 1 | Lỗi thuật toán sắp xếp giá giảm dần trên màn hình lọc sản phẩm (FR-06.5) | `https://github.com/luanpnm65/sot357-65131848/issues/7` | Medium | High | Kiểm thử hồi quy FR-06 |
| 2 | Lỗi logic hiển thị sản phẩm hết hàng khi bật cờ "Chỉ còn hàng" (FR-06.6) | `https://github.com/luanpnm65/sot357-65131848/issues/8` | Medium | High | Kiểm thử hồi quy FR-06 |

### 2.1. Giải thích lựa chọn Severity và Priority

Lựa chọn cho Issue #1 (Lỗi sắp xếp giá giảm dần):
- Severity (Medium): Lỗi này làm sai lệch thứ tự hiển thị dữ liệu kinh doanh (sản phẩm giá cao hơn lại hiển thị sau sản phẩm giá thấp), ảnh hưởng trực tiếp đến trải nghiệm tìm kiếm của người mua nhưng không làm sập hệ thống hay mất mát dữ liệu.
- Priority (High): Do tính năng tìm kiếm và lọc sản phẩm là điểm chạm cốt lõi của khách hàng trên trang thương mại điện tử, lỗi hiển thị sai thứ tự sorting dễ gây mất niềm tin và cần được nhóm phát triển ưu tiên sửa ngay trước khi release phiên bản v1.1.0.
Lựa chọn cho Issue #2 (Lỗi ô chọn hiển thị sản phẩm còn hàng):
- Severity (Medium): Lỗi này làm sai lệch dữ liệu hiển thị nhưng không gây mất mát dữ liệu
- Priority (High): Do ảnh hưởng trực tiếp tới trải nghiệm của người dùng.

### 2.2. Trường hợp Severity và Priority lệch nhau

Trong quá trình kiểm thử, lỗi *Sai chính tả tên thương hiệu ở chân trang chủ* có **Severity rất thấp** (chỉ là lỗi hiển thị text tĩnh không ảnh hưởng logic) nhưng lại có **Priority cao** (vì hiển thị ngay trang chủ, ảnh hưởng trực tiếp đến uy tín thương hiệu trước mắt khách hàng và đối tác). Ngược lại, lỗi *Tràn bộ nhớ đệm log hệ thống khi chạy liên tục 72 giờ* có **Severity rất cao** (Crash hệ thống) nhưng **Priority thấp** (do hệ thống thực tế chỉ chạy quy mô nhỏ và được khởi động lại hàng ngày).

## 3. Vòng đời lỗi

Ghi lại phản hồi của nhóm phát triển (do giảng viên đóng vai) với các issue đã gửi.

| Issue | Trạng thái nhận được | Phản hồi | Hành động tiếp theo của kiểm thử viên |
|---|---|---|---|
|   |   |   |   | 

## 4. Kết luận đợt kiểm thử

Dựa trên tiêu chí kết thúc đã nêu trong kế hoạch kiểm thử, trả lời: **bản 1.1 có đủ điều kiện phát hành không?** 

**Không.** Mặc dù nhóm phát triển đã khắc phục thành công toàn bộ 12 lỗi cốt lõi từ phiên bản v1.0 (F-01 đến F-12), kết quả kiểm thử thực tế trên tính năng lọc sản phẩm mới (FR-06) vẫn ghi nhận 2 lỗi chức năng quan trọng chưa đạt (`Fail` ở các ca sắp xếp giá giảm dần, lọc tồn kho). Do đó, phiên bản v1.1.0 chưa đạt đủ tiêu chí kết thúc để đưa lên môi trường Production, cần yêu cầu nhóm phát triển hoàn thiện nốt các lỗi lọc FR-06 và kiểm thử lại toàn bộ trước khi phát hành chính thức.