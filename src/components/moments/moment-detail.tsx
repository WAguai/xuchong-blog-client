"use client"

import type React from "react"

import { useState,useContext, use, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
import Image from "next/image"
import { Moment, MomentComment } from "@/types/service-interface"
import { MomentDetailProps } from "@/types/components-interface"
import { AdminContext } from "@/app/layout";
import HttpService from "@/lib/axios-utils"
import { MOMENT_LIKE_OR_DISLIKE } from "@/constant/request-url"
import { getToken } from "@/lib/token-utils"
import {jwtDecode} from 'jwt-decode';
import { DecodedToken } from '@/types/service-interface';
import CustomToast from '@/components/commen/custom-toast'
import { formatDate } from "@/lib/utils"
export function MomentDetail({ moment }: MomentDetailProps) {

  
  const [comments, setComments] = useState(moment.comments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [likes, setLikes] = useState(moment.likes)
  const [isLiked, setIsLiked] = useState(false)
  const isAdmin =  useContext(AdminContext)
  const [toastData, setToastData] = useState({
      title: '',
      description: '',
      actionText: "确定",
      onActionClick: undefined,
      duration: 3000 // 默认持续时间为3秒
    });
  const [toastOpen, setToastOpen] = useState(false);


  useEffect(() => {
    const token = getToken();
    if (!token) {
      return; // 如果没有token，直接返回
    }
    const decoded = jwtDecode<DecodedToken>(token); // 直接获取Payload对象[3](@ref)
    const userId = decoded?.userId;
    setIsLiked(moment.likes.some(like => like.userId === userId));
  },[getToken()]);

  const handleLike = async () => {
    const token = getToken();
    if (!token) {
       setToastOpen(false);
      setToastData({...toastData, title: '系统提示', description: '请登录之后再点赞噢~'});
      setToastOpen(true);
      return;
    }
    const decoded = jwtDecode<DecodedToken>(token);
    const userId = decoded.userId;
    const response = await HttpService.post(MOMENT_LIKE_OR_DISLIKE+"/"+moment.id);
    if (response) {
      const newLike = response.data
      if (isLiked) {
        setLikes(likes.filter(like => like.userId !== userId))
        setIsLiked(false)
      } else {
        setLikes([...likes,newLike])
        setIsLiked(true)
      }
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)

    // 模拟提交评论
    //   const comment: Comment = {
    //     id: comments.length + 1,
    //     author: "当前用户",
    //     content: newComment,
    //     timestamp: new Date().toLocaleString("zh-CN"),
    //   }
    //   setComments([...comments, comment])
    //   setNewComment("")
    //   setIsSubmitting(false)
  }

  const handleDeleteComment = (commentId: number) => { 

    setComments(comments.filter((comment) => comment.id !== commentId))
    
  }

  const handleDeleteMoment = () => {
    // 模拟删除说说
    alert("说说已删除")
    window.history.back()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 说说主体 */}
      <Card>
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
                        <AlertDialogAction onClick={handleDeleteMoment}>删除</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="mb-4 leading-relaxed text-lg">{moment.content}</p>

          {moment?.images?.length > 0 && (
            <div
              className={`grid gap-2 mb-4 ${
                moment.images.length === 1 ? "grid-cols-1" : moment.images.length === 2 ? "grid-cols-2" : "grid-cols-3"
              }`}
            >
              {moment.images.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg">
                  <Image
                    src={image || "/placeholder.svg"}
                    width={600}
                    height={400}
                    alt={`说说图片 ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 ${isLiked ? "text-red-500" : ""}`}
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {likes?.length}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                {comments?.length}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 评论区 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">评论 ({comments?.length})</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 发表评论 */}
          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="写下你的评论..."
              className="min-h-[80px] resize-none"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
                {isSubmitting ? "发布中..." : "发布评论"}
              </Button>
            </div>
          </form>

          {/* 评论列表 */}
          <div className="space-y-4">
            {comments?.map((comment) => (
              <div key={comment.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{comment.nickName}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.nickName}</span>
                      <span className="text-xs text-muted-foreground">{comment.createTime}</span>
                    </div>
                    {isAdmin && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>确认删除评论</AlertDialogTitle>
                            <AlertDialogDescription>此操作无法撤销。这将永久删除这条评论。</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteComment(comment.id)}>删除</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CustomToast
        title={toastData.title}
        description={toastData.description}
        actionText={toastData.actionText}
        onActionClick={toastData.onActionClick}
        duration={toastData.duration}
        open={toastOpen}
        setOpen={setToastOpen}
      />
    </div>
  )
}
