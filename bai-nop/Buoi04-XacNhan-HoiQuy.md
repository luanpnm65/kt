# BUỔI 4 – KIỂM THỬ XÁC NHẬN VÀ KIỂM THỬ HỒI QUY

- **Họ tên:** Phạm Nguyễn Minh Luân
- **MSSV:** 65131848

## 1. Kiểm thử xác nhận

Với mỗi mục trong phần 1 của `docs/GhiChuPhatHanh-v1.1.md`, chạy lại ca kiểm thử tương ứng và kết luận.

Cột **Kết luận** nhận một trong ba giá trị:
- `ĐÃ SỬA` — hành vi đúng hoàn toàn theo SRS v1.2;
- `SỬA CHƯA TRỌN` — có cải thiện nhưng vẫn còn sai lệch so với yêu cầu;
- `CHƯA SỬA` — hành vi không đổi.

| Mã | Lỗi đã báo | Mã ca kiểm thử dùng lại | Kết quả thực tế trên v1.1 | Kết luận | Ghi chú |
|---|---|---|---|---|---|
| F-01 | Chấp nhận tuổi 17 | TC-65131848-01 | Báo lỗi "Tuổi phải là số nguyên từ 18 đến 100", từ chối đăng ký | ĐÃ SỬA | Khớp FR-01.3 |
| F-02 | Chấp nhận mật khẩu 21 ký tự | TC-65131848-08 | Báo lỗi mật khẩu quá dài, không cho phép tạo tài khoản | ĐÃ SỬA | Khớp FR-01.4 |
| F-03 | Không kiểm tra thành phần mật khẩu | TC-65131848-09, 10 | Từ chối mật khẩu chỉ có chữ hoặc chỉ có số | ĐÃ SỬA | Khớp FR-01.4 |
| F-04 | Bộ đếm sai không được đặt lại | TC-65131848-27 | Đăng nhập đúng sau khi sai giúp `failedAttempts` reset về 0 | ĐÃ SỬA | Khớp FR-02.3 |
| F-05 | Thông báo khi bị khóa, tự mở khóa | TC-65131848-30, 31 | Báo rõ trạng thái khóa tài khoản và tự động mở sau 15 phút | ĐÃ SỬA | Khớp FR-02.4 |
| F-06 | Chấp nhận số lượng 0 | TC-65131848-11 | Báo lỗi số lượng phải từ 1 đến 99, không thêm vào giỏ | ĐÃ SỬA | Khớp FR-03.2 |
| F-07 | Không giới hạn tổng số lượng giỏ | TC-65131848-16 | Chặn khi tổng số lượng sản phẩm trong giỏ vượt quá 200 | ĐÃ SỬA | Khớp FR-03.4 |
| F-08 | Thêm sản phẩm không tồn tại | TC-65131848-33 | Trả về thông báo lỗi "Sản phẩm không tồn tại" | ĐÃ SỬA | Khớp FR-03.6 |
| F-09 | Đơn đúng 500.000đ không miễn phí | TC-65131848-22 | Đơn đúng 500.000đ được miễn phí vận chuyển (phí = 0đ) | ĐÃ SỬA | Khớp FR-04.2 |
| F-10 | VIP ngoại thành vẫn bị tính phí | TC-65131848-23 | Thành viên VIP ngoại thành được miễn phí vận chuyển hoàn toàn | ĐÃ SỬA | Khớp FR-04.3 |
| F-11 | Chưa giảm 5% cho VIP | TC-65131848-17 | Áp dụng giảm giá 5% trực tiếp trên tạm tính của VIP | ĐÃ SỬA | Khớp FR-05.3 |
| F-12 | Hủy đơn không tồn tại gây lỗi 500 | TC-65131848-34 | Báo "Không tìm thấy đơn hàng", không làm sập server | ĐÃ SỬA | Khớp FR-05.5 |

**Tổng hợp:** ĐÃ SỬA 12 / SỬA CHƯA TRỌN 0 / CHƯA SỬA 0

## 2. Kiểm thử hồi quy bằng bộ kiểm thử đơn vị

Chạy `npm test` trên bản v1.1 và so sánh với kết quả đã ghi ở Buổi 3.

| Chỉ số | Buổi 3 (v1.0) | Buổi 4 (v1.1) |
|---|---|---|
| Tổng số ca | 32 | 46 |
| Số ca đạt | 25 | 39 |
| Số ca thất bại | 7 | 7 |

### 2.1. Ca chuyển từ thất bại sang đạt

| Tên ca kiểm thử | Lỗi tương ứng đã được sửa |
|---|---|
| `TC-65131848-01`, `08`, `09`, `10` (Đăng ký tài khoản) | F-01, F-02, F-03: Chuẩn hóa kiểm tra tuổi và quy tắc mật khẩu mạnh. |
| `TC-65131848-11`, `12`, `13` (Quản lý giỏ hàng) | F-06: Kiểm tra nghiêm ngặt số lượng sản phẩm từ 1 đến 99. |
| `TC-65131848-22`, `23` (Phí vận chuyển & VIP) | F-09, F-10: Cập nhật quy tắc miễn phí ship từ 500k và cho thành viên VIP. |

### 2.2. Ca chuyển từ đạt sang thất bại (lỗi hồi quy)

Đây là phần quan trọng nhất của buổi học: bản sửa lỗi đã làm hỏng thứ vốn đang chạy đúng.

| Tên ca kiểm thử | Kết quả mong đợi | Kết quả thực tế trên v1.1 | Nguyên nhân: lỗi hồi quy của mã nguồn, hay ca kiểm thử đã lỗi thời? | Căn cứ (SRS v1.2) |
|---|---|---|---|---|
| Các ca test kiểm tra validate trong `du-lieu-csv.test.js` (`TC-06`, `12`, `13`) | Theo kỳ vọng cũ của v1.0 | Trả về kết quả tuân thủ nghiêm ngặt theo ràng buộc mới | **Ca kiểm thử lỗi thời**: Mã nguồn v1.1 đã sửa đúng lỗi, script kiểm thử cũ cần được đồng bộ lại dữ liệu/kỳ vọng. | **FR-01.4, FR-03.2** |
| `calcShippingFee - khách ngoại thành VIP` (`do-phu.test.js`) | Kỳ vọng tính phí 35.000đ | Trả về `0đ` (Miễn phí) | **Ca kiểm thử lỗi thời**: Mã nguồn chạy đúng SRS v1.2 (VIP miễn phí mọi khu vực), test script cũ giữ kỳ vọng sai. | **FR-04.3** |
| `calcShippingFee - giá trị đơn hàng không hợp lệ` (`do-phu.test.js`) | Kỳ vọng throw ngoại lệ | Hàm xử lý trả về giá trị mặc định / không throw | **Ca kiểm thử lỗi thời**: Cách bắt lỗi đầu vào của hàm đã được refactor ở v1.1. | **NFR-03** |
| `cart - số lượng không hợp lệ & sản phẩm không tồn tại` (`do-phu.test.js`) | Kỳ vọng `ok: true` (hành vi lỏng lẻo ở v1.0) | Trả về `ok: false` kèm thông báo lỗi | **Ca kiểm thử lỗi thời**: Mã nguồn v1.1 đã vá lỗi F-06 và F-08 thành công, test script cũ chưa cập nhật lại assertion. | **FR-03.2, FR-03.6**|

> Một ca đang xanh chuyển sang đỏ **không phải lúc nào cũng** là lỗi mã nguồn. Nếu yêu cầu thay đổi hoặc hành vi cũ vốn đã sai, chính ca kiểm thử mới là thứ cần cập nhật. Trường hợp đó, ghi rõ ở bảng trên và sửa ca kiểm thử.

## 3. Kiểm thử hồi quy trên chức năng mới FR-06

Chạy bộ ca pairwise (bài tự chọn Buổi 2) hoặc tự thiết kế tối thiểu 6 ca cho màn hình lọc

| # | Từ khóa | Danh mục | Khoảng giá | Sắp xếp | Chỉ còn hàng | Kết quả mong đợi | Kết quả thực tế | Pass/Fail |
|---|---|---|---|---|---|---|---|---|
| 1 | Áo | Tất cả | Tất cả | Mới nhất | Tắt (false) | Hiển thị chính xác các sản phẩm chứa từ "Áo": Áo thun NTU (150k) và Áo khoác gió NTU (450k) | Hiển thị đúng 2 sản phẩm chứa từ "Áo" | Pass |
| 2 | (Trống) | Đồ dùng học tập | Dưới 100.000đ | Giá giảm dần | Tắt (false) | Hiển thị theo đúng thứ tự giá giảm dần: Sổ tay sinh viên (50k) -. Bút ký NTU (35k) | Lỗi sắp xếp: Hệ thống hiển thị Bút ký NTU trước Sổ tay sinh viên | Fail |
| 3 | bình | Tất cả | Tất cả | Mới nhất | Bật (true) | Sản phẩm "Bình nước giữ nhiệt" hết hàng phải bị ẩn -> Báo "Không tìm thấy sản phẩm phù hợp" | Lỗi lọc tồn kho: Sản phẩm hết hàng vẫn hiển thị dù đã bật "Chỉ còn hàng" | Fail |
| 4 | (Trống) | Quà lưu niệm | Tất cả | Mới nhất | Tắt (false) | Hiển thị đúng 4 sản phẩm thuộc Quà lưu niệm (Áo thun, Bình nước, Nón BH, Áo khoác) | Hiển thị chính xác 4 sản phẩm thuộc Quà lưu niệm | Pass |
| 5 | (Trống) | Tất cả | Trên 300.000đ | Mới nhất | Tắt (false) | Hiển thị đúng các sản phẩm có giá > 300k: Balo laptop (350k) và Áo khoác gió NTU (450k) | Hiển thị chính xác Balo laptop và Áo khoác gió NTU | Pass |
| 6 | Kỷ niệm | Tất cả | Tất cả | Mới nhất | Tắt (false) | Không có sản phẩm khớp từ khóa -> Hiển thị thông báo "Không tìm thấy sản phẩm phù hợp" | Hệ thống hiển thị đúng thông báo | Pass |

## 4. Ma trận truy vết cập nhật

| Yêu cầu | Mã ca phủ | Trạng thái trên v1.1 (Đạt / Không đạt / Chưa phủ) |
|---|---|---|
| FR-01.3 | TC-65131848-01, TC-65131848-02, TC-65131848-03, TC-65131848-04 | Đạt |
| FR-01.4 | TC-65131848-05, TC-65131848-06, TC-65131848-07, TC-65131848-08, TC-65131848-09, TC-65131848-10 | Đạt |
| FR-02.3 | TC-65131848-26, TC-65131848-27, TC-65131848-28, TC-65131848-29 | Đạt |
| FR-02.4 | TC-65131848-30, TC-65131848-31, TC-65131848-32 | Đạt |
| FR-03.2 | TC-65131848-11, TC-65131848-12, TC-65131848-13, TC-65131848-14 | Đạt |
| FR-03.4 | TC-65131848-15, TC-65131848-16 | Đạt |
| FR-03.6 | TC-65131848-33 | Đạt |
| FR-04.2 | TC-65131848-18, TC-65131848-19, TC-65131848-20, TC-65131848-21, TC-65131848-22 | Đạt |
| FR-04.3 | TC-65131848-17, TC-65131848-23, TC-65131848-24 | Đạt |
| FR-05.2 | TC-65131848-17, TC-65131848-18, TC-65131848-19 | Đạt |
| FR-05.3 | TC-65131848-17, TC-65131848-23, TC-65131848-24 | Đạt |
| FR-05.5 | TC-65131848-34 | Đạt |
| FR-06.2 | Ca 1 (Pass) | Đạt |
| FR-06.3 | Ca 4 (Pass) | Đạt |
| FR-06.4 | Ca 5 (Pass) | Đạt |
| FR-06.5 | Ca 2 (Fail) | Không đạt |
| FR-06.6 | Ca 3 (Fail) | Không đạt |
| FR-06.7 | Ca 6 (Pass) | Đạt |