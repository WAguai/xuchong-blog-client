"use client"
import { useState,useEffect } from "react"
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
import { MomentListProps } from '@/types/components-interface';
import { MomentLike,Moment } from '@/types/service-interface';
import { formatDate } from '@/lib/utils';
import HttpService from "@/lib/axios-utils"
import { MOMENT_LIKE_OR_DISLIKE } from "@/constant/request-url"
import { getToken } from "@/lib/token-utils"
import {jwtDecode} from 'jwt-decode';
import { DecodedToken } from '@/types/service-interface';
import CustomToast from '@/components/commen/custom-toast'
import { on } from "events"

export function MomentsList( props:MomentListProps) {
  const {
    userId,
    moments,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    onCommentAdded,
    onCommentDeleted,
    onMomentLiked,
    onMomentDeleted
  } = props
  const isAdmin = useContext(AdminContext);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastData, setToastData] = useState({
      title: '',
      description: '',
      actionText: "确定",
      onActionClick: undefined,
      duration: 3000 // 默认持续时间为3秒
    });


  const handleDeleteMoment = (momentId: number) => {
    // setMoments(moments.filter((moment) => moment.id !== momentId))
    // // 如果删除后当前页没有数据，回到上一页
    // const newTotalPages = Math.ceil((moments.length - 1) / ITEMS_PER_PAGE)
    // if (currentPage > newTotalPages && newTotalPages > 0) {
    //   setCurrentPage(newTotalPages)
    // }
  }


  const handleLike = async (momentId: number) => {
    const token = getToken();
    if (!token) {
      setToastOpen(false);
      setToastData({ ...toastData, title: '系统提示', description: '请登录之后再点赞噢~' });
      setToastOpen(true);
      return;
    }
    const response = await HttpService.post(MOMENT_LIKE_OR_DISLIKE + "/" + momentId);
    if (response) {
      // 查找当前说说的点赞状态
      onMomentLiked?.(response.data,momentId)
    }
  }
  return (
    <div className="space-y-6">
      {moments.map((moment) => (
        <Card key={moment.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-medium">{moment.nickName}</div>
                  <div className="text-xs text-muted-foreground">{formatDate(moment.createTime)}</div>
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

            {moment.images?.length > 0 && (
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
                  {moment.images.map((image: string, index: number) => (
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
                <Button variant="ghost" size="sm" className={`gap-2 ${moment.likes.some(like => like.userId === userId) ? "text-red-500" : ""}`} onClick={() => handleLike(moment.id)}>
                  <Heart className={`h-4 w-4 ${moment.likes.some(like => like.userId === userId) ? "fill-current" : ""}`} />
                  {moment.likes == null ? 0 : moment.likes.length}
                </Button>
                <Link href={`/moments/${moment.id}`}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {moment.comments == null ? 0 : moment.comments.length}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <CustomToast
        title={toastData.title}
        description={toastData.description}
        actionText={toastData.actionText}
        onActionClick={toastData.onActionClick}
        duration={toastData.duration}
        open={toastOpen}
        setOpen={setToastOpen}
      />
      {/* 分页组件 */}
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
    </div>
  )
}
