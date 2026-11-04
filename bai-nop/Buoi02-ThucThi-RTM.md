# BUỔI 2 – CHẠY THỬ VÀ MA TRẬN TRUY VẾT

* **Họ tên:** Phạm Nguyễn Minh Luân
* **MSSV:** 65131848

## 0\. Đối chiếu SRS v1.1 với phiếu review Buổi 1

Trong buổi review Buổi 1, em đã phát hiện ra các vấn đề về sự thiếu nhất quán trong quy định về độ tuổi tối thiểu đăng ký và việc thiếu định nghĩa rõ ràng về mật khẩu mạnh. Em đã bỏ sót lỗi liên quan đến việc xử lý email trùng lặp (FR-01.5) và quy tắc reset bộ đếm khóa tài khoản (FR-02.3). Nguyên nhân bỏ sót là do ở Buổi 1 em quá tập trung vào luồng chính mà chưa phân tích kỹ các điều kiện biên và các trường hợp ngoại lệ liên quan đến bảo mật tài khoản.

## 1\. Kết quả chạy thử 5 ca ưu tiên Cao

|Mã ca|Tóm tắt ca|Kết quả mong đợi|Kết quả thực tế|Pass/Fail|
|-|-|-|-|-|
|TC-65131848-01|Đăng ký với tuổi 17|Không tạo tài khoản; báo lỗi "Tuổi phải là số nguyên từ 18 đến 100"|Không tạo tài khoản; báo lỗi "Tuổi phải là số nguyên từ 18 đến 100"|Pass|
|TC-65131848-05|Mật khẩu 7 ký tự|Không tạo tài khoản; báo lỗi "Mật khẩu phải từ 8 đến 20 ký tự và chứa ít nhất 1 chữ cái và 1 chữ số"|Không tạo tài khoản; báo lỗi "Mật khẩu quá ngắn"|Fail|
|TC-65131848-18|Phí vận chuyển Thường nội thành < 500k|Hiển thị Tạm tính: 350.000đ; Giảm giá: 0đ; Phí vận chuyển: 20.000đ; Tổng tiền: 370.000đ|Hiển thị Tạm tính: 350.000đ; Giảm giá: 0đ; Phí vận chuyển: 20.000đ; Tổng tiền: 370.000đ|Pass|
|TC-65131848-25|Đăng nhập đúng khi tài khoản Hoạt động|Đăng nhập thành công; chuyển hướng về Trang chủ|Đăng nhập thành công; chuyển hướng về Trang chủ|Pass|
|TC-65131848-29|Đăng nhập sai 3 lần liên tiếp bị khóa|Đăng nhập thất bại; báo lỗi "Tài khoản đã bị khóa, vui lòng thử lại sau 15 phút"|Đăng nhập thất bại; báo lỗi "Tài khoản đã bị khóa"|Fail|

### Phân tích các ca Fail

|Mã ca|Nguyên nhân: mã nguồn sai hay ca kiểm thử sai?|Căn cứ (mã yêu cầu trong SRS v1.1)|
|-|-|-|
|TC-65131848-05|Mã nguồn sai. Hệ thống hiển thị thông báo lỗi chưa đúng chuẩn nguyên văn theo yêu cầuSRS v1.1.|FR-01.4|
|TC-65131848-29|Mã nguồn sai. Thông báo khóa tài khoản thực tế bị thiếu phần hướng dẫn thời gian "vui lòng thử lại sau 15 phút".|FR-02.4|

## 2\. Ma trận truy vết (RTM)

|Yêu cầu|Mã ca phủ yêu cầu này|Số ca|
|-|-|-|
|FR-01.2|TC-65131848-01 (Dùng làm tiền đề)|1|
|FR-01.3|TC-65131848-01, TC-65131848-02, TC-65131848-03, TC-65131848-04|4|
|FR-01.4|TC-65131848-05, TC-65131848-06, TC-65131848-07, TC-65131848-08, TC-65131848-09, TC-65131848-10|6|
|FR-01.5|0|0|
|FR-02.1|TC-65131848-25|1|
|FR-02.2|TC-65131848-26, TC-65131848-28|2|
|FR-02.3|TC-65131848-27, TC-65131848-29|2|
|FR-02.4|TC-65131848-30, TC-65131848-31, TC-65131848-32|3|
|FR-03.2|TC-65131848-11, TC-65131848-12, TC-65131848-13, TC-65131848-14|4|
|FR-03.3|0|0|
|FR-03.4|TC-65131848-15, TC-65131848-16|2|
|FR-03.5|0|0|
|FR-03.6|0|0|
|FR-04.1|TC-65131848-18, TC-65131848-19, TC-65131848-21|3|
|FR-04.2|TC-65131848-20, TC-65131848-22|2|
|FR-04.3|TC-65131848-17, TC-65131848-23, TC-65131848-24|3|
|FR-05.2|TC-65131848-17, TC-65131848-18, TC-65131848-19, TC-65131848-20, TC-65131848-21, TC-65131848-22, TC-65131848-23, TC-65131848-24|8|
|FR-05.3|TC-65131848-17, TC-65131848-23, TC-65131848-24|3|
|FR-05.5|0|0|

Các yêu cầu chưa được phủ và lý do:

* FR-01.5, FR-03.3, FR-03.5, FR-03.6, FR-05.5 chưa được phủ trong bài thực hành này do phạm vi bài tập tập trung vào 3 kỹ thuật thiết kế ca kiểm thử Hộp đen chính (EP, BVA, Bảng quyết định và Chuyển trạng thái) cho các hàm xử lý dữ liệu cốt lõi và luồng khóa tài khoản.

Tổng: 14 / 19 yêu cầu được phủ (73.68%)

## 3\. Tự đánh giá

**3.1. Bộ ca kiểm thử có ca nào thừa không (hai ca cùng một lớp tương đương)?**
Bộ ca kiểm thử không có ca nào bị thừa. Mỗi ca kiểm thử được thiết kế đều nhắm trực tiếp vào một giá trị biên cụ thể (BVA), một lớp tương đương không hợp lệ riêng biệt (EP), một luật quyết định duy nhất trong bảng rút gọn (DT) hoặc một chuyển đổi trạng thái riêng biệt (ST).

**3.2. Kỹ thuật nào chiếm nhiều thời gian nhất? Vì sao?**
Kỹ thuật Bảng quyết định (Decision Table) chiếm nhiều thời gian nhất. Lý do là phải phân tích chi tiết sự kết hợp của 3 điều kiện độc lập, tính toán 4 con số chi tiết trong kết quả mong đợi (Tạm tính, Giảm giá, Phí vận chuyển, Tổng tiền) và đối chiếu kỹ giữa các ưu đãi của thành viên VIP với quy tắc tính phí giao hàng.

**3.3. Nếu chỉ được chạy 5 ca trong toàn bộ bộ ca, sẽ chọn 5 ca nào? Vì sao?**
Nên chọn các ca: **TC-65131848-02** (Đăng ký biên hợp lệ), **TC-65131848-05** (Mật khẩu không hợp lệ), **TC-65131848-18** (Tính tiền khách thường luồng cơ bản), **TC-65131848-22** (Ngưỡng miễn phí vận chuyển 500k) và **TC-65131848-29** (Tính năng khóa tài khoản). Vì 5 ca này bao phủ được các rủi ro lớn nhất về bảo mật, logic tính tiền cốt lõi và luồng đăng ký của hệ thống.

