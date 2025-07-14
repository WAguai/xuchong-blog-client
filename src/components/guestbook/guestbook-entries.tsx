"use client"
import dayjs from 'dayjs';
import { useState,useEffect } from "react"
import HttpService from '@/lib/axios-utils';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MoreHorizontal, Trash2, MessageCircle } from "lucide-react"
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Pagination } from "@/components/commen/pagination"
import { GuestbookEntiresProps } from "@/types/components-interface";
import CustomToast from '@/components/commen/custom-toast';
import {jwtDecode} from 'jwt-decode';
import { DecodedToken, GuestbookEntry, GuestComment } from '@/types/service-interface';
import { getToken } from '@/lib/token-utils';
import { ADMIN_DELETE_GUESTBOOK, ADMIN_DELETE_GUESTCOMMENT, GUESTCOMMENT_ADDCOMMENT, USER_GETISADMIN } from '@/constant/request-url';
import { AdminContext } from "@/app/layout";
import { useContext } from "react";
import { formatDate } from '@/lib/utils';
export function GuestbookEntries(props: GuestbookEntiresProps) {
  const {
    entries = [], 
    currentPage = 1,
    totalPages, 
    setCurrentPage, 
    pageSize = 10, 
    onCommentAdded,
    onCommentDelete,
    onGuestBookEntryDelete
  } = props;
  const [expandedEntries, setExpandedEntries] = useState<Set<number>>(new Set())
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({})

  // 模拟管理员状态
  const isAdmin =  useContext(AdminContext)
  const startIndex = (currentPage - 1) * pageSize
  const currentEntries = entries.slice(startIndex, startIndex + pageSize)
  const [toastData, setToastData] = useState({
      title: '',
      description: '',
      actionText: "确定",
      onActionClick: undefined,
      duration: 3000 // 默认持续时间为3秒
    });
  const [toastOpen, setToastOpen] = useState(false);

  const handleDeleteEntry = (entryId: number) => {
    if (!isAdmin) return;
    HttpService.delete(ADMIN_DELETE_GUESTBOOK, { guestBookId:entryId },{headers: { 'Content-Type': 'x-www-form-urlencoded' }})
      .then(() => {
        onGuestBookEntryDelete?.(entryId);
      })
      .catch((error) => {
        console.error("删除留言失败:", error);
      });
  }

  const handleDeleteComment = async (commentId: number) => {
    if (!isAdmin) return;
    HttpService.delete(ADMIN_DELETE_GUESTCOMMENT, {guestCommentId:commentId},{headers: { 'Content-Type': 'x-www-form-urlencoded' }})
      .then(() => {
        onCommentDelete?.(commentId);
      })
      .catch((error) => {
        console.error("删除评论失败:", error);
      });
  }

  const handleReplySubmit = async (entryId: number) => {
    // TODO: 这里应该调用API提交回复
    const token = getToken();

    // e.preventDefault(); // ✅ 阻止默认提交行为

    if (!token) {
      setToastOpen(false);
      setToastData({...toastData, title: '系统提示', description: '请登录之后再写回复噢~'});
      setToastOpen(true);
      return;
    }
    // 如果没有输入内容则不提交
    if (!replyTexts[entryId]) {
      setToastOpen(false);
      setToastData({...toastData, title: '系统提示', description: '请填写回复后再提交噢~'});
      setToastOpen(true);
      return;
    }

    const decoded = jwtDecode<DecodedToken>(token); // 直接获取Payload对象[3](@ref)
    const userId = decoded?.userId;
    const replyText = replyTexts[entryId]
    const userNickName = decoded?.userNickName;

    const response = await HttpService.post(GUESTCOMMENT_ADDCOMMENT, {
      guestBookId: entryId,
      userId: userId,
      content: replyText,
      nickName: userNickName
    });
    console.log(entryId, replyText);
    if (response) {
      const addCommentVO = response.data;
      setReplyTexts({ ...replyTexts, [entryId]:"" })
      onCommentAdded?.(addCommentVO);
    }
  }

  const toggleExpanded = (entryId: number) => {
    const newExpanded = new Set(expandedEntries)
    if (newExpanded.has(entryId)) {
      newExpanded.delete(entryId)
    } else {
      newExpanded.add(entryId)
    }
    setExpandedEntries(newExpanded)
  }

  return (
    <div className="space-y-4">
      {currentEntries.map((entry) => (
        <Card key={entry.id}>
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <div className="font-medium text-sm">{entry.nickName}</div>
                  <div className="text-xs text-muted-foreground">{formatDate(entry.createTime)}</div>
                </div>
              </div>
              {isAdmin && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除留言
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除留言</AlertDialogTitle>
                          <AlertDialogDescription>
                            此操作无法撤销。这将永久删除这条留言及其所有回复。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteEntry(entry.id)}>删除</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <p className="mb-3">{entry.message}</p>

            {/* 评论区域 */}
            <div className="border-t pt-3">
              <div className="flex items-center justify-between mb-2">
                <Collapsible  className="mt-3 space-y-3 w-full max-w-xl" open={expandedEntries.has(entry.id)} onOpenChange={() => toggleExpanded(entry.id)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 p-0 h-auto">
                      <MessageCircle className="h-4 w-4" />
                      {entry.guestComments.length > 0 ? `${entry.guestComments.length} 条回复` : "回复"}
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-3 space-y-3 w-full max-w-xl">
                    {/* 现有评论 */}
                    {entry.guestComments.map((comment) => (
                      <div key={comment.id} className="flex gap-2 p-2 bg-muted/30 rounded w-full">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-xs">{comment.nickName}</span>
                              <span className="text-xs text-muted-foreground">{formatDate(comment.createTime)}</span>
                            </div>
                            {isAdmin && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-5 w-5">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>确认删除回复</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      此操作无法撤销。这将永久删除这条回复。
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>取消</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteComment(comment.id)}>
                                      删除
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                          <p className="text-xs mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))}

                    {/* 回复输入框 */}
                    <div className="flex gap-2">
                      <Textarea
                        value={replyTexts[entry.id] || ""}
                        onChange={(e) => setReplyTexts({ ...replyTexts, [entry.id]: e.target.value })}
                        placeholder="写下你的回复..."
                        className="min-h-[60px] text-sm resize-none"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleReplySubmit(entry.id)}
                        disabled={!replyTexts[entry.id]?.trim()}
                      >
                        回复
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
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

