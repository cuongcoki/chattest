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

import { Check, ChevronsUpDown, House } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"

import { SignUpSchema } from "@/schema/sign-up-schema"


import dataTinh from "../../fakeData/danh_sach_tinh.json";
import dataTHPT from "../../fakeData/THPT.json"
import { registerApi } from "@/api"

import bgs from "../../public/image/Back 2.jpg";
import Image from "next/image"
import Link from "next/link"

export function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {

  //state
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [open, setOpen] = useState(false)

  const [open1, setOpen1] = useState(false)

  const router = useRouter();

  const [selectedProvince, setSelectedProvince] = useState<string>("");

  const selectedProvinceData = dataTHPT.data.find(
    (province) => province.ma_tinh === selectedProvince
  );

  const filteredSchools = selectedProvinceData?.data?.data || [];

  // console.log(selectedProvince)
  // console.log(filteredSchools)

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      ho_va_ten: "",
      sdt: "",
      email: "",
      password: "",
      facebook: "",
      noi_o: "",
      ten_truong: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setLoading(true);
    try {
      const res = await registerApi({
        ho_va_ten: data.ho_va_ten,
        sdt: data.sdt,
        email: data.email,
        password: data.password,
        facebook: data.facebook,
        noi_o: data.noi_o,
        ten_truong: data.ten_truong
      });
      if (res) {
        toast.success('Đăng ký thành công!')

        router.push("/sign-in");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }


  };

  return (
    <div className={cn("relative flex flex-col gap-6 min-h-screen", className)}  {...props}>
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

        <Card className="overflow-hidden max-w-md w-full bg-white/95 backdrop-blur-sm">
          <CardContent className="grid p-0">

            <Form {...form}>
              <div className="flex flex-col items-center text-center pt-6 relative">
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
                  name="ho_va_ten"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-secondary-backgroudPrimary">
                        * HỌ VÀ TÊN
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
                  name="sdt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-secondary-backgroudPrimary">
                        * SỐ ĐIỆN THOẠI
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-secondary-backgroudPrimary">
                        * EMAIL
                      </FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
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
                        * MẬT KHẨU (8 KÝ TỰ BẤT KỲ)
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

                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-secondary-backgroudPrimary">
                        LINK FACEBOOK
                      </FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://facebook.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="noi_o"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-secondary-backgroudPrimary">
                        * CHỌN NƠI Ở
                      </FormLabel>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="justify-between h-10 w-full text-left"
                            >
                              {field.value
                                ? dataTinh.data.find((item) => item.text === field.value)?.text
                                : "Chọn nơi ở..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Tìm nơi ở..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>Không tìm thấy nơi ở.</CommandEmpty>
                                <CommandGroup>
                                  {dataTinh.data.map((item, index) => (
                                    <CommandItem
                                      key={item.IdTinh ?? index}
                                      value={item.text}
                                      onSelect={(currentValue) => {
                                        setSelectedProvince(item.id);
                                        form.setValue("noi_o", currentValue);
                                        setOpen(false);
                                      }}
                                    >
                                      {item.text}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          field.value === item.text ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="ten_truong"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-secondary-backgroudPrimary">
                        * CHỌN TRƯỜNG THPT
                      </FormLabel>
                      <FormControl>
                        <Popover open={open1} onOpenChange={setOpen1}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open1}
                              className="justify-between h-10 w-full text-left"
                            >
                              {field.value
                                ? field.value
                                : "Chọn trường THPT..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Tìm trường..." className="h-9" />
                              <CommandList className="max-h-60">
                                <CommandEmpty>Hãy chọn nơi ở trước.</CommandEmpty>
                                <CommandGroup>
                                  {filteredSchools.map((school, index) => (
                                    <CommandItem
                                      key={school.id ?? index}
                                      value={school.text}
                                      onSelect={(currentValue) => {
                                        form.setValue("ten_truong", currentValue);
                                        setOpen1(false);
                                      }}
                                    >
                                      {school.text}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          field.value === school.text ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  // className="w-full bg-secondary-backgroudPrimary text-primary-backgroudPrimary hover:bg-yellow-300 mt-2"
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md px-6 py-2 shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý" : "ĐĂNG KÝ"}
                </Button>

                <div className="text-center text-sm">
                  Bạn đã có tài khoản? {" "}
                  <a href="sign-in" className="underline underline-offset-4">
                    ĐĂNG NHẬP
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

