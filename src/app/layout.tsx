"use client"
import type React from "react"
import '@/app/globals.css'
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/home/main-nav"
import { createContext,useEffect,useState } from "react";
import { getToken } from "@/lib/token-utils";
import HttpService  from "@/lib/axios-utils";
import { USER_GETISADMIN } from "@/constant/request-url";
import { jwtDecode } from "jwt-decode"
import { DecodedToken } from "@/types/service-interface";
// 创建一个上下文
export const AdminContext = createContext(false);
export const UserContext = createContext<number | null>(null);

const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "羽中羽中",
//   description: "羽中羽中的个人博客网站，展示项目、照片和想法。",
// }

export default function RootLayout({
  children,
  }: {
    children: React.ReactNode
  }) {

  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
      console.log("获取管理员状态",getToken());
      const token = getToken();
      if (!token) {
        setIsAdmin(false);
        return;
      }

      HttpService.get(USER_GETISADMIN)
        .then((response) => {
          const userIsAdmin = response.data;
          setIsAdmin(userIsAdmin);
        });
      const decoded = jwtDecode<DecodedToken>(token);
      const userIdValue = typeof decoded?.userId === 'number' ? decoded.userId : null;
      setUserId(() => userIdValue); // 使用函数式更新避免类型错误
    }, [getToken()]); // 当 token 改变时重新执行

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <UserContext.Provider value={userId}>
          <AdminContext.Provider value={isAdmin}>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full border-b bg-background">
              <div className="container flex h-16 items-center">
                <MainNav />
              </div>
            </header>
            {children}
          </div>
          </AdminContext.Provider>
          </UserContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
