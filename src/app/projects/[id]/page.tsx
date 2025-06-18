import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// 模拟项目详情数据
const projects = [
  {
    id: 1,
    title: "个人博客网站",
    description: "使用 Next.js 和 Tailwind CSS 构建的个人博客网站，包含多个页面和功能。",
    fullDescription:
      "这是一个使用 Next.js 和 Tailwind CSS 构建的完整个人博客网站。该项目包括主页、项目展示、照片日志和留言板等功能。采用了现代的响应式设计，确保在各种设备上都能提供良好的用户体验。\n\n该项目使用了 App Router 进行路由管理，使用 shadcn/ui 组件库来构建界面元素，并实现了深色模式切换功能。",
    image: "/placeholder.svg?height=500&width=800&text=项目 1",
    tags: ["Next.js", "React", "Tailwind CSS"],
    features: ["响应式设计，适配各种设备", "深色模式支持", "项目展示功能", "照片日志展示", "访客留言板"],
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "shadcn/ui"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/example/personal-blog",
  },
  {
    id: 2,
    title: "电子商务平台",
    description: "一个完整的电子商务解决方案，包括产品展示、购物车和支付功能。",
    fullDescription:
      "这是一个功能齐全的电子商务平台，提供产品展示、购物车、用户账户和支付处理等功能。该项目使用 React 构建前端界面，Node.js 和 Express 提供后端 API，MongoDB 作为数据库。\n\n该平台支持产品分类、搜索、筛选、用户评论和评分等功能，并集成了第三方支付处理服务。",
    image: "/placeholder.svg?height=500&width=800&text=项目 2",
    tags: ["React", "Node.js", "MongoDB"],
    features: ["产品展示和分类", "购物车功能", "用户账户和认证", "支付处理", "订单管理"],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "JWT 认证"],
    demoUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/example/ecommerce",
  },
  {
    id: 3,
    title: "天气应用",
    description: "一个简洁的天气应用，可以查看全球各地的天气预报。",
    fullDescription:
      "这是一个简洁而功能强大的天气应用，允许用户查看全球各地的实时天气和未来预报。该应用使用 React 构建，并集成了第三方天气 API 来获取准确的天气数据。\n\n用户可以搜索城市，查看当前天气状况、温度、湿度、风速等信息，以及未来几天的天气预报。应用还支持保存常用位置和自动检测用户当前位置。",
    image: "/placeholder.svg?height=500&width=800&text=项目 3",
    tags: ["React", "API", "CSS"],
    features: ["全球城市天气搜索", "实时天气数据", "未来天气预报", "保存常用位置", "自动检测当前位置"],
    technologies: ["React", "OpenWeatherMap API", "Geolocation API", "CSS Modules", "LocalStorage"],
    demoUrl: "https://example.com/weather",
    githubUrl: "https://github.com/example/weather-app",
  },
  {
    id: 4,
    title: "任务管理工具",
    description: "一个帮助用户管理日常任务和提高生产力的应用。",
    fullDescription:
      "这是一个功能全面的任务管理应用，帮助用户组织和跟踪他们的日常任务。该应用使用 React 和 Redux 构建前端，Firebase 提供后端服务和实时数据同步。\n\n用户可以创建、编辑和删除任务，设置优先级和截止日期，将任务分类到不同的项目中，并接收提醒通知。应用还提供了任务完成统计和生产力分析功能。",
    image: "/placeholder.svg?height=500&width=800&text=项目 4",
    tags: ["React", "Redux", "Firebase"],
    features: ["任务创建和管理", "项目分类", "优先级和截止日期", "提醒通知", "生产力统计"],
    technologies: ["React", "Redux", "Firebase", "Firebase Authentication", "Cloud Firestore", "React DnD"],
    demoUrl: "https://example.com/tasks",
    githubUrl: "https://github.com/example/task-manager",
  },
]

export type paramsType = Promise<{ id: string }>;
export default async function ProjectPage(props:{ params: paramsType }) {
  const { id } = await props.params;
  const projectId = Number.parseInt(id)
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return (
      <div className="container py-12 md:py-16 lg:py-24 text-center">
        <h1 className="text-3xl font-bold">项目未找到</h1>
        <p className="mt-4 text-muted-foreground">抱歉，您请求的项目不存在。</p>
        <Link href="/projects">
          <Button className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回项目列表
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <Link href="/projects" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回项目列表
      </Link>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{project.title}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="bg-muted text-sm px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-8">
            <Image
              src={project.image || "/placeholder.svg"}
              width={800}
              height={500}
              alt={project.title}
              className="w-full rounded-lg object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            {project.fullDescription.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">主要功能</h2>
            <ul className="list-disc list-inside space-y-2">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">项目信息</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">技术栈</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="bg-muted text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">链接</h4>
                  <div className="space-y-2">
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full">
                        查看演示
                      </Button>
                    </Link>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full">
                        GitHub 仓库
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
