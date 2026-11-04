/*
 * BUỔI 3 - PHẦN 4: Kiểm thử với mock
 *
 * Nghiệp vụ khóa tài khoản (FR-02.2 đến FR-02.4) đọc dữ liệu người dùng từ
 * src/data/store.js. Nếu dùng dữ liệu thật, các ca kiểm thử sẽ ảnh hưởng lẫn nhau:
 * ca này khóa tài khoản thì ca sau chạy sai. Vì vậy ta mock mô-đun kho dữ liệu.
 */
const store = require('../../src/data/store');
const { login, MAX_FAILED_ATTEMPTS } = require('../../src/services/auth');

jest.mock('../../src/data/store');

function taoNguoiDung(ghiDe = {}) {
  return {
    email: 'sv@ntu.edu.vn',
    password: 'Matkhau123',
    fullName: 'Nguyen Van Sinh Vien',
    type: 'THUONG',
    failedAttempts: 0,
    locked: false,
    ...ghiDe,
  };
}

describe('login - nghiệp vụ khóa tài khoản', () => {
  let nguoiDung;

  beforeEach(() => {
    jest.resetAllMocks();
    nguoiDung = taoNguoiDung();
    store.findUser.mockImplementation((email) => (email === nguoiDung.email ? nguoiDung : undefined));
  });

  // Ví dụ mẫu đã viết sẵn.
  test('đăng nhập đúng thì thành công', () => {
    const kq = login('sv@ntu.edu.vn', 'Matkhau123');
    expect(kq.ok).toBe(true);
    expect(kq.user.email).toBe('sv@ntu.edu.vn');
  });

  // 1. Ca kiểm thử: Email không tồn tại trong hệ thống
  test('đăng nhập thất bại khi email không tồn tại trong hệ thống', () => {
    const kq = login('khongtontai@ntu.edu.vn', 'Matkhau123');
    expect(kq.ok).toBe(false);
    expect(kq.message).toBeDefined();
  });

  // 2. Ca kiểm thử: Sai mật khẩu dưới ngưỡng (< MAX_FAILED_ATTEMPTS), tài khoản chưa bị khóa (S1 -> S2)
  test('sai mật khẩu dưới ngưỡng (< MAX_FAILED_ATTEMPTS), tài khoản chưa bị khóa', () => {
    const kq = login('sv@ntu.edu.vn', 'SaiMatKhau');
    expect(kq.ok).toBe(false);
    expect(nguoiDung.failedAttempts).toBe(1);
    expect(nguoiDung.locked).toBe(false);
  });

  // 3. Ca kiểm thử: Sai mật khẩu liên tục đủ MAX_FAILED_ATTEMPTS lần, tài khoản bị khóa (S2 -> S3)
  test('sai mật khẩu liên tục đủ MAX_FAILED_ATTEMPTS lần, tài khoản chuyển sang trạng thái bị khóa', () => {
    nguoiDung.failedAttempts = 2; // Giả lập đang ở trạng thái cảnh báo (đếm = 2)
    const kq = login('sv@ntu.edu.vn', 'SaiMatKhau');
    
    expect(kq.ok).toBe(false);
    expect(nguoiDung.failedAttempts).toBe(3);
    expect(nguoiDung.locked).toBe(true);
  });

  // 4. Ca kiểm thử: Đăng nhập đúng sau vài lần sai, bộ đếm lỗi phải được reset về 0 (FR-02.3) (S2 -> S1)
  test('đăng nhập đúng sau vài lần sai, bộ đếm lỗi phải được reset về 0 (FR-02.3)', () => {
    nguoiDung.failedAttempts = 2; // Đang sai 2 lần
    const kq = login('sv@ntu.edu.vn', 'Matkhau123');
    
    expect(kq.ok).toBe(true);
    expect(nguoiDung.failedAttempts).toBe(0);
    expect(nguoiDung.locked).toBe(false);
  });

  // 5. Ca kiểm thử: Tài khoản đã bị khóa, nhập đúng mật khẩu vẫn bị từ chối kèm thông báo khóa (FR-02.4) (S3 -> S3)
  test('tài khoản đã bị khóa, nhập đúng mật khẩu vẫn bị từ chối kèm thông báo khóa (FR-02.4)', () => {
    nguoiDung.locked = true;
    nguoiDung.failedAttempts = 3;
    
    const kq = login('sv@ntu.edu.vn', 'Matkhau123');
    
    expect(kq.ok).toBe(false);
    expect(nguoiDung.locked).toBe(true);
    expect(kq.message).toMatch(/khóa/i);
  });
});