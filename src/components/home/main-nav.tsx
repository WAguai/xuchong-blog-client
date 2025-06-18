import Link from "next/link"
import { ModeToggle } from "@/components/home/mode-toggle"
import { MobileNav } from "@/components/home/mobile-nav"
import '@/app/globals.css'

export function MainNav() {
  return (
    <>
      <div className="mr-4 hidden md:flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">个人博客</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
            首页
          </Link>
          <Link href="/projects" className="transition-colors hover:text-foreground/80 text-foreground/60">
            项目
          </Link>
          <Link href="/photos" className="transition-colors hover:text-foreground/80 text-foreground/60">
            照片
          </Link>
          <Link href="/moments" className="transition-colors hover:text-foreground/80 text-foreground/60">
            说说
          </Link>
          <Link href="/guestbook" className="transition-colors hover:text-foreground/80 text-foreground/60">
            留言板
          </Link>
        </nav>
      </div>
      <MobileNav />
      <div className="flex flex-1 items-center justify-end space-x-2">
        <ModeToggle />
      </div>
    </>
  )
}
