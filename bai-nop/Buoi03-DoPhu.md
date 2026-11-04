# BUỔI 3 – BÁO CÁO BAO PHỦ MÃ NGUỒN
- **Họ tên:** Phạm Nguyễn Minh Luân
- **MSSV:** 65131848

## 1. Kết quả đo lần đầu (chỉ với ca của Phần 1)

Chạy `npm run coverage` **trước khi** bổ sung ca ở Phần 3.

| File | % Statements | % Branch | % Functions |
|---|---|---|---|
| src/services/shipping.js |91.66 |84.61 |100 |
| src/services/cart.js |65.62 |53.33 |70 |
| src/services/registration.js |56 |61.53 |50 |
| src/services/auth.js |53.33 |37.5 |100 |

## 2. Các nhánh chưa được phủ

Mở `coverage/lcov-report/index.html` để xem chi tiết. Liệt kê các nhánh chưa phủ của hai file cần đạt 100%.

| File | Dòng | Nhánh chưa phủ (mô tả) | Vì sao bộ ca Phần 1 không chạm tới |
|---|---|---|---|
| src/services/shipping.js | 13 | `subtotal < 0` hoặc `typeof subtotal !== 'number'` `throw new Error('Giá trị đơn hàng không hợp lệ')` | Bộ ca kiểm thử từ file CSV (Phần 1) chỉ kiểm tra các giá trị tạm tính dương hợp lệ, không có ca kiểm thử truyền giá trị âm hoặc sai kiểu dữ liệu. |
| src/services/cart.js | 12 | `if (!store.carts[email])` (nhánh khởi tạo mảng giỏ hàng mới `[]` khi email chưa có dữ liệu giỏ) | Bộ ca Phần 1 chưa gọi hàm `getCart` với một email hoàn toàn mới chưa được khởi tạo giỏ hàng. |
| src/services/cart.js | 40–42 | Nhánh `else` trong `addToCart` (khi sản phẩm chưa tồn tại trong giỏ, thực hiện lệnh `cart.push` để thêm mới) | Bộ ca Phần 1 chưa bao gồm kịch bản thao tác thêm sản phẩm mới vào giỏ hàng. |
| src/services/cart.js | 51–52 | `if (index === -1)` trong `removeFromCart` (nhánh xử lý khi xóa sản phẩm không có trong giỏ hàng, trả về lỗi 404) | Bộ ca Phần 1 không thực hiện gọi hàm `removeFromCart` để kiểm tra tình huống xóa sản phẩm không tồn tại. |

## 3. Kết quả sau khi bổ sung ca

| File | % Statements | % Branch | % Functions |
|---|---|---|---|
| src/services/shipping.js |100 | 100 |100 |
| src/services/cart.js |100 | 100 |100 |

Số ca đã bổ sung: 4 ca cho file shipping.js và 4 ca cho file cart.js

## 4. Câu hỏi phân tích

**4.1.** Một hàm đạt 100% bao phủ câu lệnh nhưng chỉ 60% bao phủ nhánh. Điều đó nghĩa là gì? Cho ví dụ cụ thể từ mã nguồn MiniShop.
- Ý nghĩa: Mọi dòng lệnh bên trong hàm đều đã được thực thi ít nhất một lần qua các ca kiểm thử, tuy nhiên các cấu trúc rẽ nhánh điều kiện (như câu lệnh `if/else`) chưa được kiểm tra đủ cả hai chiều đúng và sai.
- Ví dụ: Xét hàm kiểm tra độ tuổi đăng ký `if (age >= 18)`. Nếu bộ ca kiểm thử chỉ truyền vào tuổi 20 (luôn thỏa mãn điều kiện), dòng lệnh bên trong khối `if` được thực thi (đạt 100% câu lệnh) nhưng nhánh `else` hoặc trường hợp tuổi < 18 không bao giờ xảy ra, khiến độ bao phủ nhánh bị thiếu hụt.
**4.2.** Giả sử `calcShippingFee` đạt 100% bao phủ nhánh và tất cả ca đều xanh. Có thể kết luận hàm này không còn lỗi không? Giải thích.
- Trả lời: Không thể kết luận hàm hoàn toàn không còn lỗi.
- Giải thích: Bao phủ nhánh 100% chỉ đảm bảo mọi nhánh logic trong mã nguồn đã được thực thi ít nhất một lần qua các ca kiểm thử, nhưng nó không thể phát hiện các lỗi liên quan đến sai sót logic phức tạp giữa các tổ hợp dữ liệu chưa được vét cạn, hoặc lỗi do hiểu sai yêu cầu nghiệp vụ từ tài liệu đặc tả SRS
**4.3.** Trong bốn file ở mục 1, file nào có bao phủ thấp nhất? Nếu chỉ còn thời gian viết thêm 3 ca kiểm thử, sẽ viết cho hàm nào và vì sao?
- Trả lời: Dựa vào bảng số liệu đo lần đầu, file `auth.js` có độ bao phủ thấp nhất (37.5% Branch). Nếu chỉ còn thời gian viết thêm 3 ca kiểm thử, sẽ ưu tiên viết cho hàm **`login`** trong `auth.js` hoặc hàm **`validateRegistration`** trong `registration.js` vì đây là các hàm nghiệp vụ cốt lõi, liên quan trực tiếp đến bảo mật tài khoản (đăng nhập, khóa tài khoản sau 3 lần sai liên tiếp theo FR-02.3) có nhiều nhánh logic rẽ nhánh phức tạp và quan trọng nhất đối với hệ thống.
