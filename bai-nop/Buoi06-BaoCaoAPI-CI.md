# BUỔI 6 – BÁO CÁO KIỂM THỬ API VÀ CI

- **Họ tên:** Phạm Nguyễn Minh Luân
- **MSSV:** 65131848
- **Phiên bản:** MiniShop NTU v1.1.0; SRS v1.2

## 1. Tổng hợp API
`npm run api`: 20 ca, 16 đạt, 4 thất bại, 6,3 giây (Playwright báo). Mỗi ca reset dữ liệu; ca phân quyền dùng soft assertion để vẫn kiểm trạng thái sau yêu cầu sai.

## 2. Danh mục và phân tích
| Điểm cuối / yêu cầu | Mã kỳ vọng | Kết quả |
|---|---|---|
| POST login đúng, sai / FR-02 | 200, 401 | đạt |
| GET cart không token / token sai | 401 | đạt |
| POST login khóa và đăng nhập sau khóa / FR-02.3–4 | 401, 423 | đạt |
| DELETE orders của người khác / FR-05.5 | 404, không đổi trạng thái | **sai**: 200 và DA_HUY |
| POST cart số lượng 0, sản phẩm thiếu / FR-03.2, 03.6 | 400, 404 | đạt |
| POST cart cập nhật / FR-03.3 | 200 | đạt |
| POST orders làm trống giỏ / FR-05.1 | 201 và giỏ rỗng | đạt |
| DELETE cart thiếu / FR-03.5 | 404 | đạt |
| POST orders giỏ rỗng / FR-05.1 | 400 | đạt |
| POST orders thường / FR-05.2 | 201, tổng 370.000 | **sai**: 350.000 |
| POST orders VIP / FR-05.3 | 201, tổng 332.500 | đạt |
| DELETE orders thiếu, hủy lại / FR-05.5 | 404, 200, 409 | đạt |
| GET products giá giảm / FR-06.5 | 200, giảm dần | **sai**: tăng dần |
| GET products còn hàng / FR-06.6 | 200, stock > 0 | **sai**: có stock = 0 |
| GET products danh mục và giá / FR-06.7 | 200, Sổ tay và Bút ký | đạt |

Bốn ca thất bại là lỗi sản phẩm theo các FR đã nêu, không phải lỗi kỳ vọng. `src/server.js` tìm đơn chỉ theo id, tính tổng thiếu phí, sắp xếp tăng cho cả hai lựa chọn, và lọc `stock >= 0`.

## 3. Lỗi riêng tầng API
FR-05.5: unit Buổi 3 gọi hàm nghiệp vụ, không kiểm middleware/định tuyến và danh tính chủ đơn; E2E Buổi 5 chỉ thao tác UI, không có chức năng hủy đơn của tài khoản khác. API chủ động dùng hai token để dựng tấn công và đọc lại trạng thái. Mức **Critical** do xâm phạm phân quyền và làm mất đơn người khác. Không thể dựa vào một tầng duy nhất: mỗi tầng có bề mặt quan sát khác nhau.

## 4. Công thức tổng
| | Thường | VIP |
|---|---:|---:|
| subtotal | 350.000 | 350.000 |
| discount | 0 | 17.500 |
| shippingFee | 20.000 | 0 |
| total mong đợi | 370.000 | 332.500 |
| total thực tế | 350.000 | 332.500 |
| kết quả | đỏ | xanh |

`src/server.js:138` bỏ `+ fee`. VIP phí bằng 0 nên lỗi bị che; chọn dữ liệu có phí khác 0 và cả biên miễn phí để tránh che lỗi.

## 5. Quy trình CI
Workflow `.github/workflows/kiem-thu-day-du.yml`: 9 bước theo thứ tự checkout, setup Node 20, npm ci, lint (cho phép lỗi), unit, cài Chromium, API, E2E, upload. Cài Chromium trước Playwright; unit nhanh chạy trước E2E để phản hồi sớm. API, E2E và upload dùng `if: always()` để vẫn chạy sau lỗi, không làm mất trạng thái đỏ; cài Chromium cũng vậy sau unit đỏ.

**Số liệu GitHub Actions:** chưa có bằng chứng chạy, thời gian và URL chưa xác nhận. Kết quả chạy cục bộ không phải kết quả Actions. E2E cục bộ không chạy được vì CDN Playwright bị chặn khi tải Chromium: 5 ca lỗi khởi tạo, 6 ca bị skip; không phân loại 5 lỗi này là lỗi sản phẩm. Các ca Buổi 5 còn khung/skip, vì vậy CI hiện không bao phủ đầy đủ FR-06 UI.

## 6. Hiện vật
Workflow dự kiến tải `bao-cao-kiem-thu`, gồm `api/` và `e2e/`, thông qua `PLAYWRIGHT_HTML_REPORT`; không tách thì lần chạy sau ghi đè báo cáo trước. `if: always()` cho phép upload sau bước đỏ, nhưng nếu cài đặt hoặc chạy không tạo báo cáo thì không đảm bảo có file. Chưa có ảnh và chưa kiểm chứng tải artifact trên GitHub.

## 7. Đường mốc đỏ tại máy
| Tầng | Ca | Nguyên nhân / tham chiếu |
|---|---|---|
| API | FR-05.5 hủy đơn người khác | Lỗi phân quyền mới, chưa có issue |
| API | FR-05.2 tổng thường | Thiếu phí, chưa có issue |
| API | FR-06.5 giá giảm | Lỗi sản phẩm, Buổi 4 ca 2 |
| API | FR-06.6 còn hàng | Lỗi sản phẩm, Buổi 4 ca 3 |
| Unit | subtotal không hợp lệ | đòi throw với số âm, cần xác nhận đặc tả đầu vào |
| Unit | khách thường hoặc ngoại thành | kỳ vọng VIP ngoại thành 35.000 sai FR-04.3 |
| Unit | số lượng không hợp lệ | kỳ vọng qty 0 hợp lệ sai FR-03.2 |
| Unit | sản phẩm không tồn tại | kỳ vọng thêm thành công sai FR-03.6 |
| Unit | TC-65131848-06 | đối chiếu dữ liệu CSV với FR-01.4 |
| Unit | TC-65131848-12 | đối chiếu CSV với FR-03.2 |
| Unit | TC-65131848-13 | đối chiếu CSV với FR-03.2 |

Tổng 11 ca đỏ / 66 ca API + unit; chưa bao gồm E2E do thiếu trình duyệt. Các ca CSV cần kiểm lại dữ liệu trước khi kết luận nguyên nhân.

## 8. Thực nghiệm hồi quy
Chưa thực hiện nhánh `thu-ci`: môi trường phiên làm việc chỉ cho phép nhánh hiện tại; không sửa `src/` hoặc tạo nhánh khác. Vì vậy chưa có số liệu trước/sau, ca chuyển đỏ, URL và thời gian push. Không giả lập bằng số liệu giả. Thiết kế thực nghiệm để người tiếp nhận thực hiện ở môi trường được phép: đổi phí nội thành 20.000 thành 25.000, so sánh danh sách ca trước/sau; không gộp nhánh thử nghiệm. Nếu không có đường mốc thì khó tách ca đỏ mới khỏi 11 ca đỏ cũ. `tests/unit/do-phu.test.js` có kiểm cứng 20.000 (Buổi 3); cần thực sự chạy trước khi xác nhận ca chuyển màu. Chưa quan sát được ca đáng lẽ đỏ mà vẫn xanh; không khẳng định có hay không. Kỳ vọng phải lấy từ SRS độc lập, không lấy hằng số từ chính hàm cần kiểm; số cứng có căn cứ như 20.000 theo FR-04.1 là oracle cần thiết, không phải mùi xấu.

## 9. Phân tích cấu hình
1. `continue-on-error` biến lỗi bước thành không chặn job; áp dụng cho test có thể làm job xanh giả. `if: always()` vẫn chạy bước sau mà giữ lỗi của bước trước.
2. Cache thư mục trình duyệt theo OS và phiên bản Playwright, vẫn chạy lệnh cài để kiểm tra/cache miss; cân nhắc phụ thuộc hệ điều hành.
3. Mọi push ở 50 nhánh tăng phút CI, hàng đợi và chi phí; giới hạn push theo nhánh làm bài/chính và PR, dùng concurrency hủy lần cũ. Không bỏ kiểm PR quan trọng.
