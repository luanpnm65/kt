/*
 * BUỔI 6 — PHẦN 1B
 * Kiểm thử API tầng nghiệp vụ: giỏ hàng, đơn hàng và bộ lọc sản phẩm.
 *
 * Bốn ca đầu đã được viết sẵn làm mẫu cho ba nhóm kiểm tra:
 *   - ca âm trả về 4xx kèm thông báo;
 *   - quy tắc nghiệp vụ trong thân phản hồi;
 *   - tác dụng phụ, kiểm bằng một lời gọi API thứ hai.
 *
 * Các ca nghiệp vụ.
 * Không mở trình duyệt trong file này — chỉ dùng fixture `request`.
 */
const { test, expect } = require('@playwright/test');
const { datLaiDuLieu } = require('../helpers/dat-lai-du-lieu');

let token;

async function dangNhap(request, email = 'sv@ntu.edu.vn') {
  const res = await request.post('/api/login', { data: { email, password: 'Matkhau123' } });
  return (await res.json()).token;
}

function kemToken(tok = token) {
  return { headers: { Authorization: `Bearer ${tok}` } };
}

test.beforeEach(async ({ request }) => {
  await datLaiDuLieu(request);
  token = await dangNhap(request);
});

// ---------------------------------------------------------------
// GIỎ HÀNG — ca mẫu
// ---------------------------------------------------------------
test('FR-03.2 — thêm sản phẩm với số lượng 0 trả về 400', async ({ request }) => {
  const res = await request.post('/api/cart', { ...kemToken(), data: { productId: 3, qty: 0 } });

  expect(res.status()).toBe(400);
  expect((await res.json()).message).toContain('Số lượng phải là số nguyên từ 1 đến 99');
});

test('FR-03.6 — thêm sản phẩm không tồn tại trả về 404', async ({ request }) => {
  const res = await request.post('/api/cart', { ...kemToken(), data: { productId: 999, qty: 1 } });

  expect(res.status()).toBe(404);
  expect((await res.json()).message).toBe('Sản phẩm không tồn tại');
});

test('FR-03.3 — thêm lại sản phẩm đã có thì CẬP NHẬT số lượng, không cộng dồn', async ({ request }) => {
  await request.post('/api/cart', { ...kemToken(), data: { productId: 3, qty: 2 } });
  const res = await request.post('/api/cart', { ...kemToken(), data: { productId: 3, qty: 5 } });

  expect(res.status()).toBe(200);
  const gio = (await res.json()).cart;
  expect(gio.items).toHaveLength(1);
  expect(gio.items[0].qty).toBe(5);
  expect(gio.subtotal).toBe(250000); // 5 × 50.000đ
});

// Ca mẫu về TÁC DỤNG PHỤ: lời gọi thứ hai mới kiểm được trạng thái sau đó.
test('FR-05.1 — đặt hàng thành công thì giỏ hàng được làm trống', async ({ request }) => {
  await request.post('/api/cart', { ...kemToken(), data: { productId: 3, qty: 1 } });
  await request.post('/api/orders', { ...kemToken(), data: { zone: 'noi-thanh' } });

  const gio = await (await request.get('/api/cart', kemToken())).json();
  expect(gio.items).toHaveLength(0);
  expect(gio.subtotal).toBe(0);
});

test('FR-03.5 xóa sản phẩm không có trong giỏ', async ({ request }) => {
  const res = await request.delete('/api/cart/3', kemToken());
  expect(res.status()).toBe(404);
  expect(typeof (await res.json()).message).toBe('string');
});
test('FR-05.1 đặt giỏ rỗng', async ({ request }) => {
  const res = await request.post('/api/orders', { ...kemToken(), data: { zone: 'noi-thanh' } });
  expect(res.status()).toBe(400);
  expect((await res.json()).message).toBe('Giỏ hàng đang trống');
});
async function taoDon(request, tok, zone) {
  const add = await request.post('/api/cart', { ...kemToken(tok), data: { productId: 4, qty: 1 } });
  expect(add.status()).toBe(200);
  return request.post('/api/orders', { ...kemToken(tok), data: { zone } });
}
test('FR-05.2 tổng đơn thường gồm phí giao hàng', async ({ request }) => {
  const res = await taoDon(request, token, 'noi-thanh');
  expect(res.status()).toBe(201);
  const order = await res.json();
  expect(order).toMatchObject({ subtotal: 350000, discount: 0, shippingFee: 20000 });
  expect(order.total).toBe(order.subtotal - order.discount + order.shippingFee);
});
test('FR-05.3 VIP giảm giá và miễn phí giao hàng', async ({ request }) => {
  const vip = await dangNhap(request, 'vip@ntu.edu.vn');
  const res = await taoDon(request, vip, 'ngoai-thanh');
  expect(res.status()).toBe(201);
  const order = await res.json();
  expect(order.subtotal).toBe(350000);
  expect(order.discount).toBe(order.subtotal * 0.05);
  expect(order.shippingFee).toBe(0);
  expect(order.total).toBe(order.subtotal - order.discount + order.shippingFee);
});
test('FR-05.5 hủy đơn không tồn tại', async ({ request }) => {
  const res = await request.delete('/api/orders/9999', kemToken());
  expect(res.status()).toBe(404);
  expect((await res.json()).message).toBe('Không tìm thấy đơn hàng');
});
test('FR-05.5 hủy lại đơn đã hủy', async ({ request }) => {
  const created = await taoDon(request, token, 'noi-thanh');
  expect(created.status()).toBe(201);
  const { id } = await created.json();
  const first = await request.delete(`/api/orders/${id}`, kemToken());
  expect(first.status()).toBe(200);
  expect((await first.json()).status).toBe('DA_HUY');
  const second = await request.delete(`/api/orders/${id}`, kemToken());
  expect(second.status()).toBe(409);
  expect((await second.json()).message).toContain('Chỉ hủy được');
});
test('FR-06.5 sắp xếp giá giảm', async ({ request }) => {
  const res = await request.get('/api/products?sapXep=gia-giam');
  expect(res.status()).toBe(200);
  const products = await res.json();
  expect(Array.isArray(products)).toBe(true);
  expect(products.length).toBeGreaterThan(0);
  const prices = products.map((p) => p.price);
  expect(prices).toEqual([...prices].sort((a, b) => b - a));
});
test('FR-06.6 chỉ sản phẩm còn hàng', async ({ request }) => {
  const res = await request.get('/api/products?conHang=co');
  expect(res.status()).toBe(200);
  const products = await res.json();
  expect(Array.isArray(products)).toBe(true);
  expect(products.length).toBeGreaterThan(0);
  for (const product of products) expect(product.stock).toBeGreaterThan(0);
});
test('FR-06.7 lọc kết hợp danh mục và giá', async ({ request }) => {
  const res = await request.get('/api/products?danhMuc=do-dung-hoc-tap&khoangGia=duoi-100k');
  expect(res.status()).toBe(200);
  const products = await res.json();
  expect(Array.isArray(products)).toBe(true);
  expect(products.map((p) => p.name).sort()).toEqual(['Bút ký NTU', 'Sổ tay sinh viên'].sort());
});
