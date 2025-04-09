import * as z from "zod";

// Kiểm tra định dạng email
const email = z
    .string()
    // .email({ message: "Email không hợp lệ" });

// Kiểm tra mật khẩu theo yêu cầu
const password = z
    .string()
   

export const SignInSchema = z.object({
    email: email,
    password: password,
});
