"use client"
import { useEffect,useState,use } from "react"
import { MomentDetail } from "@/components/moments/moment-detail"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import HttpService from "@/lib/axios-utils"
import { MOMENT_GET_MOMENT_DETAILS } from "@/constant/request-url"

// 模拟说说详情数据
const momentsData = {
  1: {
    id: 1,
    content: "今天天气真好，出去拍了一些照片。生活中总有那么多美好的瞬间值得记录。",
    images: [
      "/placeholder.svg?height=600&width=800&text=说说图片1",
      "/placeholder.svg?height=600&width=800&text=说说图片2",
    ],
    timestamp: "2024-01-15 14:30",
    likes: 12,
    comments: [
      {
        id: 1,
        author: "张三",
        content: "照片拍得真好！",
        timestamp: "2024-01-15 15:20",
      },
      {
        id: 2,
        author: "李四",
        content: "确实是个好天气，我也想出去走走。",
        timestamp: "2024-01-15 16:10",
      },
      {
        id: 3,
        author: "王五",
        content: "生活需要这样的仪式感。",
        timestamp: "2024-01-15 17:05",
      },
    ],
  },
  2: {
    id: 2,
    content: "刚完成了一个新项目，感觉很有成就感！技术栈用的是Next.js + TypeScript，开发体验真的很棒。",
    images: [],
    timestamp: "2024-01-14 09:15",
    likes: 8,
    comments: [
      {
        id: 1,
        author: "赵六",
        content: "恭喜！Next.js确实是个很棒的框架。",
        timestamp: "2024-01-14 10:30",
      },
      {
        id: 2,
        author: "钱七",
        content: "能分享一下项目的技术细节吗？",
        timestamp: "2024-01-14 11:15",
      },
    ],
  },
}

export default function MomentDetailPage({ params }: { params: Promise<{ id: string }>  }) {
  const [moment, setMoment] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // 使用React.use()解包params
  const { id } = use(params)

  useEffect(() => {
      const fetchMoment = async () => {
        try {
          const momentId = Number.parseInt(id) // 在useEffect内部获取params.id
          const response = await HttpService.get(`${MOMENT_GET_MOMENT_DETAILS}/${momentId}`, {})
          setMoment(response.data)
        } catch (error) {
          console.error('Failed to fetch moment:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchMoment()
    }, [id]) // 依赖项改为params.id

  if (isLoading) {
    return <div className="container py-12 md:py-16 lg:py-24 text-center">加载中...</div>
  }

  if (!moment) {
    return (
      <div className="container py-12 md:py-16 lg:py-24 text-center">
        <h1 className="text-3xl font-bold">说说未找到</h1>
        <p className="mt-4 text-muted-foreground">抱歉，您请求的说说不存在。</p>
        <Link href="/moments">
          <button className="mt-6 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回说说列表
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <Link href="/moments" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回说说列表
      </Link>
      <MomentDetail moment={moment} />
    </div>
  )
}
