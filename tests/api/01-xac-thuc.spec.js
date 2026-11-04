/*
 * BUỔI 6 — PHẦN 1A
 * Kiểm thử API tầng xác thực và phân quyền của MiniShop.
 *
 * Ba ca đầu đã được viết sẵn làm mẫu, thể hiện ba mức kiểm tra bắt buộc
 * của một ca kiểm thử API:
 *   (a) mã trạng thái HTTP;
 *   (b) cấu trúc thân phản hồi;
 *   (c) giá trị nghiệp vụ bên trong thân phản hồi.
 *
 * Các ca xác thực và phân quyền.
 * Không mở trình duyệt trong file này — chỉ dùng fixture `request`.
 */
const { test, expect } = require('@playwright/test');
const { datLaiDuLieu } = require('../helpers/dat-lai-du-lieu');

const TK_THUONG = { email: 'sv@ntu.edu.vn', password: 'Matkhau123' };
const TK_VIP = { email: 'vip@ntu.edu.vn', password: 'Matkhau123' };

async function layToken(request, tk) {
  const res = await request.post('/api/login', { data: tk });
  return (await res.json()).token;
}

// Đặt lại dữ liệu trước mỗi ca. Thiếu dòng này, một ca làm khóa tài khoản
// sẽ khiến các ca sau chạy sai và kết quả phụ thuộc thứ tự chạy.
test.beforeEach(async ({ request }) => {
  await datLaiDuLieu(request);
});

// ---------------------------------------------------------------
// CA MẪU 1 — kiểm đủ ba mức: trạng thái, cấu trúc, giá trị nghiệp vụ
// ---------------------------------------------------------------
test('POST /api/login đúng thông tin trả về 200 kèm token', async ({ request }) => {
  const res = await request.post('/api/login', { data: TK_THUONG });

  expect(res.status()).toBe(200);
  const data = await res.json();
  expect(data.ok).toBe(true);
  expect(typeof data.token).toBe('string');
  expect(data.token.length).toBeGreaterThan(0);
  expect(data.user).toMatchObject({ email: TK_THUONG.email, type: 'THUONG' });
});

// ---------------------------------------------------------------
// CA MẪU 2 — ca âm: kiểm cả mã trạng thái và thông báo lỗi
// ---------------------------------------------------------------
test('POST /api/login sai mật khẩu trả về 401', async ({ request }) => {
  const res = await request.post('/api/login', {
    data: { email: TK_THUONG.email, password: 'SaiMatKhau' },
  });

  expect(res.status()).toBe(401);
  expect((await res.json()).message).toBe('Sai email hoặc mật khẩu');
});

// ---------------------------------------------------------------
// CA MẪU 3 — yêu cầu không kèm token
// ---------------------------------------------------------------
test('GET /api/cart không kèm token trả về 401', async ({ request }) => {
  const res = await request.get('/api/cart');

  expect(res.status()).toBe(401);
  expect((await res.json()).message).toBe('Bạn cần đăng nhập');
});

test('FR-02.3 khóa sau ba lần sai', async ({ request }) => {
  for (let i = 1; i <= 3; i++) {
    const res = await request.post('/api/login', { data: { email: TK_THUONG.email, password: `sai${i}` } });
    expect(res.status()).toBe(i === 3 ? 423 : 401);
    expect((await res.json()).message).toContain(i === 3 ? 'Tài khoản đã bị khóa' : 'Sai email hoặc mật khẩu');
  }
});
test('FR-02.4 mật khẩu đúng sau khi khóa vẫn bị từ chối', async ({ request }) => {
  for (let i = 1; i <= 3; i++) await request.post('/api/login', { data: { email: TK_THUONG.email, password: `sai${i}` } });
  const res = await request.post('/api/login', { data: TK_THUONG });
  expect(res.status()).toBe(423);
  expect((await res.json()).message).toContain('Tài khoản đã bị khóa');
});
test('token không tồn tại trả về 401', async ({ request }) => {
  const res = await request.get('/api/cart', { headers: { Authorization: 'Bearer khong-ton-tai' } });
  expect(res.status()).toBe(401);
  expect((await res.json()).message).toBe('Bạn cần đăng nhập');
});
test('FR-05.5 không cho tài khoản khác hủy đơn và không thay đổi trạng thái', async ({ request }) => {
  const thuong = await layToken(request, TK_THUONG);
  const vip = await layToken(request, TK_VIP);
  const headers = (t) => ({ Authorization: `Bearer ${t}` });
  const added = await request.post('/api/cart', { headers: headers(thuong), data: { productId: 4, qty: 1 } });
  expect(added.status()).toBe(200);
  const created = await request.post('/api/orders', { headers: headers(thuong), data: { zone: 'noi-thanh' } });
  expect(created.status()).toBe(201);
  const order = await created.json();
  expect(typeof order.id).toBe('number');
  const deleted = await request.delete(`/api/orders/${order.id}`, { headers: headers(vip) });
  expect.soft(deleted.status()).toBe(404);
  const list = await request.get('/api/orders', { headers: headers(thuong) });
  expect(list.status()).toBe(200);
  const orders = await list.json();
  expect(Array.isArray(orders)).toBe(true);
  expect(orders.find((o) => o.id === order.id)).toMatchObject({ status: 'CHO_XAC_NHAN', email: TK_THUONG.email });
});
