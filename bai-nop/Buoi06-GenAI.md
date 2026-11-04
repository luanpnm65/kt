# BUỔI 6 – PHẢN BIỆN CA KIỂM THỬ DO GEN-AI SINH RA

- **Họ tên:** Phạm Nguyễn Minh Luân
- **MSSV:** 65131848

## 1. Nguồn
Bộ có sẵn `docs/Buoi06-TestCaseDoAISinh.md`, sao chép trong `tests/gen-ai/ai-sinh.test.js`, không sửa.

## 2. Dự đoán trước khi chạy và kết quả
Dự đoán đã ghi trong báo cáo sau khi đọc mã, trước lần chạy ban đầu: 01–09 xanh, 10–11 đỏ. Kết quả `npm run test:ai` trên máy Windows: 11 ca, 9 đạt, 2 thất bại (AI-10 và AI-11), thời gian Jest báo 1,583 giây; khớp 11/11 dự đoán đã ghi.

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

| Chỉ số | Giá trị |
|---|---:|
| Tổng số ca | 11 |
| Số ca đạt | 9 |
| Số ca thất bại | 2 |
| Số ca dự đoán đúng | 11 |
| Thời gian chạy | 1,583 giây |

## 3. Phản biện từng ca
| Mã ca | Phân loại | Giải thích | Căn cứ (SRS v1.2 hoặc mã nguồn) |
|---|---|---|---|
| AI-01 | ĐÚNG | Khách thường nội thành, dưới ngưỡng: phí 20.000đ. | FR-04.1–04.2 |
| AI-02 | ĐÚNG | Khách thường ngoại thành, dưới ngưỡng: phí 35.000đ. | FR-04.1–04.2 |
| AI-03 | THỪA | Cùng lớp khách thường nội thành dưới ngưỡng với AI-01. | FR-04.1–04.2 |
| AI-04 | THỪA | Cùng lớp với AI-01, không phải giá trị biên. | FR-04.1–04.2 |
| AI-05 | ĐÚNG | Tạm tính 600.000đ được miễn phí vận chuyển. | FR-04.2 |
| AI-06 | ĐÚNG | Sát dưới ngưỡng miễn phí, vẫn trả 20.000đ. | FR-04.1–04.2 |
| AI-07 | ĐÚNG | VIP được miễn phí vận chuyển. | FR-04.3 |
| AI-08 | LUÔN XANH | Khẳng định phí không âm vẫn chấp nhận giá trị dương sai. | `toBeGreaterThanOrEqual(0)` trong `ai-sinh.test.js` |
| AI-09 | LUÔN XANH | Khẳng định chỉ yêu cầu có giá trị, không kiểm số tiền đúng. | `toBeDefined()` trong `ai-sinh.test.js` |
| AI-10 | SAI KẾT QUẢ | Kỳ vọng phí mặc định không có căn cứ; hàm ném lỗi cho khu vực không hợp lệ. | SRS mục 1.3; `shipping.js` dòng 11–12 |
| AI-11 | SAI KẾT QUẢ | Không có quy tắc miễn phí vì tạm tính bằng 0; hàm trả 20.000đ cho đầu vào này. Giỏ rỗng bị từ chối khi đặt hàng là quy tắc riêng. | FR-04.1–04.2, FR-05.1; `shipping.js` |

Tổng: ĐÚNG 5, SAI KẾT QUẢ 2, THỪA 2, LUÔN XANH 2. Nhãn luôn xanh theo nghĩa bài tập là khẳng định yếu, không phải bất khả thất bại về mặt toán học.

## 4. Những lớp tương đương và giá trị biên AI bỏ sót

Đối chiếu `bai-nop/Buoi02-TestCase.csv` và `bai-nop/Buoi02-BangQuyetDinh.md`:

| Trường hợp thiếu | Căn cứ trong SRS v1.2 và đối chiếu Buổi 2 | Hậu quả nếu không kiểm |
|---|---|---|
| Khách thường ngoại thành, **đúng 500.000đ**, phí 0đ | FR-04.2; TC-65131848-22 | Có thể bỏ sót lỗi chỉ miễn phí khi tạm tính lớn hơn 500.000đ. AI-05 kiểm trên ngưỡng, chưa kiểm đúng ngưỡng. |
| VIP ngoại thành, dưới ngưỡng, phí 0đ | FR-04.3; TC-65131848-23 | Có thể bỏ sót lỗi chỉ miễn phí cho VIP nội thành. AI-07 chỉ kiểm VIP nội thành. |
| Khách thường ngoại thành, trên ngưỡng, phí 0đ | FR-04.2; TC-65131848-20 | Có thể bỏ sót lỗi miễn phí đơn lớn chỉ áp dụng cho nội thành. AI-05 chỉ kiểm nội thành. |
| VIP nội thành, đúng 500.000đ, phí 0đ | FR-04.2–04.3; TC-65131848-24 | Có thể bỏ sót lỗi khi kết hợp ưu đãi VIP với đúng ngưỡng. |
| Khách thường ngoại thành, sát dưới ngưỡng **499.999đ**, phí 35.000đ | FR-04.1–04.2; mở rộng luật R3 và ca ngoại thành dưới ngưỡng TC-65131848-19 | Có thể bỏ sót lỗi phí hoặc điều kiện miễn phí ở ngoại thành gần ngưỡng. AI-06 chỉ kiểm sát ngưỡng ở nội thành. |
| Khách thường ngay trên ngưỡng **500.001đ**, phí 0đ | FR-04.2; bổ sung kiểm biên cho nhóm TC-65131848-20–22 | Có thể bỏ sót xử lý sai ngay phía trên ngưỡng; AI-05 chỉ kiểm 600.000đ. |

AI đã có đầu vào khu vực không hợp lệ ở AI-10, nhưng kỳ vọng sai; đó là ca cần sửa, không phải trường hợp đầu vào bị bỏ sót hoàn toàn. Các giá trị 499.999đ và 500.001đ là ca bổ sung ở mức hàm, không phải ca đã ghi nguyên văn trong Buổi 2.

## 5. Kiểm chứng lời tuyên bố của AI

Đo `shipping.js` trên máy Windows bằng `npm run coverage:ai`: 11 ca, 9 đạt, 2 thất bại; thời gian Jest báo 0,891 giây.

| Chỉ số | AI tuyên bố | Đo được thực tế |
|---|---|---|
| Bao phủ câu lệnh | 100% | 91,66% |
| Bao phủ nhánh | Không nêu | 81,81% |
| Bao phủ hàm | Không nêu | 100% |
| Bao phủ dòng | Không nêu | 91,66% |
| Dòng chưa được phủ | Không nêu | 1 dòng: dòng 15 |

**5.1.** Tuyên bố đạt 100% bao phủ câu lệnh không đúng. Lệnh kết thúc với mã lỗi 1 do AI-10 và AI-11 thất bại, nhưng vẫn xuất báo cáo coverage; bộ ca chưa thể dùng ngay.

**5.2.** Các ca có khẳng định yếu vẫn gọi hàm và có thể làm tăng độ bao phủ nếu thực thi dòng hoặc nhánh chưa được ca khác phủ. Riêng AI-08 và AI-09 dùng đầu vào cùng lớp với AI-01 và AI-02 nên không thể kết luận chúng làm tăng số đo của bộ này nếu không đo lại khi bỏ chúng. Dù dòng được thực thi, khẳng định yếu vẫn có thể bỏ qua phí sai; độ bao phủ không chứng minh khả năng phát hiện lỗi.

## 6. Kết luận

**6.1. Dùng được, cần sửa và nên bỏ**

| Quyết định | Mã ca | Số lượng |
|---|---|---:|
| Dùng ngay | AI-01, AI-02, AI-05, AI-06, AI-07 | 5 |
| Sửa | AI-10, AI-11 | 2 |
| Bỏ | AI-03, AI-04, AI-08, AI-09 | 4 |

Tỷ lệ dùng ngay: **5 / 11 × 100 = 45,45%**.

Nhận xét review: Giữ các ca có kết quả khớp SRS và các ca biên hữu ích. AI-10 cần kiểm việc từ chối khu vực không hợp lệ thay vì phí mặc định; nếu kiểm `toThrow`, cần xác nhận giao kèo của hàm vì SRS không quy định hình thức lỗi. AI-11 cần đối chiếu quy tắc phí và bối cảnh giỏ rỗng trước khi sửa kỳ vọng. Hai ca trùng và hai khẳng định quá yếu nên bỏ. Bổ sung các tổ hợp và biên ở mục 4; không coi độ bao phủ cao là bằng chứng bộ ca có chất lượng.

**6.2. So sánh công sức**

Giả sử giữ 5 ca, sửa 2 ca và bổ sung 6 trường hợp ở mục 4 thì bộ đích có 13 ca. Sửa bộ AI cần **đọc 11 ca, sửa 2, bỏ 4 và viết thêm 6**; tự viết bộ tương đương cần **viết 13 ca từ đầu**. Theo số ca phải viết hoặc sửa, dùng bộ AI ít hơn: 8 so với 13, tiết kiệm 5 ca viết mới. Tuy nhiên, phép đếm này chưa tính công đọc, kiểm chứng và loại bỏ 11 ca AI; chưa đo thời gian thực tế nên không thể khẳng định cách nào mất ít thời gian hơn.

**6.3. Điều kiện đưa bộ ca AI vào CI**

- Đối chiếu từng đầu vào và kết quả mong đợi với SRS; xác nhận các hành vi SRS chưa quy định rõ.
- Sửa hoặc bỏ ca sai, trùng và khẳng định yếu; bổ sung các lớp và biên còn thiếu.
- Chạy độc lập, lặp lại ổn định; phân loại và xử lý hoặc theo dõi mọi ca đỏ, không che lỗi bằng `continue-on-error`.
- Được người chịu trách nhiệm review, phê duyệt, rồi mới đưa bộ ca đã kiểm chứng vào quy trình tự động.
