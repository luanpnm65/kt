/*
 * BUỔI 3 - PHẦN 3: Bổ sung ca kiểm thử để đạt bao phủ nhánh
 *
 * Mục tiêu: 100% bao phủ nhánh cho hai file
 *   - src/services/shipping.js
 *   - src/services/cart.js
 *
 * Xem phần chưa phủ:  npm run coverage  rồi mở coverage/lcov-report/index.html
 */
const { calcShippingFee } = require('../../src/services/shipping');
const cart = require('../../src/services/cart');

describe('calcShippingFee - các nhánh ngoại lệ', () => {
  // Ví dụ mẫu: một nhánh ném lỗi đã được viết sẵn.
  test('khu vực không hợp lệ thì ném lỗi', () => {
    expect(() => calcShippingFee({ subtotal: 100000, zone: 'tinh-khac', customerType: 'THUONG' }))
      .toThrow('Khu vực giao hàng không hợp lệ');
  });

  // TODO (3): bổ sung các ca cho những nhánh còn lại của calcShippingFee.
  test('giá trị đơn hàng không hợp lệ (không phải số hoặc số âm)', () => {
    expect(() => calcShippingFee({ subtotal: '500000', zone: 'noi-thanh', customerType: 'THUONG' }))
      .toThrow('Giá trị đơn hàng không hợp lệ');
    expect(() => calcShippingFee({ subtotal: -1000, zone: 'noi-thanh', customerType: 'THUONG' }))
      .toThrow('Giá trị đơn hàng không hợp lệ');
  });

  test('đơn hàng từ 500k trở lên được miễn phí vận chuyển', () => {
    const phi = calcShippingFee({ subtotal: 600000, zone: 'ngoai-thanh', customerType: 'THUONG' });
    expect(phi).toBe(0);
  });

  test('khách VIP ở nội thành được miễn phí vận chuyển', () => {
    const phi = calcShippingFee({ subtotal: 100000, zone: 'noi-thanh', customerType: 'VIP' });
    expect(phi).toBe(0);
  });

  test('khách thường hoặc ngoại thành tính phí theo khu vực', () => {
    expect(calcShippingFee({ subtotal: 100000, zone: 'noi-thanh', customerType: 'THUONG' })).toBe(20000);
    expect(calcShippingFee({ subtotal: 100000, zone: 'ngoai-thanh', customerType: 'THUONG' })).toBe(35000);
    expect(calcShippingFee({ subtotal: 100000, zone: 'ngoai-thanh', customerType: 'VIP' })).toBe(35000);
  });
});

describe('cart - các nhánh của nghiệp vụ giỏ hàng', () => {
  const EMAIL = 'test-buoi03@ntu.edu.vn';

  beforeEach(() => {
    cart.clearCart(EMAIL); // mỗi ca kiểm thử bắt đầu với giỏ trống
  });

  // Ví dụ mẫu: một ca đã được viết sẵn để tập test này chạy được.
  test('thêm sản phẩm mới vào giỏ', () => {
    const kq = cart.addToCart(EMAIL, 1, 2);
    expect(kq.ok).toBe(true);
    expect(kq.cart.items).toHaveLength(1);
  });

  // TODO (4): viết các ca phủ hết nhánh còn lại của cart.js.
  test('số lượng không hợp lệ khi thêm vào giỏ', () => {
    const kq0 = cart.addToCart(EMAIL, 1, 0);
    expect(kq0.ok).toBe(true); 

    const kq100 = cart.addToCart(EMAIL, 1, 100);
    expect(kq100.ok).toBe(false);
  });

  test('cập nhật số lượng khi sản phẩm đã có trong giỏ', () => {
    cart.addToCart(EMAIL, 1, 2);
    const kq = cart.addToCart(EMAIL, 1, 5); 
    expect(kq.ok).toBe(true);
    expect(kq.cart.items).toHaveLength(1);
    expect(kq.cart.items[0].qty).toBe(5);
  });

  test('xử lý email chưa từng có giỏ hàng và sản phẩm không tồn tại trong kho', () => {
    const newEmail = 'brandnew-email@ntu.edu.vn';
    // Thêm sản phẩm không tồn tại trong hệ thống (productId: 99999) để phủ nhánh sản phẩm không xác định
    const kq = cart.addToCart(newEmail, 99999, 2);
    expect(kq.ok).toBe(true);
    expect(kq.cart.items[0].name).toBe('(không xác định)');
    expect(kq.cart.items[0].price).toBe(0);
  });

  test('xóa sản phẩm khỏi giỏ hàng thành công và trường hợp sản phẩm không có trong giỏ', () => {
    cart.addToCart(EMAIL, 1, 2);
    
    // Xóa sản phẩm không có trong giỏ (phủ nhánh index === -1)
    const kqFail = cart.removeFromCart(EMAIL, 999);
    expect(kqFail.ok).toBe(false);
    expect(kqFail.status).toBe(404);

    // Xóa sản phẩm có trong giỏ thành công
    const kqSuccess = cart.removeFromCart(EMAIL, 1);
    expect(kqSuccess.ok).toBe(true);
    expect(kqSuccess.cart.items).toHaveLength(0);
  });
  test('gọi hàm không truyền tham số (sử dụng giá trị mặc định)', () => {
    expect(() => calcShippingFee()).toThrow();
  });
});