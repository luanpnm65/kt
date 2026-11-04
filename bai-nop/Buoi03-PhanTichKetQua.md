# BUỔI 3 – PHÂN TÍCH KẾT QUẢ KIỂM THỬ ĐƠN VỊ

- **Họ tên:**Phạm Nguyễn Minh Luân
- **MSSV:**65131848

## 1. Tổng hợp kết quả chạy `npm test`

| Chỉ số | Giá trị |
|---|---|
| Tổng số ca kiểm thử |32 |
| Số ca đạt |25 |
| Số ca thất bại |7 |

## 2. Phân tích từng ca thất bại

Với mỗi ca thất bại, xác định nguyên nhân thuộc một trong ba loại:

- **LỖI MÃ NGUỒN** – mã nguồn không làm đúng yêu cầu trong SRS v1.1;
- **LỖI CA KIỂM THỬ** – ca kiểm thử của mình hiểu sai yêu cầu hoặc ghi sai kết quả mong đợi;
- **YÊU CẦU CHƯA RÕ** – SRS không đủ căn cứ để kết luận bên nào sai.

| Mã ca | Hàm | Kết quả mong đợi | Kết quả thực tế | Phân loại nguyên nhân | Căn cứ (mã yêu cầu SRS v1.1) |
|---|---|---|---|---|---|
| TC-65131848-01 | validateRegistration | KHONG_HOP_LE | HOP_LE | LỖI MÃ NGUỒN | **FR-01.4**: Mật khẩu phải chứa ít nhất 1 chữ cái và 1 chữ số. Mã nguồn thiếu kiểm tra điều kiện này. |
| TC-65131848-08 | validateRegistration | KHONG_HOP_LE | HOP_LE | LỖI MÃ NGUỒN | **FR-01.3**: Tuổi phải từ 18 đến 100. Mã nguồn đang cho phép tuổi 17. |
| TC-65131848-09 | validateRegistration | KHONG_HOP_LE | HOP_LE | LỖI MÃ NGUỒN | **FR-01.4**: Mật khẩu phải có từ 8 đến 20 ký tự. Mã nguồn đang cho phép mật khẩu 21 ký tự (pwd.length > 21). |
| TC-65131848-10 | validateRegistration | KHONG_HOP_LE | HOP_LE | LỖI MÃ NGUỒN | **FR-01.4**: Mật khẩu phải có từ 8 đến 20 ký tự. Mã nguồn thiếu kiểm tra độ dài > 20 ký tự. |
| TC-65131848-12 | validateQuantity | HOP_LE | KHONG_HOP_LE | LỖI MÃ NGUỒN | **FR-03.2**: Số lượng từ 1 đến 99 là hợp lệ. Mã nguồn `validateQuantity` lại nhận cả `qty = 0`. |
| TC-65131848-13 | validateQuantity | HOP_LE | KHONG_HOP_LE |LỖI MÃ NGUỒN | FR-03.2: Số lượng từ 1 đến 99 là hợp lệ. Với qty = 99, mã nguồn trả về false (KHONG_HOP_LE) do lỗi lập trình sai điều kiện biên |
| TC-65131848-22 | calcShippingFee | 0 | 35000 | LỖI MÃ NGUỒN | **FR-04.3**: Thành viên VIP được miễn phí vận chuyển ở mọi khu vực (bao gồm ngoại thành). Mã nguồn `calcShippingFee` chỉ cho miễn phí VIP ở `noi-thanh`. |

## 3. Đối chiếu với kết quả chạy tay ở Buổi 2

**3.1. Ca nào phát hiện được ở mức hàm mà không kiểm được qua giao diện? Vì sao?**
- Các ca kiểm thử giá trị biên hoặc dữ liệu không hợp lệ (như truyền sai kiểu dữ liệu, chuỗi rỗng, ...). Giao diện thường đã chặn các trường hợp này bằng mã HTML hoặc giới hạn ô nhập (`min`, `max`, `maxlength`). Ở mức hàm đơn vị (`unit test`), ta gọi trực tiếp hàm service nên có thể truyền bất kỳ dữ liệu bất kỳ nào, giúp phát hiện sớm các lỗ hổng logic ẩn giấu trong mã nguồn mà giao diện vô tình che khuất.

**3.2. Ca nào phải kiểm qua giao diện mới thấy, kiểm ở mức hàm không đủ?**
- Các ca liên quan đến trải nghiệm người dùng, định dạng hiển thị tiền tệ theo chuẩn Việt Nam (ví dụ: `150.000đ` theo NFR-05), tính đáp ứng linh hoạt trên các thiết bị màn hình nhỏ (NFR-04), hoặc sự phối hợp chuyển tiếp mượt mà giữa nhiều thành phần giao diện khác nhau trên trang web.

**3.3. Nêu một ưu điểm và một hạn chế của kiểm thử đơn vị so với chạy tay trên giao diện.**
- *Ưu điểm:* Thực thi hoàn toàn tự động, tốc độ cực kỳ nhanh chóng và có thể kiểm tra sâu đến từng nhánh logic nhỏ nhất của từng hàm riêng lẻ mà không phụ thuộc vào trạng thái hiển thị giao diện
- *Hạn chế:* Không thể kiểm tra được giao diện trực quan, tính thẩm mỹ cũng như trải nghiệm thực tế của người dùng cuối khi thao tác tương tác trên ứng dụng

## 4. Chất lượng bộ ca thiết kế ở Buổi 2
Khi chuyển bộ ca sang mã Jest, có ca nào phải sửa lại không?
Khi chuyển bộ ca sang mã Jest, các ca kiểm thử đã hoạt động ổn định, cấu trúc dữ liệu CSV khớp với mô tả hàm. Tuy nhiên, có một số ca biên (như TC-65131848-13) có sự lệch giữa kết quả mong đợi trên giấy và quy định nghiệp vụ thực tế trong SRS v1.1 do logic mã nguồn xử lý điều kiện biên, dẫn đến việc cần xác định rõ nguyên nhân để phân loại chính xác.
| Mã ca | Vấn đề gặp phải khi chuyển thành mã | Đã sửa như thế nào |
|---|---|---|
|TC-65131848-13 |Ca kiểm thử số lượng 99 đạt biên hợp lệ nhưng kết quả thực tế trả về báo lỗi do logic mã nguồn chưa chuẩn. |Đã đối chiếu lại theo tiêu chuẩn FR-03.2 của SRS và ghi nhận đúng nguyên nhân là Lỗi mã nguồn. |
| | | |

Nếu không phải sửa ca nào, ghi rõ "không có" và nêu lý do bộ ca đã đủ rõ.

