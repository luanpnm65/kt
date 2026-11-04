# BUỔI 2 – BẢNG PHÂN HOẠCH TƯƠNG ĐƯƠNG VÀ GIÁ TRỊ BIÊN
- **Họ tên:Phạm Nguyễn Minh Luân**
- **MSSV:**65131848

## 1. Tuổi khi đăng ký (FR-01.3)

| Lớp tương đương | Hợp lệ? | Khoảng giá trị | Giá trị đại diện | Mã ca |
|---|---|---|---|---|
|Dưới 18 tuổi |Không |<18 |17 |TC-65131848-01 |
|Từ 18 đến 100 |Có |18<= n <=100  |18, 100 |TC-65131848-02 |
|Trên 100 |Không |>100 |101 |TC-65131848-03 |

**Giá trị biên cần kiểm tra:17, 18, 100, 101** 

## 2. Mật khẩu khi đăng ký (FR-01.4)

Lưu ý: yêu cầu này có **hai điều kiện** — độ dài và thành phần ký tự. Hãy phân hoạch cho cả hai.

| Lớp tương đương | Hợp lệ? | Mô tả | Giá trị đại diện | Mã ca |
|---|---|---|---|---|
|Hợp lệ hoàn toàn |Có |Có độ dài từ 8-20 kí tự |matkhau1 |TC-65131848-04 |
|Mật khẩu quá ngắn |Không |Độ dài dưới 8 kí tự(đủ chữ và số) |mk12345 |TC-65131848-05 |
|Mật khẩu quá dài |không |Độ dài quá 20 kí tự(đủ chữ và số) |matkhau12345678910111 |TC-65131848-06 |
|Mật khẩu thiếu thành phần kí tự |Không |Có độ dài từ 8-20 kí tự nhưng chỉ có chữ hoặc số |aabbccdd, 12345678910111213141 |TC-65131848-07 |

**Giá trị biên cần kiểm tra:matkhau1, mk12345, matkhau12345678910111, aabbccdd, 12345678910111213141** 

## 3. Số lượng một sản phẩm trong giỏ (FR-03.2)

| Lớp tương đương | Hợp lệ? | Khoảng giá trị | Giá trị đại diện | Mã ca |
|---|---|---|---|---|
|Dưới 1 |Không |<1(Gồm cả số âm) |0 |TC-65131848-08 |
|Từ 1 đến 99 |Có |1<= n <= 99 |1, 99 |TC-65131848-09 |
|Trên 99 |Không |>99 |100 |TC-65131848-10 |

**Giá trị biên cần kiểm tra:0, 1, 99, 100** 

## 4. Tổng số lượng sản phẩm trong giỏ (FR-03.4)

| Lớp tương đương | Hợp lệ? | Khoảng giá trị | Giá trị đại diện | Mã ca |
|---|---|---|---|---|
|Từ 200 trở xuống |Có |<201 |200 |TC-65131848-11 |
|Lớn hơn 200 |Không |>200 |201 |TC-65131848-12 |

**Giá trị biên cần kiểm tra:200, 201** 

## Ghi chú

**Các trường/tình huống SRS v1.1 chưa quy định rõ:**
1. **Dữ liệu sai kiểu:** Yêu cầu FR-01.3 (Tuổi) và FR-03.2 (Số lượng) chỉ quy định là số nguyên, nhưng không mô tả rõ hệ thống sẽ xử lý và báo lỗi cụ thể như thế nào nếu người dùng nhập ký tự chữ, ký tự đặc biệt, hoặc số thập phân.
2. **Bỏ trống dữ liệu:** FR-01.2 chỉ quy định "Họ tên là thông tin bắt buộc", không hề đề cập đến việc nếu để trống Email, Tuổi, Mật khẩu hay Số lượng sản phẩm thì hệ thống có cho phép hay không, và nếu chặn thì thông báo lỗi là gì.

**Hướng xử lý đã chọn:**
- **Không tự suy đoán hành vi của hệ thống.** Tạm thời xem các trường hợp nhập sai kiểu dữ liệu hoặc để trống là các lớp tương đương không hợp lệ
- Trong các ca kiểm thử này, kết quả mong đợi tạm ghi là "Hệ thống chặn và báo lỗi dữ liệu không hợp lệ/không được để trống".


