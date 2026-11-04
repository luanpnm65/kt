# BUỔI 2 – BẢNG QUYẾT ĐỊNH: PHÍ VẬN CHUYỂN VÀ GIẢM GIÁ
- **Họ tên:Phạm Nguyễn Minh Luân**
- **MSSV:**65131848
- **Yêu cầu liên quan:** FR-04.1, FR-04.2, FR-04.3, FR-05.2, FR-05.3

## 1. Điều kiện và hành động

| Ký hiệu | Điều kiện | Các giá trị |
|---|---|---|
| C1 | Loại thành viên | VIP / Thường |
| C2 | Khu vực giao hàng | Nội thành / Ngoại thành |
| C3 | Tạm tính >= 500.000đ | Đúng / Sai |

| Ký hiệu | Hành động |
|---|---|
| A1 | Phí vận chuyển (đ) |
| A2 | Mức giảm giá (%) |
| A3 | Công thức Tổng tiền |

Số luật của bảng đầy đủ = 2^3 = 8 luật

## 2. Bảng quyết định đầy đủ

| | L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 |
|---|---|---|---|---|---|---|---|---|
| **C1** | VIP | VIP | VIP | VIP | Thường | Thường | Thường | Thường |
| **C2** | Nội thành | Nội thành | Ngoại thành | Ngoại thành | Nội thành | Nội thành | Ngoại thành | Ngoại thành |
| **C3** | Đúng | Sai | Đúng | Sai | Đúng | Sai | Đúng | Sai |
| **A1** | 0đ | 0đ | 0đ | 0đ | 0đ | 20.000đ | 0đ | 35.000đ |
| **A2** | 5% | 5% | 5% | 5% | 0% | 0% | 0% | 0% |
| **A3** | TT - 5%TT | TT - 5%TT | TT - 5%TT | TT - 5%TT | TT | TT + 20k | TT | TT + 35k |

## 3. Bảng rút gọn

Dùng `–` cho giá trị *don't care*.

| | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| **C1** | VIP | Thường | Thường | Thường |
| **C2** | – | Nội thành | Ngoại thành | – |
| **C3** | – | Sai | Sai | Đúng |
| **A1** | 0đ | 20.000đ | 35.000đ | 0đ |
| **A2** | 5% | 0% | 0% | 0% |
| **A3** | TT - 5%TT | TT + 20.000đ | TT + 35.000đ | TT |

**Giải thích việc gộp:** nêu rõ luật nào gộp với luật nào và vì sao hành động không phụ thuộc điều kiện đó.
- **R1 (Gộp L1, L2, L3, L4):** Khi tài khoản là thành viên VIP , theo FR-04.3 thành viên VIP luôn được miễn phí vận chuyển ở mọi khu vực và FR-05.3 được giảm 5% trên tạm tính không phụ thuộc vào khu vực giao hàng hay giá trị tạm tính . Do đó `C2` và `C3` là *don't care*.
- **R4 (Gộp L5, L7):** Khi tài khoản là thành viên Thường và tạm tính từ 500.000đ trở lên, theo FR-04.2 đơn hàng được miễn phí vận chuyển 0đ bất kể khu vực giao hàng là Nội thành hay Ngoại thành. Do đó `C2` là *don't care*.
## 4. Ánh xạ sang ca kiểm thử

| Luật rút gọn | Mã ca trong Buoi02-TestCase.csv |
|---|---|
| R1 | TC-65131848-13 |
| R2 | TC-65131848-14 |
| R3 | TC-65131848-15 |
| R4 | TC-65131848-16 |
| Ca biên 500.000đ | TC-65131848-17, TC-65131848-18, TC-65131848-19, TC-65131848-20 |

**Ghi chú về biên:** giá sản phẩm trong MiniShop đều là bội số của 50.000đ. Sinh viên tạo được những giá trị tạm tính nào quanh ngưỡng 500.000đ? Giá trị nào không tạo được qua giao diện?
- **Các giá trị tạm tính tạo được quanh ngưỡng 500.000đ:**
  - **450.000đ:** 3 x Áo thun NTU (3 x 150.000đ)
  - **500.000đ (Đúng biên):** 1 x Balo laptop + 1 x Áo thun NTU (350.000đ + 150.000đ)
  - **550.000đ:** 1 x Balo laptop + 1 x Nón bảo hiểm NTU (350.000đ + 200.000đ).
- **Giá trị KHÔNG tạo được qua giao diện:** Giá trị **499.000đ** và **500.001đ** (biên lý thuyết sát nút) không thể tạo được qua giao diện người dùng vì tất cả sản phẩm trong MiniShop đều có đơn giá là bội số của 50.000đ. Giá trị cận dưới gần nhất tạo được là 450.000đ và cận trên gần nhất là 550.000đ.