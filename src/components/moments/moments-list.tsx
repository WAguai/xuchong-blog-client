"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share, MoreHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pagination } from "@/components/commen/pagination"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react";
import { AdminContext } from "@/app/layout";

// 模拟说说数据 (扩展到更多数据用于分页测试)
const allMoments = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  content: `这是第 ${i + 1} 条说说。${i % 3 === 0 ? "今天天气真好，出去拍了一些照片。生活中总有那么多美好的瞬间值得记录。" : i % 3 === 1 ? "刚完成了一个新项目，感觉很有成就感！技术栈用的是Next.js + TypeScript，开发体验真的很棒。" : "周末去了一趟郊外，空气清新，心情也跟着好了起来。"}`,
  images:
    i % 4 === 0
      ? [
          `/placeholder.svg?height=300&width=400&text=说说图片${i + 1}-1`,
          `/placeholder.svg?height=300&width=400&text=说说图片${i + 1}-2`,
        ]
      : i % 4 === 1
        ? [`/placeholder.svg?height=300&width=400&text=说说图片${i + 1}`]
        : [],
  timestamp: `2024-01-${String(Math.max(1, 30 - i)).padStart(2, "0")} ${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
  likes: Math.floor(Math.random() * 20) + 1,
  comments: Math.floor(Math.random() * 10) + 1,
}))

const ITEMS_PER_PAGE = 10


export function MomentsList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [moments, setMoments] = useState(allMoments)
  const isAdmin = useContext(AdminContext);

  const totalPages = Math.ceil(moments.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentMoments = moments.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleDeleteMoment = (momentId: number) => {
    setMoments(moments.filter((moment) => moment.id !== momentId))
    // 如果删除后当前页没有数据，回到上一页
    const newTotalPages = Math.ceil((moments.length - 1) / ITEMS_PER_PAGE)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }
  }

  return (
    <div className="space-y-6">
      {currentMoments.map((moment) => (
        <Card key={moment.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>小明</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">小明</div>
                  <div className="text-xs text-muted-foreground">{moment.timestamp}</div>
                </div>
              </div>
              {isAdmin && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除说说
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除</AlertDialogTitle>
                          <AlertDialogDescription>
                            此操作无法撤销。这将永久删除这条说说及其所有评论。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteMoment(moment.id)}>删除</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Link href={`/moments/${moment.id}`} className="block">
              <p className="mb-4 leading-relaxed hover:text-primary transition-colors cursor-pointer">
                {moment.content}
              </p>
            </Link>

            {moment.images.length > 0 && (
              <Link href={`/moments/${moment.id}`} className="block">
                <div
                  className={`grid gap-2 mb-4 ${
                    moment.images.length === 1
                      ? "grid-cols-1"
                      : moment.images.length === 2
                        ? "grid-cols-2"
                        : "grid-cols-3"
                  }`}
                >
                  {moment.images.map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg">
                      <Image
                        src={image || "/placeholder.svg"}
                        width={400}
                        height={300}
                        alt={`说说图片 ${index + 1}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </Link>
            )}

            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-6">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Heart className="h-4 w-4" />
                  {moment.likes}
                </Button>
                <Link href={`/moments/${moment.id}`}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {moment.comments}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share className="h-4 w-4" />
                  分享
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* 分页组件 */}
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
    </div>
  )
}
