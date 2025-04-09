import * as z from "zod";

// Kiểm tra họ và tên: min 1, max 20 ký tự
const ho_va_ten = z
  .string()
  .min(1, { message: "Họ và tên không được để trống" })
  .max(20, { message: "Họ và tên không được quá 20 ký tự" });

// Kiểm tra số điện thoại: đúng 10 số
// const sdt = z
//   .string()
  // .regex(/^\d{10}$/, { message: "Số điện thoại phải có đúng 10 chữ số" });

// Facebook có hoặc không có (optional)
// const facebook = z
//   .string()
  // .optional(); // Nếu có thì nhận string, còn không thì không bắt buộc nhập

// Nơi ở bắt buộc nhập
// const noi_o = z
//   .string()
  // .min(1, { message: "Nơi ở không được để trống" });

// Tên trường bắt buộc nhập
// const ten_truong = z
//   .string()
  // .min(1, { message: "Tên trường không được để trống" });

// Email
const email = z
  .string()
  // .email({ message: "Email không hợp lệ" });

// Mật khẩu
const password = z
  .string()
  .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
  

// Schema đăng ký
export const SignUpSchema = z.object({
  ho_va_ten: ho_va_ten,
  // sdt: sdt,
  // facebook: facebook,
  // noi_o: noi_o,
  // ten_truong: ten_truong,
  email: email,
  password: password,
});
