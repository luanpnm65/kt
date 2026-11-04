# BUỔI 6 – BÁO CÁO KIỂM THỬ API VÀ TÍCH HỢP LIÊN TỤC



- **Họ tên:** Phạm Nguyễn Minh Luân
- **MSSV:** 65131848
- **Phiên bản phần mềm:** MiniShop NTU v1.1.0
- **Tài liệu yêu cầu:** SRS v1.2

---

# PHẦN 1 — KIỂM THỬ API

## 1. Tổng hợp kết quả

Chạy `npm run api`.

| Chỉ số | Giá trị |
|---|---|
| Tổng số ca API | 20 |
| Số ca đạt | 16 |
| Số ca thất bại | 4 |
| Thời gian chạy | 5,6 giây |

## 2. Danh mục ca đã viết và phân tích ca thất bại

### 2.1. Danh mục ca kiểm thử API

| Điểm cuối | Phương thức | Yêu cầu (SRS v1.2) | Mã trạng thái mong đợi | Kết quả |
|---|---|---|---|---|
| `/api/login` | POST | FR-02, đăng nhập đúng | 200 | Đạt |
| `/api/login` | POST | FR-02, sai mật khẩu | 401 | Đạt |
| `/api/cart` | GET | Không có token | 401 | Đạt |
| `/api/login` | POST | FR-02.3, khóa sau ba lần sai | 401, 423 | Đạt |
| `/api/login` | POST | FR-02.4, đăng nhập đúng sau khi khóa | 423 | Đạt |
| `/api/cart` | GET | Token không tồn tại | 401 | Đạt |
| `/api/orders/:id` | DELETE | FR-05.5, hủy đơn của tài khoản khác | 404 | Thất bại |
| `/api/cart` | POST | FR-03.2, số lượng 0 | 400 | Đạt |
| `/api/cart` | POST | FR-03.6, sản phẩm không tồn tại | 404 | Đạt |
| `/api/cart` | POST | FR-03.3, cập nhật số lượng | 200 | Đạt |
| `/api/orders`, `/api/cart` | POST, GET | FR-05.1, đặt hàng làm trống giỏ | 201, 200 | Đạt |
| `/api/cart/3` | DELETE | FR-03.5, sản phẩm không có trong giỏ | 404 | Đạt |
| `/api/orders` | POST | FR-05.1, giỏ rỗng | 400 | Đạt |
| `/api/orders` | POST | FR-05.2, tổng đơn thường | 201 | Thất bại |
| `/api/orders` | POST | FR-05.3, tổng đơn VIP | 201 | Đạt |
| `/api/orders/9999` | DELETE | FR-05.5, đơn không tồn tại | 404 | Đạt |
| `/api/orders/:id` | DELETE | FR-05.5, hủy lại đơn đã hủy | 200, 409 | Đạt |
| `/api/products?sapXep=gia-giam` | GET | FR-06.5 | 200 | Thất bại |
| `/api/products?conHang=co` | GET | FR-06.6 | 200 | Thất bại |
| `/api/products?danhMuc=do-dung-hoc-tap&khoangGia=duoi-100k` | GET | FR-06.7 | 200 | Đạt |

### 2.2. Phân tích các ca thất bại

Phân loại nguyên nhân: **lỗi sản phẩm** / **ca kiểm thử sai** / **đặc tả chưa rõ**.

| Tên ca | Kết quả mong đợi | Kết quả thực tế | Phân loại nguyên nhân | Căn cứ (SRS v1.2) |
|---|---|---|---|---|
| Hủy đơn của tài khoản khác | 404; đơn vẫn `CHO_XAC_NHAN` | 200; đơn chuyển `DA_HUY` | Lỗi sản phẩm | FR-05.5 |
| Tổng đơn thường gồm phí giao hàng | 370.000đ | 350.000đ | Lỗi sản phẩm | FR-05.2 |
| Sắp xếp giá giảm | Danh sách giá giảm dần | Danh sách giá tăng dần | Lỗi sản phẩm | FR-06.5 |
| Chỉ sản phẩm còn hàng | Mọi sản phẩm có `stock > 0` | Có sản phẩm `stock = 0` | Lỗi sản phẩm | FR-06.6 |

## 3. Lỗi chỉ phát hiện được ở tầng API

Buổi 3 kiểm thử ở mức hàm, Buổi 5 kiểm thử qua giao diện. Có lỗi mà cả hai tầng đều không chạm tới.

| Lỗi | Vì sao kiểm thử đơn vị không viết được ca này | Vì sao kiểm thử đầu cuối không viết được ca này | Ca API nào bắt được |
|---|---|---|---|
| Tài khoản khác hủy đơn của chủ đơn | Bộ ca đơn vị Buổi 3 gọi hàm, không kiểm yêu cầu HTTP với hai danh tính | Giao diện không cung cấp thao tác hủy đơn của tài khoản khác | FR-05.5 không cho tài khoản khác hủy đơn và không thay đổi trạng thái |

**3.1.** Mức nghiêm trọng của lỗi này, và hậu quả cụ thể nếu phát hành:

Critical: người dùng có thể hủy đơn của người khác, gây mất đơn hàng và vi phạm phân quyền.

**3.2.** Điều này nói lên điều gì về việc chỉ dựa vào một tầng kiểm thử duy nhất?

Mỗi tầng quan sát khác nhau; cần kết hợp unit, API và E2E để giảm rủi ro bỏ sót.

## 4. Hiện tượng hai ca cùng kiểm một công thức nhưng khác kết quả

Ca ở TODO (7) và ca ở TODO (8) đều kiểm công thức `total = subtotal − discount + shippingFee`.

| Mục | TODO (7) — thành viên THUONG | TODO (8) — thành viên VIP |
|---|---|---|
| `subtotal` | 350.000đ | 350.000đ |
| `discount` | 0đ | 17.500đ |
| `shippingFee` | 20.000đ | 0đ |
| `total` mong đợi | 370.000đ | 332.500đ |
| `total` thực tế | 350.000đ | 332.500đ |
| Kết quả ca | Thất bại | Đạt |

**4.1.** Lỗi nằm ở dòng nào trong `src/server.js`? Vì sao cùng lỗi đó mà một ca phát hiện được, một ca thì không?

Dòng 138 tính `subtotal - discount` mà không cộng phí. Khách thường có phí 20.000đ nên ca đỏ; VIP được miễn phí vận chuyển nên lỗi bị che và ca xanh.

**4.2.** Kết luận về cách chọn dữ liệu kiểm thử:

Cần kiểm cả trường hợp phí bằng 0 và khác 0 để phát hiện số hạng bị bỏ sót.

---

# PHẦN 2 — QUY TRÌNH TÍCH HỢP LIÊN TỤC

## 5. Cấu trúc quy trình và lần chạy đầu tiên

### 5.1. Các bước đã khai báo

| Thứ tự | Tên bước | Lệnh hoặc action | Vì sao đặt ở vị trí này |
|---|---|---|---|
| 1 | Checkout | `actions/checkout@v4` | Lấy mã nguồn; 1 giây |
| 2 | Thiết lập Node.js | `actions/setup-node@v4` | Chuẩn bị Node.js; 5 giây |
| 3 | Cài thư viện | `npm ci` | Cài phụ thuộc; 3 giây |
| 4 | Phân tích tĩnh | `npm run lint` | Kiểm tra mã, cho phép lỗi; 1 giây |
| 5 | Kiểm thử đơn vị | `npm test -- --runInBand` | Chạy unit trước các tầng sau; thất bại, 2 giây |
| 6 | Cài Chromium | `npx playwright install --with-deps chromium` | Chuẩn bị trình duyệt; 25 giây |
| 7 | Kiểm thử API | `npx playwright test tests/api` | Kiểm thử API; thất bại, 10 giây |
| 8 | Kiểm thử đầu cuối | `npx playwright test tests/e2e` | Kiểm thử giao diện; thất bại, 9 giây |
| 9 | Lưu báo cáo | `actions/upload-artifact@v4` | Lưu kết quả sau các bước kiểm thử; thành công, 1 giây |

### 5.2. Số liệu lần chạy trên nhánh `buoi-06`

| Mục | Giá trị |
|---|---|
| Đường dẫn tới lần chạy | [GitHub Actions – lần chạy 41923893525](https://github.com/luanpnm65/sot357-65131848/actions/runs/41923893525/job/126903127846#step:9:118) |
| Tổng thời gian chạy | Job `kiem-thu`: 1 phút 2 giây; tổng thời gian workflow chưa có trong ảnh |
| Thời gian bước cài thư viện | 3 giây |
| Thời gian bước cài trình duyệt | 25 giây |
| Thời gian bước kiểm thử đơn vị | 2 giây |
| Thời gian bước kiểm thử API | 10 giây |
| Thời gian bước kiểm thử đầu cuối | 9 giây |
| Trạng thái cuối cùng của job | Thất bại (đỏ) |
| Số ca thất bại: đơn vị / API / đầu cuối | 7 / 4 / 3; API: 16 đạt, 4 thất bại trong 8,4 giây; E2E: 2 đạt, 3 thất bại, 6 bỏ qua trong 8,3 giây |

**5.3.** Mọi bước đều đã chạy hay có bước bị bỏ qua? Nếu có, vì sao?

Cả 9 bước chính đã chạy. Các bước kiểm thử đơn vị, API và E2E thất bại; các bước tiếp theo và bước lưu báo cáo vẫn chạy. Bước hậu xử lý `Post Thiết lập Node.js` bị bỏ qua; ảnh không cho biết nguyên nhân.

**5.4.** Vì sao bước cài trình duyệt phải đứng trước hai bước Playwright? Vì sao đặt kiểm thử đơn vị trước kiểm thử đầu cuối chứ không ngược lại?

Playwright cần trình duyệt được cài trước khi chạy E2E; unit thường chạy nhanh hơn, giúp phản hồi sớm.

## 6. Hiện vật kiểm thử

| Mục | Nội dung |
|---|---|
| Tên gói hiện vật tải lên | `bao-cao-kiem-thu`; đã tải và mở báo cáo |
| Các thư mục bên trong gói | `api/` và `e2e/` |
| Hai báo cáo HTML có riêng biệt không | Có; đã mở được hai file `api/index.html` và `e2e/index.html` |
| Nếu bỏ biến `PLAYWRIGHT_HTML_REPORT` thì điều gì xảy ra | Hai lần chạy có thể ghi cùng thư mục và báo cáo sau ghi đè báo cáo trước |
| Vì sao bước tải lên phải có `if: always()` | Để bước tải lên vẫn chạy khi kiểm thử thất bại |

Ảnh: [Các bước lần chạy mới](hinh/Buoi06-Actions-moi.png).

## 7. Đường mốc đỏ đã biết

Danh sách các ca đang đỏ đã xác định được nguyên nhân. Từ đường mốc này trở đi, chỉ ca đỏ **mới** là tín hiệu đáng báo động.

| Tầng | Tên ca | Nguyên nhân đã biết | Issue Buổi 4 hoặc mã lỗi |
|---|---|---|---|
| API | FR-05.5 hủy đơn của tài khoản khác | Trả 200, đơn chuyển `DA_HUY` | FR-05.5 |
| API | FR-05.2 tổng đơn thường | Thiếu phí vận chuyển | FR-05.2 |
| API | FR-06.5 sắp xếp giá giảm | Giá tăng dần | FR-06.5; Buổi 4 ca 2 |
| API | FR-06.6 chỉ sản phẩm còn hàng | Có sản phẩm hết hàng | FR-06.6; Buổi 4 ca 3 |
| Đơn vị | Giá trị đơn hàng không hợp lệ | Số âm không ném lỗi như ca mong đợi; cần đối chiếu yêu cầu | `tests/unit/do-phu.test.js` |
| Đơn vị | Khách thường hoặc ngoại thành tính phí theo khu vực | Ca mong VIP ngoại thành trả 35.000đ; thực tế 0đ theo ưu đãi VIP | FR-04.3 |
| Đơn vị | Số lượng không hợp lệ khi thêm vào giỏ | Ca mong số lượng 0 được chấp nhận, thực tế bị từ chối | FR-03.2 |
| Đơn vị | Sản phẩm không tồn tại trong kho | Ca mong thêm thành công, thực tế bị từ chối | FR-03.6 |
| Đơn vị | TC-65131848-06 | Mong `HOP_LE`, thực tế `KHONG_HOP_LE`; cần đối chiếu dữ liệu và quy tắc | FR-01.4 |
| Đơn vị | TC-65131848-12 | Mong `HOP_LE`, thực tế `KHONG_HOP_LE`; kiểm tra trường dữ liệu CSV và tham số | FR-03.2 |
| Đơn vị | TC-65131848-13 | Mong `HOP_LE`, thực tế `KHONG_HOP_LE`; kiểm tra trường dữ liệu CSV và tham số | FR-03.2 |
| Đầu cuối | Danh sách sản phẩm hiển thị đủ 7 mặt hàng | Chưa có chi tiết lỗi để xác định nguyên nhân | `tests/e2e/02-flaky.spec.js` |
| Đầu cuối | Tính phí vận chuyển cho thành viên thường | Chưa có chi tiết lỗi để xác định nguyên nhân | `tests/e2e/02-flaky.spec.js` |
| Đầu cuối | FR-06.3 lọc theo danh mục Đồ dùng học tập | Chưa có chi tiết lỗi để xác định nguyên nhân | FR-06.3; `tests/e2e/04-loc-san-pham.spec.js` |

**Tổng số ca đỏ đã ghi nhận trên CI:** 14 ca: 7 / 46 ca đơn vị, 4 / 20 ca API và 3 / 11 ca E2E; E2E có thêm 6 ca bỏ qua. Bốn ca API trùng kết quả chạy trên máy. Các ca đơn vị và E2E cần phân tích nguyên nhân, không mặc định là lỗi sản phẩm.

## 8. Thực nghiệm: quy trình có bắt được lỗi mới không

Nhánh `thu-ci`, cố ý sửa `src/` để làm một ca **đang xanh** chuyển sang đỏ.

| Mục | Nội dung |
|---|---|
| Đã sửa gì trong `src/` | Trong `src/services/auth.js`, thay số lần nhập sai tối đa từ 3 thành 5 |
| Ca nào chuyển từ xanh sang đỏ | API: FR-02.3 khóa sau ba lần sai, FR-02.4 mật khẩu đúng sau khi khóa vẫn bị từ chối; unit: ca khóa sau ba lần sai trong `auth-mock.test.js` |
| Số ca đỏ: trước thực nghiệm → sau thực nghiệm | API: 4 → 6 / 20; đơn vị: 7 → 8 / 46; E2E: 3 → 2 theo kết quả được cung cấp |
| Thời gian từ lúc push tới lúc biết kết quả | 1 phút 2 giây theo kết quả được cung cấp |
| Đường dẫn tới lần chạy của nhánh `thu-ci` | [GitHub Actions – lần chạy 41926268417](https://github.com/luanpnm65/sot357-65131848/actions/runs/41926268417/job/126911365961) |

**8.1.** Nếu không lập đường mốc ở mục 7, có nhận ra được ca mới đỏ này giữa các ca đỏ cũ hay không? Vì sao?

Khó phân biệt ca mới đỏ với các ca đỏ đã biết nếu không có danh sách để đối chiếu.

**8.2.** Ca vừa chuyển sang đỏ được viết ở **buổi nào**? Nó nằm trong file nào?

Hai ca API FR-02.3 và FR-02.4 được viết ở Buổi 6 trong `tests/api/01-xac-thuc.spec.js`. Ca đơn vị kiểm khóa sau ba lần sai nằm ở `tests/unit/auth-mock.test.js`, Buổi 3. Mã nghiệp vụ bị thay đổi nằm ở `src/services/auth.js`. Khi ngưỡng tăng lên 5, ba lần sai chưa khóa tài khoản nên ba ca này thất bại: FR-02.3 nhận 401 thay vì 423; FR-02.4 nhận 200 thay vì 423; ca đơn vị thấy `locked` là `false`.

**8.3.** Liệt kê những ca **đáng lẽ phải đỏ mà vẫn xanh** sau khi sửa mã nguồn. Với mỗi ca, mở ra đọc dòng khẳng định và giải thích vì sao nó không phát hiện được thay đổi.

Ca FR-03.2 thêm sản phẩm với số lượng 0 vẫn xanh vì kiểm API giỏ hàng và mong đợi mã 400, không kiểm ngưỡng khóa tài khoản; do đó không phải ca đáng lẽ phải đỏ. Trong `tests/unit/auth-mock.test.js`, ca kiểm tài khoản đã bị khóa dựng sẵn `locked = true`, rồi kiểm từ chối mật khẩu đúng. Ca vẫn có thể xanh khi ngưỡng khóa bị sửa, nhưng đây là ca kiểm hành vi sau khi đã khóa, không kiểm thời điểm khóa; không có căn cứ coi nó đáng lẽ phải đỏ. Log unit cho biết số ca đạt nhưng không liệt kê tên từng ca đạt, nên chưa xác minh riêng kết quả ca này. Chưa xác định được ca liên quan đến thay đổi mà đáng lẽ phải đỏ nhưng vẫn xanh. E2E giảm từ 3 xuống 2 ca đỏ; chưa có tên và chi tiết các ca E2E của lần thử nghiệm để xác định nguyên nhân, không thể kết luận do thay đổi ngưỡng.

> Gợi ý: nếu kết quả mong đợi của một ca được lấy từ chính mã nguồn, thì khi mã nguồn đổi, cả hai phía của phép so sánh đổi theo nhau.

**8.4.** Từ quan sát ở 8.3, kết quả mong đợi của một ca kiểm thử nên suy từ đâu? Số cứng trong ca kiểm thử là mùi mã xấu hay là điều cần thiết? Trả lời có dẫn ví dụ cụ thể từ repo của mình.

Kỳ vọng nên suy từ SRS độc lập với mã nguồn. Số cứng có căn cứ là cần thiết: ví dụ 20.000đ phí nội thành theo FR-04.1; lấy kỳ vọng từ cùng hằng số của mã đang kiểm thử có thể che lỗi. Chưa xác định được ca đáng lẽ đỏ mà vẫn xanh ở 8.3.

> Nhắc lại: nhánh `thu-ci` **không** được gộp vào `buoi-06` hay `main`.

## 9. Câu hỏi phân tích

**9.1.** `continue-on-error: true` ở bước ESLint nghĩa là gì? Nếu đặt nó cho cả hai bước kiểm thử thì job sẽ xanh — vì sao đó là một cấu hình có hại, dù trông gọn gàng hơn?

Bước lỗi không làm job thất bại. Áp dụng cho các bước test có thể che lỗi và cho job xanh giả; `if: always()` cho phép chạy tiếp mà không xóa trạng thái thất bại trước đó.

**9.2.** Bước cài trình duyệt mất khoảng một phút mỗi lần chạy. Nêu một cách giảm thời gian này mà **không** bỏ bước đó.

Cache trình duyệt theo hệ điều hành và phiên bản Playwright, vẫn chạy lệnh cài để xử lý cache miss.

**9.3.** Quy trình hiện chạy trên mọi lần đẩy ở mọi nhánh. Với một lớp 50 sinh viên cùng dùng một repo tổ chức, điều này gây ra vấn đề gì, và nên giới hạn thế nào?

Nhiều lần chạy đồng thời làm tăng hàng đợi và chi phí. Giới hạn theo nhánh quan trọng và PR, dùng concurrency hủy lần chạy cũ.
