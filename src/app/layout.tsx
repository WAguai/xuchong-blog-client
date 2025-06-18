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
// 创建一个上下文
export const AdminContext = createContext(false);

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
  useEffect(() => {
      console.log("获取管理员状态",getToken());
      if (!getToken()) {
        setIsAdmin(false);
        return;
      }
  
      HttpService.get(USER_GETISADMIN)
        .then((response) => {
          const userIsAdmin = response.data;
          setIsAdmin(userIsAdmin);
        })
    }, [getToken()]); // 当 token 改变时重新执行

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
        </ThemeProvider>
      </body>
    </html>
  )
}
