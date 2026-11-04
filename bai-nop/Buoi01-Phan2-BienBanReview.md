# BIÊN BẢN REVIEW TÀI LIỆU YÊU CẦU

## Thông tin chung

|Mục|Nội dung|
|-|-|
|Họ tên|Phạm Nguyễn Minh Luân|
|MSSV|65131848|
|Tài liệu được review|MSN-SRS – Đặc tả yêu cầu MiniShop NTU, phiên bản 1.0|
|Loại review|Review theo checklist (cá nhân)|
|Ngày|26/09/2026|
|Bước 1 – Khởi động|từ …… đến ……|
|Bước 2 – Đọc lần 1 (theo trình tự)|từ …… đến ……|
|Bước 3 – Đọc lần 2 (đối chiếu chéo)|từ …… đến ……|
|Bước 4 – Hoàn thiện biên bản|từ …… đến ……|

## Danh sách lỗi

Loại lỗi: MƠ HỒ · MÂU THUẪN · THIẾU · KHÔNG KIỂM THỬ ĐƯỢC · KHÔNG KHẢ THI · THUẬT NGỮ · SAI SỐ LIỆU
Mức độ: Major · Minor

|STT|Vị trí (mã yêu cầu / mục)|Mô tả lỗi|Mã checklist|Loại lỗi|Mức độ|Tìm thấy ở lần đọc (1/2)|Đề xuất sửa|
|-|-|-|-|-|-|-|-|
|1|Mục 2.2 / FR-01.3|Mục 2.2 yêu cầu từ 18 tuổi trở lên, nhưng FR-01.3 lại yêu cầu trên 18 tuổi|CL-02|Mâu thuẫn|Major|2|Thống nhất ở cả 2 mục thành: "Người dùng phải từ 18 tuổi trở lên mới được đăng ký"|
|2|FR-01.4|Sử dung từ ngữ mơ hồ, mật khẩu đủ mạnh chưa rõ mật khẩu phải gồm những gì mới coi là đủ mạnh|CL-01|Mơ hồ|Major|1|Quy định rõ tiêu chí: "Mật khẩu từ 8 đến 20 ký tự, phải bao gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số".|
|3|FR-02.3 / NFR-03|FR-02.3 quy định khóa tài khoản sau 3 lần đăng nhập sai, nhưng NFR-03 lại quy định khóa sau 5 lần sai. <br />|CL-02|Mâu thuẫn|Major|2|Sửa NFR-03 thành 3 lần cho đồng bộ với yêu cầu chức năng FR-02.3 và mã nguồn hệ thống.|
|4|FR-03.4|Sử dung từ mơ hồ, không thể viết test case kiểm thử|CL-01 / CL-04|Không kiểm thử được|Major|1|Đưa ra con số cụ thể: "Giỏ hàng chứa tối đa 50 mặt hàng khác nhau và tổng số lượng không quá 999".|
|5|FR-04.2 / Phụ lục A (Dòng #3)|FR-04.2 ghi trên 500.000đ mới miễn phí, nhưng phụ lục A dòng 3 xác định mốc 500.000đ phí là 0đ|CL-02 / CL-07 <br />|Mâu thuẫn|Major|2|Sửa FR-04.2 thành: "Đơn hàng có tạm tính từ 500.000đ trở lên được miễn phí vận chuyển".|
|6|FR-05.3|Sử dụng khái niệm "khách hang than thiết" nhưng không mô tả tiêu chí để đạt danh hiệu này|CL-03|Thiếu|Major|1|Bổ sung định nghĩa: "Khách hàng thân thiết là thành viên đã hoàn thành tối thiểu 5 đơn hàng hoặc có tổng chi tiêu >= 2.000.000đ".|
|7|FR-05.4 / Mục 1.2|<br />Yêu cầu gửi email xác nhận sau khi đặt hàng, nhưng phần phạm vi phiên bản này không hỗ trợ gửi mail|CL-05|Không khả thi|Minor|2|Tạm bỏ chức năng gửi email xác nhận, thay bằng hiển thị thông báo và mã đơn hàng thành công trên màn hình web.|
|8|UC-03 (Bước 3) / FR-05|Bước 3 của UC-03 có hành động "Thành viên nhập mã giảm giá", nhưng toàn bộ mục FR-05 không có yêu cầu chức năng nào quy định việc quản lý/áp dụng mã giảm giá|CL-08|Thiếu|Major|2|Bổ sung FR-05.6 quy định về quy tắc nhập và kiểm tra mã giảm giá (Voucher), hoặc bỏ Bước 3 khỏi UC-03.|
|9|NFR-01|Yêu cầu "phản hồi nhanh với mọi thao tác" không có con số tiêu chí đo lường cụ thể|CL-01 / CL-04 <br />|Không kiểm thử được|Minor|1|Quy định thông số đo lường: "Thời gian phản hồi của hệ thống cho các thao tác không vượt quá 2 giây".|
|10|NFR-02|Yêu cầu hệ thống "hoạt động 100% thời gian và không bao giờ xảy ra lỗi" là không khả thi trong thực tế|CL-05|Không khả thi|Major|2|Sửa lại chỉ số độ tin cậy thực tế: "Hệ thống đạt độ sẵn sàng (Uptime) tối thiểu 99.5% mỗi tháng".|
|11|Phụ lục A (Dòng #2)|Dòng 2: Khách thường, Ngoại thành, Tạm tính 200.000đ lại tính phí vận chuyển là 30.000đ, trong khi FR-04.1 quy định ngoại thành là 35.000đ|CL-07 <br />|Sai số liệu|Major|2|Sửa số liệu phí vận chuyển ở dòng 2 Phụ lục A từ 30.000đ thành 35.000đ.|
|12|Mục 1.3 / FR-05.3|Trong thuật ngữ (Mục 1.3) và các phân nhóm (Mục 2.1) chỉ sử dụng khái niệm "Thành viên VIP", nhưng FR-05.3 lại dùng cụm từ "Khách hàng thân thiết" không đồng nhất|CL-06|Thuật ngữ|Minor|2|Thay cụm từ "Khách hàng thân thiết" ở FR-05.3 thành "Thành viên VIP" cho nhất quán toàn tài liệu.|

(Thêm dòng nếu cần.)

## Thống kê

|Loại lỗi|Số lượng|
|-|-|
|MƠ HỒ|1|
|MÂU THUẪN|3|
|THIẾU|2|
|KHÔNG KIỂM THỬ ĐƯỢC|2|
|KHÔNG KHẢ THI|2|
|THUẬT NGỮ|1|
|SAI SỐ LIỆU|1|
|**Tổng**|12|
|Trong đó Major / Minor|9/3|

## Các điểm cần hỏi lại BA (em chưa chắc ý đồ tác giả)

1. Về điều kiện độ tuổi đăng ký: Tác giả muốn quy định độ tuổi tối thiểu là từ đủ 18 tuổi trở lên hay bắt buộc phải trên 18 tuổi

Về mốc miễn phí vận chuyển: Đơn hàng có giá trị đúng 500.000đ có được miễn phí vận chuyển hay không, hay phải từ 500.000đ trở lên mới được miễn phí vận chuyển.

Kết luận review

Đánh dấu một lựa chọn:

* \[ ] **Chấp nhận** – tài liệu dùng được ngay
* \[ ] **Chấp nhận có điều kiện** – dùng được sau khi sửa các lỗi đã nêu, không cần review lại
* \[x] **Review lại** – phải sửa và tổ chức review lần 2

Lý do: Tài liệu phát hiện tới 12 lỗi, trong đó có 9 lỗi mức độ Major bao gồm mâu thuần trực tiếp giữa các mục yêu cầu (độ tuổi, số lần khóa tài khoản, mốc miễn phí vận chuyển), sai lệch số liệu ở Phụ lục A, và chứa các yêu cầu không thể kiểm thử hoặc không khả thi. Những lỗi này nếu không được chỉnh sửa và thông qua review lần 2 sẽ khiến lập trình viên hiểu sai nghiệp vụ và viết code bị lỗi.

## Tự đánh giá (3–5 câu)

1. Lần đọc thứ hai (đối chiếu chéo) giúp em tìm thêm được bao nhiêu lỗi? Đó là những loại lỗi nào?
Lần đọc thứ hai (đối chiếu chéo) giúp em tìm thêm được 7 lỗi. Đó chủ yếu là các loại lỗi: mâu thuẫn (đối chiếu giữa FR với NFR, giữa Yêu cầu với Phụ lục A), sai số liệu, thuật ngữ và thiếu (đối chiếu bước làm trong UC-03 với các FR).
2. Nếu tổ chức review theo nhóm (có Moderator, Author, nhiều Reviewer), em nghĩ những lỗi nào sẽ dễ được phát hiện hơn? Vì sao?
Nếu tổ chức review theo nhóm (có Moderator, Author, nhiều Reviewer), em nghĩ các lỗi thuộc loại mơ hồ, thiếu và không kiểm thử được sẽ dễ được phát hiện hơn. Vì các thành viên khi thảo luận và đóng góp nhiều góc nhìn kỹ thuật khác nhau sẽ dễ nhận ra những điểm câu từ chưa rõ ràng, các tiêu chí thiếu định lượng hoặc kịch bản nghiệp vụ bị bỏ sót
3. Lần sau review tài liệu, em sẽ làm khác đi điều gì?

&#x20;  Lần sau review tài liệu, em sẽ thiết lập bảng đối chiếu chéo (Traceability) giữa các yêu cầu chức năng với phụ lục và ca sử dụng ngay từ đầu, đồng thời đánh dấu ngay những từ ngữ mang tính cảm tính khi đọc lướt lượt đầu để tiết kiệm thời gian hơn .

