# BUỔI 1 – PHẦN 1: CÀI ĐẶT VÀ KHÁM PHÁ HỆ THỐNG

- **Họ tên:Phạm Nguyễn Minh Luân** 
- **MSSV:65131848** 
- **Lớp:65.CNTT-2** 

## 1. Môi trường

| Mục | Kết quả |
|---|---|
| Phiên bản Node.js (`node -v`) | v24.14.1|
| Phiên bản npm (`npm -v`) |11.11.0 |
| Phiên bản Git (`git --version`) |git version 2.55.0.windows.5 |
| Hệ điều hành |Windows |
| Kết quả `npm run lint` (số error / warning) |✖ 19 problems (16 errors, 3 warnings) |

Ảnh chụp màn hình (chèn ảnh hoặc đặt file ảnh trong thư mục `bai-nop/hinh/` rồi dẫn link):

- Trang web MiniShop NTU: 
- Terminal đang chạy server: 

## 2. Kịch bản 1 – Đăng ký với tuổi 17

| Câu hỏi | Trả lời |
|---|---|
| Kết quả thực tế |Thành công |
| Kết quả mong đợi (theo SRS, ghi rõ mục) |Thất bại,2.2 |
| Có phải failure không? Vì sao? | Có. Vì tài khoản được tạo với tuổi cung cấp là 17 sai với SRS là 18)|
| Defect nằm ở đâu (file, số dòng, đoạn mã) |registration.js, dòng 20,  else if (ageNumber < 17 || ageNumber > 100) |
| Error nào của con người có thể đã gây ra defect này? |sai ở giá trị biên, sai ở  < |

## 3. Kịch bản 2 – Đơn hàng 500.000đ, nội thành

| Câu hỏi | Trả lời |
|---|---|
| Tạm tính |500.000đ |
| Phí vận chuyển hệ thống tính |20.000đ |
| Theo FR-04.2, phí đúng phải là |20.000đ |
| Theo Phụ lục A, phí đúng phải là |0đ |
| Hệ thống đúng hay sai? Có kết luận được không? Vì sao? |Chưa thể kết luận, vì bản thân tài liệu SRS đang bị mâu thuẫn giữa mục FR-04.2 - yêu cầu trên 500.000đ và Phụ lục A - 500.000đ được 0đ. Mã nguồn file shipping.js, dòng 17: if (subtotal > FREE_SHIPPING_THRESHOLD)) đang làm đúng theo mô tả của FR-04.2 nhưng lại sai so với Phụ lục A.|
| Defect (nếu có) nằm ở đâu: mã nguồn hay tài liệu? |Defect nằm ở Tài liệu đặc tả |

## 4. Kịch bản 3 – Tự khám phá

| Mục | Nội dung |
|---|---|
| Chức năng | Đăng nhập và khóa tài khoản khi nhập sai mật khẩu|
| Các bước thực hiện | 1. Đăng ký/Sử dụng một tài khoản thành viên <br> 2. Nhập email và nhập sai mật khẩu liên tiếp 3 lần <br> 3. Kiểm tra trạng thái tài khoản và thông báo trả về|
| Dữ liệu sử dụng |tk: a12345@gmail.com, mk 12345678(nhập sai 3 lần)|
| Kết quả mong đợi (căn cứ: mục nào của SRS) | Theo mục NFR-03, tài khoản phải bị khóa sau 5 lần đăng nhập sai|
| Kết quả thực tế |Tài khoản bị khóa sau 3 lần đăng nhập sai liên tiếp |
| Nhận định (failure? mức độ?) |mâu thuẫn giữa yêu cầu chức năng và yêu cầu phi chức năng |
