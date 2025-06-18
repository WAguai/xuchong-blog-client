"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Link href="/" className="flex items-center">
          <span className="font-bold">个人博客</span>
        </Link>
        <nav className="mt-8 flex flex-col gap-4">
          <Link href="/" className="text-foreground/70 transition-colors hover:text-foreground">
            首页
          </Link>
          <Link href="/projects" className="text-foreground/70 transition-colors hover:text-foreground">
            项目
          </Link>
          <Link href="/photos" className="text-foreground/70 transition-colors hover:text-foreground">
            照片
          </Link>
          <Link href="/moments" className="text-foreground/70 transition-colors hover:text-foreground">
            说说
          </Link>
          <Link href="/guestbook" className="text-foreground/70 transition-colors hover:text-foreground">
            留言板
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
