"use client"
import { jwtDecode } from "jwt-decode"
import { useState,useEffect,useRef } from "react"
import { Card } from "@/components/ui/card"
import { GuestbookForm } from "@/components/guestbook/guestbook-form"
import { GuestbookEntries } from "@/components/guestbook/guestbook-entries"
import CustomToast  from '@/components/commen/custom-toast';
import HttpService from '@/lib/axios-utils';
import { GuestbookEntry,GuestComment } from '@/types/service-interface';
import { GuestbookEntiresProps } from "@/types/components-interface";
import { GUESTBOOK_GET_MESSAGES } from "@/constant/request-url"
export default function GuestbookPage() {
    const onMessageAdded = (guestbookEntry: GuestbookEntry) => {
    setToastOpen(false);
    setToastData({...toastData, title: '系统提示', description: '留言成功'});
    setToastOpen(true);
    // ✅ 不刷新页面，也不重新拉取数据，直接插入新留言到顶部
    setEntries(prev => [guestbookEntry, ...prev]);
    const nowTotalPages = Math.ceil((entries.length + 1) / pageSize);

    if (nowTotalPages !== totalPages) {
      setTotalPages(nowTotalPages);
    }
  };
  const onCommentAdded = (guestComment: GuestComment) => {
    // 添加新的评论到当前留言的评论列表中
    setEntries(prev =>
      prev.map(entry =>
        entry.id === guestComment.guestBookId
          ? {
              ...entry,
              guestComments: [...entry.guestComments, guestComment]
            }
          : entry
      )
    );
  };
  const onCommentDelete = (commentId: number) => {
    // 删除对应评论
    setEntries(prev =>
      prev.map(entry =>
        entry.id === commentId
          ? {
              ...entry,
              guestComments: entry.guestComments.filter(comment => comment.id !== commentId)
            }
          : entry
      )
    );
  };

  const onGuestBookEntryDelete = (guestBookId: number) => {
    // 删除对应留言
    setEntries(prev => prev.filter(entry => entry.id !== guestBookId));
  };
  
  const [toastOpen, setToastOpen] = useState(false);
  const [toastData, setToastData] = useState({
    title: '',
    description: '',
    actionText: "确定",
    onActionClick: undefined,
    duration: 3000
  });
  const [totalPages, setTotalPages] = useState(0); // 总页数
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);// 每页显示的留言数
  const guestbookEntriesProps: GuestbookEntiresProps = {
    entries,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    onCommentAdded,
    onCommentDelete,
    onGuestBookEntryDelete
  }
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchEntries = async () => {
      const response = await HttpService.get(GUESTBOOK_GET_MESSAGES, { currentPage, pageSize }, {
        headers: { 'Content-Type': 'x-www-form-urlencoded' }
      });
      setEntries(response.data.guestBooks);
      setTotalPages(Math.ceil(response.data.totalEntries / pageSize));
      console.log(response.data.guestBooks);
    };

    fetchEntries();
  }, [currentPage, pageSize]); // 留下依赖项以便后续分页可用



  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="flex flex-col items-start gap-4 md:gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">留言板</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            欢迎在这里留下你的想法、建议或者只是打个招呼。
          </p>
        </div>
        <Card className="w-full p-6">
          <GuestbookForm onMessageAdded={onMessageAdded} />
        </Card>
        <div className="w-full mt-8">
          <h2 className="text-2xl font-bold mb-4">访客留言</h2>
          <GuestbookEntries {...guestbookEntriesProps} />
        </div>
      </div>

      <CustomToast
        open={toastOpen}
        setOpen={setToastOpen}
        title={toastData.title}
        description={toastData.description}
        actionText={toastData.actionText}
        onActionClick={toastData.onActionClick}
        duration={toastData.duration}
      />
    </div>
  );
}