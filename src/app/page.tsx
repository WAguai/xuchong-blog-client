import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Mail, Twitter, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">你好，我是羽中羽中</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    欢迎来到羽中羽中的小站 。这里记录着我的项目、照片、说说和想法。
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/projects">
                    <Button className="w-full min-[400px]:w-auto">
                      查看我的项目
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/photos">
                    <Button variant="outline" className="w-full min-[400px]:w-auto">
                      浏览照片相册
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-4">
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">Github</span>
                    </Button>
                  </Link>
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </Link>
                  <Link href="mailto:example@example.com">
                    <Button variant="ghost" size="icon">
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/shuai2.jpg"
                  width={450}
                  height={550}
                  alt="Profile"
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">最新项目</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  这些是我最近完成的一些项目。查看更多请访问项目页面。
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {[1, 2].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src={`/placeholder.svg?height=300&width=500&text=项目 ${i}`}
                      width={500}
                      height={300}
                      alt={`项目 ${i}`}
                      className="w-full object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold">项目 {i}</h3>
                      <p className="text-muted-foreground">这是一个示例项目描述，展示了我的技能和经验。</p>
                      <Link href={`/projects/${i}`}>
                        <Button variant="link" className="p-0 h-auto mt-2">
                          了解更多
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/projects">
                <Button variant="outline">查看所有项目</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">照片相册</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  记录生活中的美好瞬间。
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Link href={`/photos/album/${i}`} key={i} className="overflow-hidden rounded-lg">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=相册 ${i}`}
                    width={400}
                    height={300}
                    alt={`相册 ${i}`}
                    className="w-full h-[200px] object-cover transition-transform hover:scale-105"
                  />
                </Link>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/photos">
                <Button variant="outline">查看所有相册</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 新增说说预览区域 */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">最新说说</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  分享生活中的点点滴滴。
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-2xl py-12">
              <Card>
                <CardContent className="p-6">
                  <p className="text-lg leading-relaxed mb-4">
                    今天天气真好，出去拍了一些照片。生活中总有那么多美好的瞬间值得记录。
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>2024-01-15 14:30</span>
                    <div className="flex items-center gap-4">
                      <span>❤️ 12</span>
                      <span>💬 3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center">
              <Link href="/moments">
                <Button variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  查看所有说说
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} 我的个人博客。保留所有权利。
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/projects" className="text-sm font-medium hover:underline underline-offset-4">
              项目
            </Link>
            <Link href="/photos" className="text-sm font-medium hover:underline underline-offset-4">
              照片
            </Link>
            <Link href="/moments" className="text-sm font-medium hover:underline underline-offset-4">
              说说
            </Link>
            <Link href="/guestbook" className="text-sm font-medium hover:underline underline-offset-4">
              留言板
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
