// lib/api/authApi.ts
import toast from "react-hot-toast";
import { endpoints } from "./endpoint";
import { RegisterType } from "@/types/register";

const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
  token?: string,
  parseError?: (data: any) => string
): Promise<T> => {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    let message = "";

    // Nếu có custom parseError thì dùng
    if (parseError) {
      message = parseError(data);
    } else {
      // Mặc định: fallback nếu không truyền parseError
      message = data?.message || res.statusText || "Có lỗi xảy ra!";
    }

    throw new Error(message);
  }

  return data;
};
  

export const loginApi = async (payload: { email: string; password: string }) => {
  return fetcher(endpoints.auth.login, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const registerApi = async (payload: RegisterType) => {
  const res = await fetch(endpoints.auth.register, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    // Register API trả về detail là object
    let message = "";

    if (data?.detail && typeof data.detail === "object") {
      for (const field in data.detail) {
        const errors = data.detail[field];
        message += `${field}: ${Array.isArray(errors) ? errors.join(", ") : errors}\n`;
      }
    } else {
      message = data?.message || res.statusText || "Đăng ký thất bại!";
    }

    toast.error(data?.detail);
    throw new Error(message);
  }

  return data;
};


export const guestApi = async(user_agent : string) =>{
  return fetcher(endpoints.auth.guest, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_agent })
  });
}


