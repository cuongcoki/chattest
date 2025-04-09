import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import { Toaster } from 'react-hot-toast';
export const metadata: Metadata = {
  title: "Ôn Tập 2K7",
  description: "Ôn thi hiệu quả cùng Chatbot AI dành riêng cho học sinh 2K7! Hỏi nhanh – đáp gọn – luyện đề thông minh theo từng môn học. Đồng hành cùng bạn chinh phục kỳ thi tốt nghiệp dễ dàng hơn bao giờ hết.",
  openGraph: {
    title: "Ôn Tập 2K7",
    description: "Ôn thi hiệu quả cùng Chatbot AI dành riêng cho học sinh 2K7!",
    type: "website",
    url: "https://onthi2k7.girc.edu.vn", 
    images: [
      {
        url: "/ceoweb.png", 
        height: 630,
        alt: "Ôn Tập 2K7 - Ảnh chia sẻ Facebook",
      },
    ],
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background overscroll-none overflow-y-auto overflow-hidden no-scrollbar  font-sans antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : ""
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
            }}
          />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}