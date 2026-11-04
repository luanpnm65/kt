/*
 * BUỔI 3 - PHẦN 1: Kiểm thử hướng dữ liệu
 *
 * Nạp trực tiếp bộ ca đã thiết kế ở Buổi 2 (bai-nop/Buoi02-DuLieuKiemThu.csv)
 * và chạy chúng trên các hàm nghiệp vụ của MiniShop.
 *
 * Chạy riêng file này:  npx jest tests/unit/du-lieu-csv
 */
const { docDuLieuKiemThu } = require('../helpers/doc-csv');
const { validateRegistration } = require('../../src/services/registration');
const { validateQuantity } = require('../../src/services/cart');
const { calcShippingFee } = require('../../src/services/shipping');

describe('validateRegistration - dữ liệu từ Buoi02-DuLieuKiemThu.csv', () => {
  const duLieu = docDuLieuKiemThu('validateRegistration');

  test.each(duLieu)('$maCa: $ketQuaKyVong', ({ thamSo, ketQuaKyVong }) => {
    // Hàm trả về MẢNG thông báo lỗi: mảng rỗng nghĩa là dữ liệu hợp lệ.
    const loi = validateRegistration(thamSo);
    const thucTe = loi.length === 0 ? 'HOP_LE' : 'KHONG_HOP_LE';
    expect(thucTe).toBe(ketQuaKyVong);
  });
});

describe('validateQuantity - dữ liệu từ Buoi02-DuLieuKiemThu.csv', () => {
  const duLieu = docDuLieuKiemThu('validateQuantity');

  test.each(duLieu)('$maCa: $ketQuaKyVong', ({ thamSo, ketQuaKyVong }) => {
    // validateQuantity nhận MỘT tham số là số lượng: validateQuantity(thamSo.qty)
    const hopLe = validateQuantity(thamSo.qty);
    // Hàm trả về true/false, quy đổi sang 'HOP_LE' / 'KHONG_HOP_LE'
    const thucTe = hopLe ? 'HOP_LE' : 'KHONG_HOP_LE';
    expect(thucTe).toBe(ketQuaKyVong);
  });
});

describe('calcShippingFee - dữ liệu từ Buoi02-DuLieuKiemThu.csv', () => {
  const duLieu = docDuLieuKiemThu('calcShippingFee');

  test.each(duLieu)('$maCa: $ketQuaKyVong', ({ thamSo, ketQuaKyVong }) => {
    // calcShippingFee nhận MỘT đối tượng: calcShippingFee(thamSo)
    const phiGiaoHang = calcShippingFee(thamSo);
    // Kết quả mong đợi trong CSV là chuỗi, đổi sang số: Number(ketQuaKyVong)
    expect(phiGiaoHang).toBe(Number(ketQuaKyVong));
  });
});