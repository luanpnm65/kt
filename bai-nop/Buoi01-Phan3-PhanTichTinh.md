# BUỔI 1 – PHẦN 3: PHÂN TÍCH TĨNH VỚI ESLINT

- **Họ tên:Phạm Nguyễn Minh Luân** 
- **MSSV:65131848** 

## 1. Kết quả chạy công cụ

Lệnh: `npm run lint:lab`

| Tổng số problem | Số error | Số warning |
|---|---|---|
|19 |16 |3 |

Ảnh chụp kết quả: 

## 2. Bảng phân tích

Phân loại: **DEFECT** (chắc chắn gây sai/dừng chương trình) · **SMELL** (khó bảo trì, tiềm ẩn rủi ro) · **CHẤP NHẬN** (không cần sửa, giải thích lý do)

| STT | Dòng | Rule | Vấn đề (giải thích bằng lời của bạn) | Hậu quả nếu chạy chương trình | Phân loại | Cách sửa |
|---|---|---|---|---|---|---|
| 1 |9:7 | no-unused-vars| Biến 'fs' khởi tạo nhưng không được sử dụng |Tốn bộ nhớ không cần thiết, làm mã nguồn rối |SMELL |Xóa dòng const fs = require('fs'); |
| 2 |14:3 | no-dupe-keys|Khai báo trùng lặp thuộc tính noiThanh |Phím noiThanh thứ hai (25000) sẽ ghi đè phím đầu tiên (20000), làm sai giá trị cấu hình |DEFECT |Xóa thuộc tính bị lặp noiThanh: 25000, |
| 3 |23:10|no-undef |Sử dụng biến totl chưa từng được khai báo (gõ sai chính tả từ total). |Không chạy được chương trình |DEFECT |Sửa lại tên biến 'totl' thành 'total' |
| 4 |28:11 |eqeqeq |Sử dung sai phép so sánh |Có thể trả về sai giá trị |SMELL |Sửa qty == '0' thành qty === '0'|
| 5 |31:7 |no-cond-assign |Dùng phép gán = trong điều kiện if (qty = 100) thay vì phép so sánh |Biến qty luôn bị gán lại thành 100 nên điều kiện if luôn trả về true |DEFECT |Sửa qty = 100 thành qty === 100 (hoặc > 99) |
| 6 |39:24 |valid-typeof |Gõ sai tên kiểu dữ liệu trong typeof: 'numbr' thay vì 'number' |Điều kiện typeof price === 'numbr' luôn trả về false |DEFECT | Sửa 'numbr' thành 'number'
|
| 7 |42:7 |use-isnan | So sánh trực tiếp price === NaN thay vì dùng hàm Number.isNaN()|Trong JS, NaN === NaN luôn trả về false, làm cho câu lệnh kiểm tra NaN bị vô hiệu|DEFECT |Sửa price === NaN thành Number.isNaN(price) |
| 8 |54:5 |no-fallthrough |Nhánh case 'noi-thanh': không có lệnh break, trôi lệnh xuống nhánh dưới |fee luôn bị ghi đè bởi giá trị của ngoaiThanh dù zone là 'noi-thanh' |DEFECT |Thêm break; vào cuối nhánh case 'noi-thanh': |
| 9 |68:14 |no-dupe-else-if |Điều kiện customer.type === 'VIP' bị trùng lặp ở cả 2 nhánh if và else if liên tiếp |Nhánh else if phía sau sẽ bị chết không chạy được nhánh đó | DEFECT|Sửa điều kiện nhánh else if thành customer.type === 'THAN_THIET' |
| 10 |72:3  |no-unreachable |Lệnh console.log(...) nằm phía sau câu lệnh return 0; |Câu lệnh console.log không bao giờ được thực thi|SMELL |Chuyển console.log lên trước câu lệnh return 0; hoặc xóa bỏ |
| 11 |77:7 | no-unsafe-negation |Toán tử phủ định ! áp dụng sai thứ tự ưu tiên |Biểu thức đánh giá !productId trước (trả về boolean) rồi mới kiểm tra in cart, gây sai logic |DEFECT |Sửa thành !(productId in cart) |
| 12 |87:15|no-empty |Khối catch (e) để trống không xử lý ngoại lệ |Bỏ qua lỗi âm thầm khi chuỗi JSON sai định dạng, gây khó khăn cho việc truy vết lỗi |SMELL |Thêm xử lý lỗi hoặc trả về null/ghi log trong khối catch |
| 13 |87:12 |no-unused-vars |biến e không được sử dụng |Gây tốn bộ nhớ |SMELL |In ra lỗi trong catch |
| 14 |21:5 | no-unused-vars|biến total không được sử dung do bị gi sai tên |Giá trị của biến total không được trả về |DEFECT |Đã được sửa |
| 15 |31:7 | no-constant-condition |Lỗi điều kiện luôn đúng |Luôn trả kết quả là TRUE |DEFECT |Đã sửa ở lỗi 5 |
| 16 |72:3 |no-console | Lệnh console.log(...) nằm phía sau câu lệnh return 0; |Câu lệnh console.log không bao giờ được thực thi |SMELL |Đã sửa ở lỗi 10 |
| 17 |92:1 |complexity |Độ phức tạp của hàm xepHangKhachHang là 9 nhưng độ phức tạp tối đa của ESLint là 5 |Mã nguồn trở nên phức tạp, khó đọc, khó kiểm thử hết các nhánh logic và dễ phát sinh lỗi khi bảo trì |SMELL |Tách bớt nhánh điều kiện thành hàm phụ nhỏ hơn hoặc dùng cấu trúc tra bảng, đơn giản hóa logic điều kiện |
| 18 |116:3 |no-console |Sử dụng lệnh console.log() trực tiếp trong hàm nghiệp vụ tinhTongDon | Làm bẩn nhật ký console hệ thống khi chạy thực tế và ảnh hưởng nhẹ đến hiệu năng| SMELL| Xóa bỏ lệnh console.log() hoặc thay thế bằng thư viện ghi log chuyên dụng|
| 19 |121:31 |no-unused-vars |Khai báo tham số kyHieu trong hàm dinhDangTien nhưng không được sử dụng |Dư thừa tham số truyền vào |SMELL |Sử dụng tham số kyHieu trong chuỗi trả về (hoặc xóa tham số nếu không cần) |

## 3. Sau khi sửa

Kết quả `npm run lint:lab` sau khi sửa (ảnh chụp hoặc dán kết quả):

✖ 1 problem (0 errors, 1 warning)

## 4. Lỗi logic ESLint không phát hiện được

| STT | Hàm | Mô tả lỗi | Căn cứ (chú thích hàm / mục SRS) | Vì sao ESLint không phát hiện được? |
|---|---|---|---|---|
| 1 |tinhTongDon |Công thức tính toán ở dòng lệnh return bị sai phép tính: tamTinh - giamGia - phi (đang trừ phí vận chuyển thay vì cộng phí vận chuyển) |Mục FR-05.2: "Tổng tiền phải trả = Tạm tính − Giảm giá + Phí vận chuyển" và chú thích của hàm |ESLint chỉ kiểm tra cú pháp và quy tắc mã nguồn (Static Syntax), không hiểu được ý nghĩa nghiệp vụ (Business Logic) hay ý đồ tính toán của bài toán toán học |
| 2 |kiemTraSoLuong |Hàm trả về true cho các giá trị nằm ngoài phạm vi cho phép như số âm hoặc số lớn hơn 99 (ví dụ qty = 150 hay qty = -5 hàm vẫn trả về true) |Chú thích hàm: "Số lượng hợp lệ: số nguyên từ 1 đến 99" và FR-03.2 |ESLint không thể phân tích luồng điều kiện logic xem có bao phủ hết toàn bộ tập giá trị đầu vào theo yêu cầu nghiệp vụ hay chưa (mã hợp lệ về mặt cú pháp nhưng thiếu điều kiện ràng buộc) |

## 5. (Không bắt buộc) Nhận xét về phân tích tĩnh trong trình soạn thảo

