import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// 模拟照片详情数据
const photos = [
  {
    id: 1,
    title: "城市风光",
    date: "2023-05-15",
    location: "上海",
    camera: "Sony A7 III",
    lens: "24-70mm f/2.8",
    settings: "f/8, 1/250s, ISO 100",
    image: "/placeholder.svg?height=800&width=1200&text=照片 1",
    description:
      "城市天际线的日落景色。这张照片捕捉了城市在黄昏时分的美丽景色，高楼大厦在夕阳的映照下呈现出金色的轮廓。天空中的云彩呈现出丰富的色彩变化，从橙红色过渡到深蓝色。",
    story:
      "这张照片是我在一个特别的日子拍摄的。那天天气格外晴朗，我决定去城市的高处等待日落。等待的过程中，我看到云层逐渐变化，光线也随之改变，最终呈现出这幅令人惊叹的景象。",
  },
  {
    id: 2,
    title: "自然风景",
    date: "2023-06-22",
    location: "云南",
    camera: "Canon EOS R5",
    lens: "16-35mm f/4L",
    settings: "f/11, 1/125s, ISO 200",
    image: "/placeholder.svg?height=800&width=1200&text=照片 2",
    description:
      "山脉和湖泊的壮丽景色。这张照片展示了宁静的湖面映照着远处的山脉，天空中的云彩为整个场景增添了层次感。湖水清澈见底，远处的山峰在阳光下呈现出不同的色调。",
    story:
      "这是我在一次徒步旅行中拍摄的。经过几个小时的艰难攀爬，当我到达这个观景点时，眼前的景色让所有的疲惫都值得了。我花了一些时间寻找最佳的构图，希望能够完整地捕捉这片美景。",
  },
]


export type paramsType = Promise<{ id: string }>;
export default async function PhotoPage(props:{ params: paramsType }) {
  const { id } = await props.params;
  const photoId = Number.parseInt(id)
  const photo = photos.find((p) => p.id === photoId)

  if (!photo) {
    return (
      <div className="container py-12 md:py-16 lg:py-24 text-center">
        <h1 className="text-3xl font-bold">照片未找到</h1>
        <p className="mt-4 text-muted-foreground">抱歉，您请求的照片不存在。</p>
        <Link href="/photos">
          <Button className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回照片列表
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <Link href="/photos" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回照片列表
      </Link>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">{photo.title}</h1>

          <div className="mb-8">
            <Image
              src={photo.image || "/placeholder.svg"}
              width={1200}
              height={800}
              alt={photo.title}
              className="w-full rounded-lg object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>描述</h2>
            <p>{photo.description}</p>

            <h2>故事</h2>
            <p>{photo.story}</p>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">照片信息</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <div className="text-muted-foreground">日期</div>
                  <div>{photo.date}</div>

                  <div className="text-muted-foreground">地点</div>
                  <div>{photo.location}</div>

                  <div className="text-muted-foreground">相机</div>
                  <div>{photo.camera}</div>

                  <div className="text-muted-foreground">镜头</div>
                  <div>{photo.lens}</div>

                  <div className="text-muted-foreground">设置</div>
                  <div>{photo.settings}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
