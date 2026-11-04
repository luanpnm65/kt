# BUỔI 6 – PHẢN BIỆN CA KIỂM THỬ DO GEN-AI SINH RA

- **Họ tên:** Phạm Nguyễn Minh Luân
- **MSSV:** 65131848

## 1. Nguồn
Bộ có sẵn `docs/Buoi06-TestCaseDoAISinh.md`, sao chép trong `tests/gen-ai/ai-sinh.test.js`, không sửa.

## 2. Dự đoán trước khi chạy và kết quả
Dự đoán được ghi sau khi đọc mã, trước khi chạy coverage: 01–09 xanh, 10–11 đỏ. Chạy `npm run coverage:ai -- --runInBand`: 9 đạt, 2 thất bại, 11/11 dự đoán đúng.

| Mã | Dự đoán | Thực tế | Lệch |
|---|---|---|---|
| AI-01 | xanh | xanh | không |
| AI-02 | xanh | xanh | không |
| AI-03 | xanh | xanh | không |
| AI-04 | xanh | xanh | không |
| AI-05 | xanh | xanh | không |
| AI-06 | xanh | xanh | không |
| AI-07 | xanh | xanh | không |
| AI-08 | xanh | xanh | không |
| AI-09 | xanh | xanh | không |
| AI-10 | đỏ | đỏ | không |
| AI-11 | đỏ | đỏ | không |

## 3. Phản biện từng ca
| Mã | Phân loại | Căn cứ |
|---|---|---|
| AI-01 | ĐÚNG | Thường nội thành dưới 500.000: 20.000, FR-04.1–04.2. |
| AI-02 | ĐÚNG | Thường ngoại thành dưới ngưỡng: 35.000, FR-04.1–04.2. |
| AI-03 | THỪA | Cùng lớp thường nội thành dưới ngưỡng với AI-01. |
| AI-04 | THỪA | Cùng lớp với AI-01; không phải biên. |
| AI-05 | ĐÚNG | Từ 500.000 miễn phí, FR-04.2. |
| AI-06 | ĐÚNG | Sát dưới ngưỡng: vẫn 20.000, FR-04.2. |
| AI-07 | ĐÚNG | VIP miễn phí, FR-04.3. |
| AI-08 | LUÔN XANH | >= 0 quá yếu: phí sai dương vẫn xanh; thực tế vẫn có thể đỏ nếu hàm trả số âm hoặc ném lỗi. |
| AI-09 | LUÔN XANH | `toBeDefined` chấp nhận phí sai bất kỳ, chỉ đỏ nếu undefined hoặc exception. |
| AI-10 | SAI KẾT QUẢ | Mục 1.3 không giao ngoài tỉnh; shipping.js ném lỗi, không có phí mặc định. SRS không chỉ định hình thức lỗi. |
| AI-11 | SAI KẾT QUẢ | FR-04.1–04.2 không miễn phí khi subtotal bằng 0; hàm trả 20.000. Đặt giỏ rỗng là quy tắc riêng FR-05.1. |

Tổng: ĐÚNG 5, SAI KẾT QUẢ 2, THỪA 2, LUÔN XANH 2. Nhãn luôn xanh theo nghĩa bài tập là khẳng định yếu, không phải bất khả thất bại về mặt toán học.

## 4. Phần thiếu
| Trường hợp | Căn cứ | Rủi ro |
|---|---|---|
| 500.000 đúng ngưỡng và 500.001 | FR-04.2, ca biên Buổi 2 | sai toán tử biên không bị phát hiện |
| VIP ngoại thành dưới ngưỡng | FR-04.3 | chỉ miễn phí VIP nội thành |
| Thường ngoại thành ngay dưới và tại ngưỡng | FR-04.1–04.2 | sai phí hoặc ngưỡng ở ngoại thành |
| Khu vực sai phải bị từ chối | SRS mục 1.3; shipping.js ném lỗi | âm tính giả do AI-10 kỳ vọng sai |
| subtotal không phải số/NaN | kiểm tra đầu vào trong shipping.js | thiếu kiểm nhánh lỗi |

## 5. Đo bao phủ
`npm run coverage:ai -- --runInBand`: câu lệnh 91,66%, nhánh 81,81%, dòng 91,66%, 1 dòng chưa phủ (dòng 15). Tuyên bố 100% không đúng. Các ca khẳng định yếu vẫn gọi hàm và có thể phủ dòng/nhánh, nhưng không kiểm đúng giá trị; độ phủ không chứng minh khả năng phát hiện lỗi.

## 6. Kết luận
Dùng ngay 5/11 (45,45%), sửa 2, bỏ 4. Review: giữ hai ca theo khu vực và các ca ngưỡng/VIP; sửa AI-10 thành `toThrow`, AI-11 thành 20.000 hoặc bỏ nếu không cần; bỏ hai ca trùng và hai assertion yếu. Bổ sung biên và tổ hợp còn thiếu. Không coi độ phủ cao là bằng chứng correctness.

Ước lượng theo số thao tác, không phải số phút đo: sửa bộ AI cần đọc 11, sửa 2, loại 4, thêm ít nhất 4 ca; tự viết bộ tương đương ít nhất 11 ca riêng. Không thể kết luận cách nào tiết kiệm thời gian nếu chưa đo thời gian thực tế; số ca sửa ít hơn không bao gồm công review.

Chỉ đưa vào CI sau khi review từng kỳ vọng theo SRS, sửa/bỏ ca yếu hoặc sai, bổ sung lớp/biên, chạy độc lập lặp lại ổn định, xác định nguyên nhân mọi ca đỏ và được người chịu trách nhiệm phê duyệt.
