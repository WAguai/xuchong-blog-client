"use client"
import { useEffect,useState,useRef } from "react";
import { getToken } from "@/lib/token-utils";
import { MomentsList } from "@/components/moments/moments-list"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import HttpService from "@/lib/axios-utils";
import { MOMENT_GET_MOMENTS, USER_GETISADMIN } from "@/constant/request-url";
import { useContext } from "react";
import { AdminContext,UserContext } from "@/app/layout";
import { Moment,MomentLike } from "@/types/service-interface";
import { MomentListProps } from "@/types/components-interface";

export default function MomentsPage() {
  
  const isAdmin = useContext(AdminContext);
  const userId = useContext(UserContext);
  const [moments, setMoments] = useState<Moment[]>([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // 总页数
  const [currentPage, setCurrentPage] = useState(1);  const [pageSize, setPageSize] = useState(10);// 每页显示的留言数
  const [toastData, setToastData] = useState({
    title: '',
    description: '',
    actionText: "确定",
    onActionClick: undefined,
    duration: 3000
  });
  const onMomentAdded = (newMoment: Moment) => {
    setToastData({
      ...toastData,
      title: '系统提示', 
      description: '发布说说成功'
    });
    setToastOpen(true);
    setMoments(prev => [newMoment, ...prev]);
  };

  const onMomentDeleted = (momentId: number) => {
    setMoments(prev => prev.filter(moment => moment.id !== momentId));
  };

  const onMomentLiked = (newMomentLike: MomentLike, momentId: number) => {
    if (newMomentLike.id) {
        const newLike = newMomentLike
        setMoments((prevMoments) =>
          prevMoments.map((moment) =>
            moment.id === momentId
              ? {
                  ...moment,
                  likes: moment.likes ? [...moment.likes, newLike] : [newLike],
                }
              : moment
          )
        );
      }
      else {
        // 如果返回null，说明是取消点赞
        setMoments((prevMoments) =>
          prevMoments.map((moment) =>
            moment.id === momentId
              ? {
                  ...moment,
                  likes: moment.likes
                    ? moment.likes.filter(like => like.userId !== userId)
                    : [],
                }
              : moment
          )
        );
      }
  };
  const momentListProps:MomentListProps= {
    userId,
    moments,
    currentPage,
    totalPages,
    setCurrentPage,
    pageSize,
    onMomentAdded,
    onMomentDeleted,
    onMomentLiked,
  }

  useEffect(() => {
    const fetchMoments = async () => {
      const response = await HttpService.get(MOMENT_GET_MOMENTS,{ currentPage, pageSize }, {
        headers: { 'Content-Type': 'x-www-form-urlencoded' }
      });
      setMoments(response.data.moments);
      setTotalPages(Math.ceil(response.data.totalMoments / pageSize));
      console.log(response.data.moments);
    };

    fetchMoments();
  }, [currentPage, pageSize]); // 留下依赖项以便后续分页可用


  
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="flex flex-col items-start gap-4 md:gap-8">
        <div className="flex items-center justify-between w-full">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">说说</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              记录生活中的点点滴滴，分享此刻的心情和想法。
            </p>
          </div>
          {isAdmin && (<Link href="/moments/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              发布说说
            </Button>
          </Link>)}
        </div>

        <div className="w-full">
          <MomentsList  {...momentListProps} />
        </div>
      </div>
    </div>
  )
}
