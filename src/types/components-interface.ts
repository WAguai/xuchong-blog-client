import { GuestbookEntry, GuestComment } from "@/types/service-interface"

export interface CustomToastProps {
  title: string;
  description: string;
  actionText?: string;
  onActionClick?: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  duration?: number; // 新增属性：持续时间（毫秒）
}



export interface GuestbookEntiresProps {
  currentPage: number // 可选的页码参数
  setCurrentPage: (page: number) => void // 可选的页码更新函数
  pageSize: number // 可选的每页条数参数
  totalPages: number
  entries: GuestbookEntry[] // 可选的留言数据
  onCommentAdded?: (guestComment: GuestComment) => void; // 可选的评论添加回调函数
  onCommentDelete?: (commentId: number) => void;
  onGuestBookEntryDelete?: (guestBookId: number) => void;
}

export interface GuestbookFormProps {
  onMessageAdded?: (guestbookEntry: GuestbookEntry) => void; // 假设该回调不接收参数也不返回值
}