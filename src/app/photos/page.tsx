import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Camera } from "lucide-react"

export default function PhotosPage() {
  // 模拟相册数据
  const albums = [
    {
      id: 1,
      title: "城市印象",
      description: "记录城市中的美好瞬间",
      coverImage: "/placeholder.svg?height=400&width=600&text=城市印象",
      photoCount: 12,
      date: "2023-05-15",
    },
    {
      id: 2,
      title: "自然风光",
      description: "大自然的壮丽景色",
      coverImage: "/placeholder.svg?height=400&width=600&text=自然风光",
      photoCount: 8,
      date: "2023-06-22",
    },
    {
      id: 3,
      title: "建筑摄影",
      description: "现代建筑的几何美学",
      coverImage: "/placeholder.svg?height=400&width=600&text=建筑摄影",
      photoCount: 15,
      date: "2023-07-10",
    },
    {
      id: 4,
      title: "旅行记忆",
      description: "旅途中的难忘时光",
      coverImage: "/placeholder.svg?height=400&width=600&text=旅行记忆",
      photoCount: 20,
      date: "2023-08-05",
    },
    {
      id: 5,
      title: "美食摄影",
      description: "精美餐点的视觉盛宴",
      coverImage: "/placeholder.svg?height=400&width=600&text=美食摄影",
      photoCount: 6,
      date: "2023-09-18",
    },
    {
      id: 6,
      title: "人像摄影",
      description: "捕捉真实的情感瞬间",
      coverImage: "/placeholder.svg?height=400&width=600&text=人像摄影",
      photoCount: 10,
      date: "2023-10-30",
    },
  ]

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="flex flex-col items-start gap-4 md:gap-8">
        <div className="flex items-center justify-between w-full">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">照片相册</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              记录生活中的美好瞬间，分享我的摄影作品和旅行记忆。
            </p>
          </div>
          <Link href="/photos/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              创建相册
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {albums.map((album) => (
            <Link href={`/photos/album/${album.id}`} key={album.id}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={album.coverImage || "/placeholder.svg"}
                      width={600}
                      height={400}
                      alt={album.title}
                      className="w-full h-[240px] object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                      <Camera className="inline h-3 w-3 mr-1" />
                      {album.photoCount}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{album.title}</h3>
                    <p className="text-muted-foreground mb-2">{album.description}</p>
                    <p className="text-sm text-muted-foreground">{album.date}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
