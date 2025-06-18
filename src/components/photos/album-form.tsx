"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { X, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export function AlbumForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // 模拟照片上传，实际应用中需要上传到服务器
      const newPhotos = Array.from(files).map(
        (file, index) => `/placeholder.svg?height=300&width=400&text=照片${photos.length + index + 1}`,
      )
      setPhotos([...photos, ...newPhotos])
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 模拟提交过程
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/photos")
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-3">
        <Label htmlFor="title">相册标题</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="输入相册标题"
          required
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="description">相册描述</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="描述这个相册的主题或内容..."
          className="min-h-[100px] resize-none"
        />
      </div>

      <div className="grid gap-3">
        <Label>添加照片</Label>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="photo-upload"
          />
          <Label
            htmlFor="photo-upload"
            className="flex items-center gap-2 px-4 py-2 border border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <Upload className="h-4 w-4" />
            选择照片
          </Label>
        </div>

        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`照片 ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting || !title.trim()}>
          {isSubmitting ? "创建中..." : "创建相册"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          取消
        </Button>
      </div>
    </form>
  )
}
