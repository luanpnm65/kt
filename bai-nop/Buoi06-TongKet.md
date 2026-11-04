# BUỔI 6 – TỔNG KẾT ĐỢT KIỂM THỬ

- **Họ tên:** Phạm Nguyễn Minh Luân
- **MSSV:** 65131848
- **Phạm vi:** MiniShop NTU v1.0–v1.1.0; SRS v1.0–v1.2.

## 1. Hồ sơ kiểm thử đã xây dựng

| Buổi | Sản phẩm | Vị trí trong repo | Số lượng |
|---|---|---|---|
| 1 | Phiếu và biên bản review SRS; báo cáo phân tích tĩnh, mã lab | `bai-nop/Buoi01-Phan2-PhieuReview.md`, `bai-nop/Buoi01-Phan2-BienBanReview.md`, `bai-nop/Buoi01-Phan3-PhanTichTinh.md`, `src/lab-static/` | 12 lỗi tài liệu; 19 vấn đề ESLint ban đầu (16 lỗi, 3 cảnh báo) |
| 2 | Bộ ca kiểm thử thiết kế, dữ liệu và ma trận truy vết | `bai-nop/Buoi02-TestCase.csv`, `bai-nop/Buoi02-DuLieuKiemThu.csv`, `bai-nop/Buoi02-ThucThi-RTM.md` | 32 ca thiết kế; 20 dòng dữ liệu |
| 3 | Bộ kiểm thử đơn vị và báo cáo độ phủ | `tests/unit/`, `bai-nop/Buoi03-PhanTichKetQua.md`, `bai-nop/Buoi03-DoPhu.md` | 3 file unit nghiệp vụ; lần CI có 46 ca Jest gồm cả ví dụ |
| 4 | Test plan, xác nhận/hồi quy và báo cáo lỗi | `bai-nop/Buoi04-TestPlan.md`, `bai-nop/Buoi04-XacNhan-HoiQuy.md`, `bai-nop/Buoi04-Exploratory.md` | 2 issue được dẫn (#7 và #8); 12 lỗi xác nhận |
| 5 | Bộ kiểm thử đầu cuối, Page Object | `tests/e2e/`, `tests/pages/`, `bai-nop/Buoi05-BaoCaoE2E.md`, `bai-nop/Buoi05-Flaky-POM.md` | 11 ca khai báo; 6 ca skip; 3 Page Object |
| 6 | Bộ kiểm thử API, pipeline CI và phản biện AI | `tests/api/`, `.github/workflows/kiem-thu-day-du.yml`, `bai-nop/Buoi06-BaoCaoAPI-CI.md`, `bai-nop/Buoi06-GenAI.md` | 20 ca API; 1 workflow; 11 ca AI chạy riêng |

## 2. Bản đồ lỗi theo tầng kiểm thử

`X` chỉ biểu thị lỗi đã được phát hiện theo chứng cứ nêu bên dưới; ô trống là chưa có bằng chứng, không khẳng định tầng đó không thể tìm ra lỗi. Lỗi v1.0 và lỗi hiện tại được phân biệt; ca xác nhận đạt không được tính là phát hiện lỗi. Các dòng F chưa có dấu là lỗi có trong báo cáo xác nhận nhưng chưa tìm thấy chứng cứ rõ về tầng phát hiện ban đầu. Riêng giỏ hàng cập nhật số lượng được ca API kiểm thành công, chưa có bằng chứng lỗi cộng dồn trong lần chạy hiện tại.

| Lỗi | Review tĩnh | Đơn vị | API | E2E | Thủ công / thăm dò |
|---|---|---|---|---|---|
| Chấp nhận tuổi dưới giới hạn — F-01, v1.0 |  | X |  |  |  |
| Mật khẩu 8 ký tự bị từ chối — TC-65131848-06 |  | X |  |  |  |
| Mật khẩu chữ in hoa bị từ chối — `ABCDEFGH1` | X |  |  |  |  |
| Giỏ hàng cộng dồn khi cập nhật số lượng |  |  |  |  |  |
| Tài khoản tự mở khóa quá sớm — 15 giây thay vì 15 phút | X |  |  |  |  |
| Hủy được đơn của tài khoản khác — FR-05.5 |  |  | X |  |  |
| Tổng tiền thiếu phí vận chuyển — FR-05.2 |  |  | X |  |  |
| Sắp xếp giá giảm dần không hoạt động — FR-06.5 |  |  | X |  | X |
| Lọc "chỉ còn hàng" không hoạt động — FR-06.6 |  |  | X |  | X |
| R01 mâu thuẫn tuổi tối thiểu | X |  |  |  |  |
| R02 mật khẩu mạnh mơ hồ | X |  |  |  |  |
| R03 mâu thuẫn số lần đăng nhập sai | X |  |  |  |  |
| R04 giới hạn giỏ hàng mơ hồ | X |  |  |  |  |
| R05 mâu thuẫn ngưỡng miễn phí | X |  |  |  |  |
| R06 thiếu định nghĩa khách thân thiết | X |  |  |  |  |
| R07 yêu cầu gửi email ngoài phạm vi | X |  |  |  |  |
| R08 bước voucher không có đặc tả | X |  |  |  |  |
| R09 thời gian phản hồi không định lượng | X |  |  |  |  |
| R10 độ sẵn sàng 100% không khả thi | X |  |  |  |  |
| R11 ví dụ phí ngoại thành sai số liệu | X |  |  |  |  |
| R12 thuật ngữ VIP không nhất quán | X |  |  |  |  |
| S01 khóa phí nội thành bị khai báo trùng | X |  |  |  |  |
| S02 tên biến `totl` không được khai báo | X |  |  |  |  |
| S03 gán thay vì so sánh số lượng trong điều kiện | X |  |  |  |  |
| S04 `typeof` sai tên kiểu | X |  |  |  |  |
| S05 so sánh trực tiếp với `NaN` | X |  |  |  |  |
| S06 nhánh `switch` thiếu `break` | X |  |  |  |  |
| S07 điều kiện `else if` trùng | X |  |  |  |  |
| S08 toán tử phủ định sai thứ tự khi kiểm `in` | X |  |  |  |  |
| S09 công thức tổng trừ phí thay vì cộng phí | X |  |  |  |  |
| S10 kiểm tra phạm vi số lượng sai | X |  |  |  |  |
| F-02: chấp nhận mật khẩu 21 ký tự, v1.0 |  | X |  |  |  |
| F-03: không kiểm thành phần mật khẩu, v1.0 |  | X |  |  |  |
| F-04: không đặt lại bộ đếm sai, v1.0 |  |  |  |  |  |
| F-05: thông báo khóa thiếu hướng dẫn, v1.0 |  |  |  |  | X |
| F-06: chấp nhận số lượng 0, v1.0 |  |  |  |  |  |
| F-07: không giới hạn tổng số lượng giỏ, v1.0 |  |  |  |  |  |
| F-08: thêm sản phẩm không tồn tại, v1.0 |  |  |  |  |  |
| F-09: đúng 500.000đ không miễn phí, v1.0 |  |  |  |  |  |
| F-10: VIP ngoại thành vẫn bị tính phí, v1.0 |  | X |  |  |  |
| F-11: thiếu giảm 5% VIP, v1.0 |  |  |  |  |  |
| F-12: hủy đơn thiếu gây lỗi 500, v1.0 |  |  |  |  |  |
| Thông báo mật khẩu ngắn không đúng kỳ vọng, Buổi 2 |  |  |  |  | X |
| **Tổng số dấu theo tầng** | 24 | 5 | 4 | 0 | 4 |

Nguồn: R01–R12 từ `Buoi01-Phan2-BienBanReview.md`; S01–S10 từ `Buoi01-Phan3-PhanTichTinh.md` (S09–S10 do đọc mã, không do ESLint); F-01/F-02/F-03/F-10 theo mô tả `Buoi03-PhanTichKetQua.md`; F-05 và thông báo mật khẩu ngắn theo `Buoi02-ThucThi-RTM.md`; FR-06.5–06.6 theo `Buoi04-XacNhan-HoiQuy.md` và kết quả API Buổi 6; FR-05.2/05.5 theo `Buoi06-BaoCaoAPI-CI.md`.

Mật khẩu 8 ký tự bị từ chối được unit TC-65131848-06 phát hiện. Hai lỗi mới qua đọc mã và kiểm chứng trực tiếp ở môi trường này: `validateRegistration` từ chối `ABCDEFGH1` dù FR-01.4 chấp nhận chữ cái và số; `LOCK_DURATION_MS = 15 * 1000` và tài khoản đã khóa có `lockedAt` cách đây 16 giây đăng nhập thành công, trái FR-02.3–02.4 yêu cầu 15 phút. Hai dấu review tĩnh là kết quả kiểm mã trong lần tổng kết này, không khẳng định có ca tự động tương ứng.

Báo cáo Buổi 3 có bất nhất giữa mã ca, mô tả lỗi và CSV, nên các ánh xạ F theo mô tả lịch sử cần kiểm lại log gốc. Ba ca E2E đỏ trên CI chưa có log chi tiết để phân loại; bảy ca unit đỏ cũng không mặc định là bảy lỗi sản phẩm. Các lỗi R và S trong tài liệu/mã lab không được coi là lỗi đang mở của sản phẩm v1.1.

### 2.1. Nhận xét

**2.1.1. Lỗi chỉ có một dấu X**

Bảng dưới thể hiện tầng duy nhất **được ghi nhận trong bản đồ**, không chứng minh tầng khác không thể phát hiện nếu được bổ sung ca phù hợp.

| Lỗi | Tầng duy nhất bắt được theo hồ sơ | Hậu quả nếu bỏ tầng |
|---|---|---|
| Chấp nhận tuổi dưới giới hạn — F-01, v1.0 | Đơn vị | Sai kiểm tra đăng ký hoặc phí VIP có thể lọt sang tích hợp nếu không có ca thay thế. |
| Mật khẩu 8 ký tự bị từ chối — TC-65131848-06 | Đơn vị | Mật khẩu hợp lệ tại biên 8 ký tự có thể bị từ chối. |
| Mật khẩu chữ in hoa bị từ chối — `ABCDEFGH1` | Review tĩnh | Mật khẩu hợp lệ có thể bị từ chối khi đăng ký. |
| Tài khoản tự mở khóa quá sớm — 15 giây thay vì 15 phút | Review tĩnh | Khóa kết thúc sớm, làm giảm bảo vệ tài khoản. |
| Hủy được đơn của tài khoản khác — FR-05.5 | API | Người dùng có thể hủy đơn của tài khoản khác. |
| Tổng tiền thiếu phí vận chuyển — FR-05.2 | API | Đơn có thể bị tính thiếu phí vận chuyển. |
| R01 mâu thuẫn tuổi tối thiểu | Review tĩnh | Sai hoặc thiếu yêu cầu có thể lọt vào thiết kế và nghiệm thu. |
| R02 mật khẩu mạnh mơ hồ | Review tĩnh | Sai hoặc thiếu yêu cầu có thể lọt vào thiết kế và nghiệm thu. |
| R03 mâu thuẫn số lần đăng nhập sai | Review tĩnh | Sai hoặc thiếu yêu cầu có thể lọt vào thiết kế và nghiệm thu. |
| R04 giới hạn giỏ hàng mơ hồ | Review tĩnh | Sai hoặc thiếu yêu cầu có thể lọt vào thiết kế và nghiệm thu. |
| R05 mâu thuẫn ngưỡng miễn phí | Review tĩnh | Sai hoặc thiếu yêu cầu có thể lọt vào thiết kế và nghiệm thu. |
| R06 thiếu định nghĩa khách thân thiết | Review tĩnh | Sai hoặc thiếu yêu cầu có thể lọt vào thiết kế và nghiệm thu. |
| R07 yêu cầu gửi email ngoài phạm vi | Review tĩnh | Sai hoặc thiếu yêu cầu có thể lọt vào thiết kế và nghiệm thu. |
| R08 bước voucher không có đặc tả | Review tĩnh | Sai hoặc thiếu yêu cầu có thể lọt vào thiết kế và nghiệm thu. |
| R09 thời gian phản hồi không định lượng | Review tĩnh | Sai hoặc thiếu yêu cầu có thể lọt vào thiết kế và nghiệm thu. |
| R10 độ sẵn sàng 100% không khả thi | Review tĩnh | Sai hoặc thiếu yêu cầu có thể lọt vào thiết kế và nghiệm thu. |
| R11 ví dụ phí ngoại thành sai số liệu | Review tĩnh | Sai hoặc thiếu yêu cầu có thể lọt vào thiết kế và nghiệm thu. |
| R12 thuật ngữ VIP không nhất quán | Review tĩnh | Sai hoặc thiếu yêu cầu có thể lọt vào thiết kế và nghiệm thu. |
| S01 khóa phí nội thành bị khai báo trùng | Review tĩnh | Lỗi trong mã lab có thể lọt sang chạy thử hoặc bảo trì. |
| S02 tên biến `totl` không được khai báo | Review tĩnh | Lỗi trong mã lab có thể lọt sang chạy thử hoặc bảo trì. |
| S03 gán thay vì so sánh số lượng trong điều kiện | Review tĩnh | Lỗi trong mã lab có thể lọt sang chạy thử hoặc bảo trì. |
| S04 `typeof` sai tên kiểu | Review tĩnh | Lỗi trong mã lab có thể lọt sang chạy thử hoặc bảo trì. |
| S05 so sánh trực tiếp với `NaN` | Review tĩnh | Lỗi trong mã lab có thể lọt sang chạy thử hoặc bảo trì. |
| S06 nhánh `switch` thiếu `break` | Review tĩnh | Lỗi trong mã lab có thể lọt sang chạy thử hoặc bảo trì. |
| S07 điều kiện `else if` trùng | Review tĩnh | Lỗi trong mã lab có thể lọt sang chạy thử hoặc bảo trì. |
| S08 toán tử phủ định sai thứ tự khi kiểm `in` | Review tĩnh | Lỗi trong mã lab có thể lọt sang chạy thử hoặc bảo trì. |
| S09 công thức tổng trừ phí thay vì cộng phí | Review tĩnh | Lỗi trong mã lab có thể lọt sang chạy thử hoặc bảo trì. |
| S10 kiểm tra phạm vi số lượng sai | Review tĩnh | Lỗi trong mã lab có thể lọt sang chạy thử hoặc bảo trì. |
| F-02: chấp nhận mật khẩu 21 ký tự, v1.0 | Đơn vị | Sai kiểm tra đăng ký hoặc phí VIP có thể lọt sang tích hợp nếu không có ca thay thế. |
| F-03: không kiểm thành phần mật khẩu, v1.0 | Đơn vị | Sai kiểm tra đăng ký hoặc phí VIP có thể lọt sang tích hợp nếu không có ca thay thế. |
| F-05: thông báo khóa thiếu hướng dẫn, v1.0 | Thủ công / thăm dò | Thông báo sai hoặc thiếu có thể hiển thị tới người dùng. |
| F-10: VIP ngoại thành vẫn bị tính phí, v1.0 | Đơn vị | Sai kiểm tra đăng ký hoặc phí VIP có thể lọt sang tích hợp nếu không có ca thay thế. |
| Thông báo mật khẩu ngắn không đúng kỳ vọng, Buổi 2 | Thủ công / thăm dò | Thông báo sai hoặc thiếu có thể hiển thị tới người dùng. |

FR-06.5 và FR-06.6 có hai dấu (API và thủ công), nên không nằm trong bảng này. Các dòng không có dấu không được tính là lỗi riêng của bất kỳ tầng nào.

**2.1.2.** Review tĩnh có **24 dấu** (12 lỗi SRS v1.0, 10 lỗi lab, 2 lỗi sản phẩm phát hiện khi đọc mã); đơn vị có 5, API 4, E2E 0 và thủ công 4. Đây là tầng có nhiều dấu nhất theo chứng cứ hiện có, nhưng không vì thế là tầng quan trọng nhất: lỗi phân quyền hủy đơn chỉ được bộ API hiện tại phát hiện. Số này trộn lỗi tài liệu/lab và sản phẩm, không phản ánh giá trị theo cùng phạm vi.

**2.1.3.** Theo lần chạy CI, số ca khai báo Jest / API / E2E là **46 : 20 : 11**, xấp xỉ **4,18 : 1,82 : 1**. Jest gồm cả ca ví dụ; E2E có 6 skip, nên thực thi thực tế là **46 : 20 : 5**. Dáng số lượng giảm dần phù hợp ý tưởng tháp kiểm thử, nhưng chưa kết luận bộ ca hợp lý: ca skip và ca đỏ chưa phân loại làm số lượng không phản ánh chất lượng hay độ phủ.

## 3. Chi phí và giá trị của từng tầng

Thời gian viết là **ước tính lập kế hoạch**, không có nhật ký giờ thực tế; cần người thực hiện xác nhận. Thời gian chạy dưới đây là số đo có nguồn, khác môi trường và phạm vi.

| Tầng | Số ca | Thời gian chạy (đo thật) | Thời gian viết (ước lượng, giờ) | Số lỗi riêng tầng này bắt được |
|---|---|---|---:|---:|
| Review tĩnh | 12 lỗi review SRS; 19 vấn đề ESLint ban đầu (16 lỗi, 3 cảnh báo), không phải số ca tự động | Bước ESLint CI 1 giây; chưa có số đo thời gian review SRS | 1,5 | 24 |
| Đơn vị | 46 ca Jest, gồm ví dụ | CI: 0,95 giây theo Jest | 2 | 5; 4 ánh xạ lịch sử cần kiểm chứng |
| API | 20 ca | Windows: 5,6 giây theo Playwright | 1,5 | 2 |
| E2E | 11 ca khai báo; 6 skip | CI: 8,3 giây theo Playwright | 2,5 | 0 đã xác định |
| Thủ công / thăm dò | 6 ca FR-06; 1 phiên CT-05 | CT-05: 25 phút theo `Buoi04-Exploratory.md`; không phải tổng thời gian tất cả ca thủ công | 2 | 2 |

Số lỗi riêng được đếm từ mục 2: **24 + 5 + 2 + 0 + 2 = 33**. Hai lỗi FR-06 có hai dấu và không được tính là lỗi riêng. Các con số phản ánh bằng chứng đã ghi, không đo khả năng phát hiện tối đa của từng tầng.

**3.1.** Khi chỉ còn một nửa thời gian, ưu tiên: **API** (phân quyền/tính tiền, 2 lỗi riêng và 5,6 giây), **đơn vị** (0,95 giây, kiểm biên nghiệp vụ), **review tĩnh** (24 phát hiện theo hồ sơ, lưu ý khác phạm vi), **thủ công/thăm dò** theo rủi ro, rồi **E2E luồng chính**. Không loại bỏ hoàn toàn tầng nào; 6 ca E2E skip và 3 ca đỏ còn phải xử lý.

**3.2.** Ưu tiên viết thêm **10 ca API**: 4 ca khóa/mở khóa và thời gian, 2 ca phân quyền chéo, 2 ca tổng tiền với phí bằng 0/khác 0, 2 ca lọc/sắp xếp ở biên. Căn cứ: API đang bắt 4 lỗi v1.1, gồm 2 lỗi chỉ có dấu API; chạy 20 ca trong 5,6 giây. Đây là đề xuất phân bổ, không giả định 10 ca đã tồn tại; ca đăng ký biên cũng cần được bổ sung ở unit khi có thời gian.

## 4. Đánh giá chất lượng và khuyến nghị phát hành

### 4.1. Đối chiếu tiêu chí kết thúc

Nguyên văn từ `bai-nop/Buoi04-TestPlan.md`, mục 5:

| Tiêu chí kết thúc (nguyên văn Buổi 4) | Trạng thái hiện tại | Đạt / Không đạt |
|---|---|---|
| 100% các ca kiểm thử xác nhận cho 12 lỗi (F-01 đến F-12) và tính năng mới FR-06 đã được thực thi. | Báo cáo Buổi 4 ghi 12/12 lỗi đã xác nhận và 6 ca FR-06 đã chạy, 2 ca FR-06 thất bại. Mã ca lịch sử có bất nhất; chưa có bằng chứng chạy lại đầy đủ cho đợt hiện tại. | Chưa xác minh đủ để kết luận đạt |
| Không còn lỗi nghiêm trọng (Blocker/Critical/High) nào chưa được xử lý; các lỗi còn tồn đọng (nếu có) thuộc mức Low/Medium và đã có kế hoạch xử lý. | FR-05.5 cho phép hủy đơn người khác, đánh giá Critical; FR-05.2 và FR-06.5–06.6 vẫn thất bại; chưa có bằng chứng xử lý xong. | Không đạt |

### 4.2. Tóm tắt tình trạng chất lượng

- Có **ít nhất 7 lỗi sản phẩm khác nhau chưa có bằng chứng xử lý**: 4 lỗi API (FR-05.5, FR-05.2, FR-06.5, FR-06.6), lỗi mật khẩu 8 ký tự, lỗi mật khẩu chỉ dùng chữ in hoa và số, và lỗi khóa 15 giây thay vì 15 phút. Số issue chính thức đang mở chưa được xác minh; không coi 7 là số issue mở.
- Cao nhất là **Critical** theo đánh giá của báo cáo API: người dùng có thể hủy đơn của người khác.
- Rủi ro lớn nhất là **phân quyền và xác thực**; lỗi đơn hàng còn làm thiếu phí giao hàng.
- API Windows: 20 ca, 16 đạt, 4 đỏ, 5,6 giây; unit CI: 46 ca, 39 đạt, 7 đỏ, 0,95 giây.
- E2E CI: 11 ca khai báo, 2 đạt, 3 đỏ, 6 skip, 8,3 giây; nguyên nhân ba ca đỏ chưa phân loại.
- Bộ AI chạy riêng: 9/11 đạt; câu lệnh `shipping.js` phủ 91,66%, không phải bằng chứng sản phẩm không lỗi.

### 4.3. Khuyến nghị

- **Kết luận:** **Không đủ điều kiện phát hành.**
- **Căn cứ:** FR-05.5 là lỗi phân quyền Critical; còn ít nhất 7 lỗi sản phẩm chưa có bằng chứng khắc phục và tiêu chí thực thi đầy đủ chưa được xác minh. CI có 14 ca đỏ trên ba tầng và 6 ca E2E skip; số ca đỏ không đồng nghĩa số lỗi sản phẩm.
- **Nếu không đủ, danh sách việc phải làm trước, theo thứ tự:**
  1. Báo và sửa phân quyền FR-05.5, chạy lại ca hai tài khoản và kiểm trạng thái đơn.
  2. Sửa thời gian khóa, kiểm mật khẩu biên/chữ in hoa; bổ sung ca xác thực và hồi quy.
  3. Sửa tổng tiền, sắp xếp giảm và lọc tồn kho; xác nhận lại, cập nhật issue #7–#8.
  4. Phân loại 7 ca unit đỏ và 3 ca E2E đỏ, hoàn thiện 6 ca skip; chạy lại đầy đủ CI.
  5. Đối chiếu lại 12 lỗi F-01–F-12, FR-06, kế hoạch xử lý và cả hai tiêu chí kết thúc trước khi quyết định lại.

### 4.4. Ba việc nên làm tiếp theo về mặt kiểm thử nếu dự án tiếp tục

1. Bổ sung kiểm thử API phân quyền theo từng chủ sở hữu và kiểm tác dụng phụ.
2. Viết ca biên xác thực, đặc biệt 8 ký tự, chữ in hoa và thời gian khóa 15 phút.
3. Hoàn thiện E2E bị skip, xử lý flaky và lưu số liệu chạy cùng trace cho mỗi lần CI.

## 5. Tự đánh giá

**5.1.** Ba điều đã làm tốt nhất trong cả đợt:

1. Đối chiếu SRS và bảng quyết định để chọn kết quả mong đợi.
2. Kiểm cả tác dụng phụ của yêu cầu hủy đơn bằng hai tài khoản.
3. Giữ CI báo đỏ và lập đường mốc, không che các ca thất bại.

**5.2.** Ba điều sẽ làm khác nếu bắt đầu lại:

1. Ghi thời gian, log và phiên bản ngay khi chạy để có thể truy vết.
2. Cập nhật ca unit và dữ liệu khi yêu cầu thay đổi, đối chiếu mã ca giữa các báo cáo.
3. Hoàn thiện E2E và phân loại lỗi ngay, thay vì để ca skip và báo cáo trống.

**5.3.** Muốn học sâu kiểm thử bảo mật API và phân quyền theo đối tượng vì giao diện không tạo được tình huống tài khoản khác hủy đơn, nhưng hậu quả với người dùng rất nghiêm trọng.

## 6. Danh mục chuyển giao

### 6.1. Cần đọc gì, theo thứ tự

| Thứ tự | File | Vì sao cần đọc |
|---|---|---|
| 1 | `README.md`, `docs/SRS-MiniShop-v1.2.md` | Cài đặt, dữ liệu mẫu và quy tắc FR-01–FR-06. |
| 2 | `bai-nop/Buoi04-TestPlan.md`, `bai-nop/Buoi04-XacNhan-HoiQuy.md`, `bai-nop/Buoi04-Exploratory.md` | Tiêu chí phát hành, lỗi lịch sử và issue FR-06. |
| 3 | `bai-nop/Buoi06-BaoCaoAPI-CI.md`, `bai-nop/Buoi06-GenAI.md`, báo cáo này | Đường mốc, số liệu CI, hạn chế chứng cứ và phản biện AI. |
| 4 | `tests/unit/`, `tests/api/`, `tests/e2e/`, `.github/workflows/kiem-thu-day-du.yml` | Hiểu assertion, reset dữ liệu, ca skip và các bước CI. |

### 6.2. Cần chạy lệnh nào

| Lệnh | Kết quả mong đợi |
|---|---|
| `npm ci` | Cài phụ thuộc đúng theo lockfile; cần Node.js >= 18.18. |
| `npx playwright install chromium` | Cài Chromium; trên Linux CI có thể dùng `--with-deps`. |
| `npm run lint` | Chạy ESLint; có thể báo lỗi hiện có, không mặc định xanh. |
| `npm test -- --runInBand` | Theo đường mốc CI: 46 ca, 7 đỏ; cần phân loại trước khi sửa. |
| `npm run api` | Theo lần chạy Windows: 20 ca, 4 đỏ. Server và reset dữ liệu do Playwright quản lý. |
| `npx playwright test tests/e2e` | Theo đường mốc CI: 2 đạt, 3 đỏ, 6 skip; cần Chromium và log để phân tích. |
| `npm run test:ai -- --runInBand` | Bộ AI riêng: 9 đạt, 2 ca sai kỳ vọng; không nằm trong `npm test`. |
| `npm run coverage:ai -- --runInBand` | Coverage `shipping.js` 91,66% câu lệnh; lệnh đỏ do 2 ca AI. |
| `node scripts/kiem-tra-buoi06.js` | Kiểm tra hình thức bài nộp; không yêu cầu ca lỗi sản phẩm phải xanh. |

Chạy từng lệnh và lưu log; các lệnh test có thể trả mã lỗi khác 0. Tránh để server thường chiếm cổng 3000; so sánh thời gian phải xét môi trường chạy.

### 6.3. Cần biết trước điều gì về các ca đang đỏ

- Đường mốc [CI](https://github.com/luanpnm65/sot357-65131848/actions/runs/41923893525/job/126903127846): unit **7/46 đỏ**, API **4/20 đỏ**, E2E **3 đỏ, 2 đạt, 6 skip/11**. Đó là số ca chứ không phải số lỗi sản phẩm độc lập.
- API có lỗi phân quyền, tổng tiền, sắp xếp và tồn kho. Một số ca unit có kỳ vọng/dữ liệu cần sửa; ba ca E2E cần log chi tiết để phân loại.
- Hai ca AI sai kỳ vọng được giữ riêng để phản biện, không đưa vào `npm test` hay sửa sản phẩm cho phù hợp với kỳ vọng sai.
- [Lần thử CI](https://github.com/luanpnm65/sot357-65131848/actions/runs/41926268417/job/126911365961) đổi ngưỡng khóa 3 → 5: unit đỏ 7 → 8, API 4 → 6, E2E 3 → 2; không gộp nhánh thử nghiệm. Không kết luận nguyên nhân thay đổi E2E khi thiếu log.

### 6.4. Xác nhận trạng thái repo khi bàn giao

- [x] `npm run lint` đã chạy trên CI; bước cho phép lỗi, dấu xanh không khẳng định lint sạch.
- [x] `npm test` chạy được trên CI: 46 ca, 7 đỏ.
- [x] `npm run api` chạy được: 20 ca, 4 đỏ.
- [ ] `npm run e2e` chưa có kết quả chạy riêng: lệnh này có phạm vi rộng hơn bước CI. Riêng `npx playwright test tests/e2e` trên CI có 11 ca khai báo, 3 đỏ, 2 đạt, 6 skip.
- [x] Quy trình CI có 9 bước và đã chạy; artifact hai báo cáo HTML đã được người thực hiện tải và mở.
- [x] File báo cáo từ Buổi 1 đến Buổi 6 có trong `bai-nop/`; một số báo cáo Buổi 5 còn để trống, không coi việc có file là đã hoàn thiện.
