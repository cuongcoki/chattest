"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { useState } from "react"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignInSchema } from "@/schema/sign-in-schema"
import { Eye, EyeOff, House } from "lucide-react"
import { loginApi } from "@/api"
import toast from "react-hot-toast"
import { useAuthStore } from "@/store/authStore"
import { useChatStore } from "@/store/chatStore"

import bgs from "../../public/image/Back 2.jpg";
import bgs2 from "../../public/image/test.png";

import Image from "next/image"

interface User {
  sub: number;
  ho_va_ten: string;
  noi_o: string;
}

interface Login {
  user: User;
  access_token: string;
  token_type: string;
  session_id: number;
  session_title: string;
}


export function SignInForm({ className, ...props }: React.ComponentProps<"div">) {
  //state
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    setLoading(true);
    try {
      const res = await loginApi({
        email: data.email,
        password: data.password,
      });

      const login: Login = res as Login;

      useAuthStore.getState().setAccessToken(login.access_token);
      useAuthStore.getState().setUser(login.user);
      useChatStore.getState().setSessionId(login.session_id);
      localStorage.setItem('sessionId', login.session_id.toString())
      router.push("/chatbot");
      toast.success("Đăng nhập thành công");

    } catch (error) {
      if (error instanceof Error) {
        console.log("Lỗi đăng nhập! Hãy kiểm tra lại thông tin.", error.message);
        toast.error("Lỗi đăng nhập hãy kiểm tra lại thông tin")
      } else {
        console.log("Lỗi không xác định!", error);
      }
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className={cn("relative flex flex-col gap-6 min-h-screen", className)} {...props}>
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgs}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>


      {/* Content with relative positioning to appear above background */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8">
        <Image
          src={bgs2}
          alt="Background"
          className="w-[1000px] h-[230px]"
        />
        <Card className="overflow-hidden max-w-md w-full bg-white/90 backdrop-blur-sm">

          <CardContent className="grid p-0">

            <Form {...form}>
              <div className="flex flex-col items-center text-center p-6 pb-0 relative">
                <Link href="/"><House className="p-1 absolute left-5 top-0 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out" /></Link>
                <h1 className="text-2xl font-bold">CHÀO MỪNG ĐẾN VỚI</h1>
                <p className="text-balance text-muted-foreground">HỆ THỐNG HỖ TRỢ HỌC TẬP</p>
              </div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-md w-full flex flex-col gap-4 p-6 md:p-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-secondary-backgroudPrimary">
                        TÀI KHOẢN
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-secondary-backgroudPrimary">
                        MẬT KHẨU
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={passwordVisible ? "text" : "password"}
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute bottom-0 right-0 h-full px-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          {passwordVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormLabel className="flex items-center text-secondary-backgroudPrimary"></FormLabel>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md px-6 py-2 shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                  // className="w-full bg-secondary-backgroudPrimary text-primary-backgroudPrimary hover:bg-yellow-300"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý" : "ĐĂNG NHẬP"}
                </Button>

                <div className="text-center text-sm">
                  Bạn đã có tài khoản? {" "}
                  <a href="sign-up" className="underline underline-offset-4">
                    ĐĂNG KÝ
                  </a>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-white font-medium [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          © Copyright @GIRC
        </div>
      </div>
    </div>
  )
}

