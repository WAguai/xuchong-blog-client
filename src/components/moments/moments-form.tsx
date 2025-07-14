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
import HttpService  from "@/lib/axios-utils"
import { ADMIN_MOMENT_ADD_MOMENT } from "@/constant/request-url"
export function MomentsForm() {
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // 模拟图片上传，实际应用中需要上传到服务器
      const newImages = Array.from(files).map(
        (file, index) => `/placeholder.svg?height=200&width=200&text=图片${images.length + index + 1}`,
      )
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        const response = await HttpService.post(ADMIN_MOMENT_ADD_MOMENT, {
          content,
          images,
        });

        if (response.status === 200) {
          router.push("/moments");
        }
      } catch (error) {
        console.error("发布说说失败:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-3">
        <Label htmlFor="content">说说内容</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="分享你此刻的想法..."
          className="min-h-[120px] resize-none"
          required
        />
      </div>

      <div className="grid gap-3">
        <Label>添加图片</Label>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <Label
            htmlFor="image-upload"
            className="flex items-center gap-2 px-4 py-2 border border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <Upload className="h-4 w-4" />
            选择图片
          </Label>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`上传图片 ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => removeImage(index)}
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "发布中..." : "发布说说"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          取消
        </Button>
      </div>
    </form>
  )
}
