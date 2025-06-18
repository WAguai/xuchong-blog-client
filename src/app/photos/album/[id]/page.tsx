"use client"
import { useState,useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// 模拟相册数据
const albumsData = {
  1: {
    title: "城市印象",
    description: "记录城市中的美好瞬间",
    photos: [
      { id: 1, src: "/placeholder.svg?height=800&width=1200&text=城市照片1", title: "城市夜景" },
      { id: 2, src: "/placeholder.svg?height=800&width=1200&text=城市照片2", title: "街道风光" },
      { id: 3, src: "/placeholder.svg?height=800&width=1200&text=城市照片3", title: "建筑群" },
      { id: 4, src: "/placeholder.svg?height=800&width=1200&text=城市照片4", title: "天际线" },
      { id: 5, src: "/placeholder.svg?height=800&width=1200&text=城市照片5", title: "城市公园" },
      { id: 6, src: "/placeholder.svg?height=800&width=1200&text=城市照片6", title: "商业区" },
    ],
  },
  2: {
    title: "自然风光",
    description: "大自然的壮丽景色",
    photos: [
      { id: 1, src: "/placeholder.svg?height=800&width=1200&text=自然照片1", title: "山脉日出" },
      { id: 2, src: "/placeholder.svg?height=800&width=1200&text=自然照片2", title: "湖泊倒影" },
      { id: 3, src: "/placeholder.svg?height=800&width=1200&text=自然照片3", title: "森林小径" },
      { id: 4, src: "/placeholder.svg?height=800&width=1200&text=自然照片4", title: "瀑布景观" },
    ],
  },
}
interface PhotoType {
  id: number;
  src: string;
  title: string;
}
interface AlbumType {
  title: string;
  description: string;
  photos: PhotoType[];
}

type paramsType = Promise<{ id: string }>;
export default function AlbumPage(props:{ params: paramsType }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [album, setAlbum] = useState<AlbumType | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchAlbum = async () => {
      const { id } = await props.params
      const albumId = Number.parseInt(id)
      const selectedAlbum = albumsData[albumId as keyof typeof albumsData]
      setAlbum(selectedAlbum)
      setLoading(false)
    }
        fetchAlbum()
  }, [])

  if (!album) {
    return (
      <div className="container py-12 md:py-16 lg:py-24 text-center">
        <h1 className="text-3xl font-bold">相册未找到</h1>
        <p className="mt-4 text-muted-foreground">抱歉，您请求的相册不存在。</p>
        <Link href="/photos">
          <Button className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回相册列表
          </Button>
        </Link>
      </div>
    )
  }

  const openViewer = (index: number) => {
    setCurrentPhotoIndex(index)
    setIsViewerOpen(true)
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % album.photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + album.photos.length) % album.photos.length)
  }

  const getMorePhotos = () => {
    const startIndex = (currentPhotoIndex + 1) % album.photos.length
    const morePhotos = []
    for (let i = 0; i < Math.min(4, album.photos.length - 1); i++) {
      const index = (startIndex + i) % album.photos.length
      morePhotos.push(album.photos[index])
    }
    return morePhotos
  }

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <Link href="/photos" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回相册列表
      </Link>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">{album.title}</h1>
          <p className="text-muted-foreground text-lg">{album.description}</p>
        </div>

        {/* 主要照片展示 */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative group cursor-pointer" onClick={() => openViewer(currentPhotoIndex)}>
                  <Image
                    src={album.photos[currentPhotoIndex].src || "/placeholder.svg"}
                    width={1200}
                    height={800}
                    alt={album.photos[currentPhotoIndex].title}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{album.photos[currentPhotoIndex].title}</h3>
                    <p className="text-sm opacity-90">
                      {currentPhotoIndex + 1} / {album.photos.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 导航按钮 */}
            <div className="flex justify-center gap-4 mt-4">
              <Button variant="outline" onClick={prevPhoto} disabled={album.photos.length <= 1}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                上一张
              </Button>
              <Button variant="outline" onClick={nextPhoto} disabled={album.photos.length <= 1}>
                下一张
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* 更多照片 */}
          <div>
            <h3 className="text-xl font-bold mb-4">更多照片</h3>
            <div className="grid grid-cols-2 gap-4">
              {getMorePhotos().map((photo, index) => (
                <Card key={photo.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      width={300}
                      height={200}
                      alt={photo.title}
                      className="w-full h-[120px] object-cover hover:scale-105 transition-transform"
                      onClick={() => openViewer((currentPhotoIndex + 1 + index) % album.photos.length)}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* 所有照片缩略图 */}
        <div>
          <h3 className="text-xl font-bold mb-4">所有照片</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {album.photos.map((photo, index) => (
              <Card
                key={photo.id}
                className={`overflow-hidden cursor-pointer hover:shadow-lg transition-all ${
                  index === currentPhotoIndex ? "ring-2 ring-primary" : ""
                }`}
              >
                <CardContent className="p-0">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    width={200}
                    height={150}
                    alt={photo.title}
                    className="w-full h-[100px] object-cover hover:scale-105 transition-transform"
                    onClick={() => setCurrentPhotoIndex(index)}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* 照片查看器 */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <div className="relative">
            <Image
              src={album.photos[currentPhotoIndex].src || "/placeholder.svg"}
              width={1200}
              height={800}
              alt={album.photos[currentPhotoIndex].title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setIsViewerOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={prevPhoto}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={nextPhoto}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
              <h3 className="text-lg font-bold">{album.photos[currentPhotoIndex].title}</h3>
              <p className="text-sm opacity-90">
                {currentPhotoIndex + 1} / {album.photos.length}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
