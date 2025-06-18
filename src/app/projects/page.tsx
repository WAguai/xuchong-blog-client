import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProjectsPage() {
  // 模拟项目数据
  const projects = [
    {
      id: 1,
      title: "个人博客网站",
      description: "使用 Next.js 和 Tailwind CSS 构建的个人博客网站，包含多个页面和功能。",
      image: "/placeholder.svg?height=300&width=500&text=项目 1",
      tags: ["Next.js", "React", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "电子商务平台",
      description: "一个完整的电子商务解决方案，包括产品展示、购物车和支付功能。",
      image: "/placeholder.svg?height=300&width=500&text=项目 2",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 3,
      title: "天气应用",
      description: "一个简洁的天气应用，可以查看全球各地的天气预报。",
      image: "/placeholder.svg?height=300&width=500&text=项目 3",
      tags: ["React", "API", "CSS"],
    },
    {
      id: 4,
      title: "任务管理工具",
      description: "一个帮助用户管理日常任务和提高生产力的应用。",
      image: "/placeholder.svg?height=300&width=500&text=项目 4",
      tags: ["React", "Redux", "Firebase"],
    },
  ]

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="flex flex-col items-start gap-4 md:gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">我的项目</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            这些是我过去几年完成的一些项目。每个项目都代表了我在不同领域的技能和经验。
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={project.image || "/placeholder.svg"}
                  width={500}
                  height={300}
                  alt={project.title}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground mt-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-muted text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="link" className="p-0 h-auto mt-4">
                      查看详情
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
