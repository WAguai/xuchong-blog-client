"use client"
import { useEffect,useState } from "react";
import { getToken } from "@/lib/token-utils";
import { MomentsList } from "@/components/moments/moments-list"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import HttpService from "@/lib/axios-utils";
import { USER_GETISADMIN } from "@/constant/request-url";
import { useContext } from "react";
import { AdminContext } from "@/app/layout";
export default function MomentsPage() {
  const isAdmin = useContext(AdminContext);
  
  // useEffect(() => {
  //   console.log("获取管理员状态",getToken());
  //   if (!getToken()) {
  //     setIsAdmin(false);
  //     return;
  //   }
  
  //   HttpService.get(USER_GETISADMIN)
  //     .then((response) => {
  //       const userIsAdmin = response.data;
  //       setIsAdmin(userIsAdmin);
  //     })
  // }, [getToken()]);

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
          <MomentsList/>
        </div>
      </div>
    </div>
  )
}
