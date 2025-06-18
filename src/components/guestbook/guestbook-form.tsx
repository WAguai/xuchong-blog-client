"use client"

import type React from "react"
import {jwtDecode} from 'jwt-decode';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import HttpService from '@/lib/axios-utils';
import {DecodedToken,GuestbookEntry} from '@/types/service-interface'; 
import { GuestbookFormProps } from "@/types/components-interface";
import CustomToast from '@/components/commen/custom-toast';
import { getToken } from '@/lib/token-utils';
import { GUESTBOOK_ADD_MESSAGE } from "@/constant/request-url";

export function GuestbookForm({ onMessageAdded }: GuestbookFormProps) {
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [toastOpen, setToastOpen] = useState(false);

  const [toastData, setToastData] = useState({
    title: '',
    description: '',
    actionText: "确定",
    onActionClick: undefined,
    duration: 3000 // 默认持续时间为3秒
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ 阻止默认提交行为
    const token = getToken();
    if (!token) {
      setToastOpen(false);
      setToastData({...toastData, title: '系统提示', description: '请登录之后再写留言噢~'});
      setToastOpen(true);
      return;
    }
    const decoded = jwtDecode<DecodedToken>(token); // 直接获取Payload对象[3](@ref)
    const userId = decoded?.userId;
    const userNickName = decoded?.userNickName;
    console.log(userId, message);
    setIsSubmitting(true);
    const response = await HttpService.post(GUESTBOOK_ADD_MESSAGE, {
      userId: userId,
      message: message,
      nickName: userNickName
    });
    if (response) {
      const addMessageVO = response.data;
      console.log("addMessageVO", addMessageVO);
      setIsSubmitting(false);
      setIsSuccess(true);
      setMessage("");
      onMessageAdded?.(addMessageVO);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="message">留言</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="在这里写下你的留言..."
            className="min-h-[120px]"
            required
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "提交中..." : "提交留言"}
        </Button>
        {isSuccess && <p className="text-green-500 mt-2">留言提交成功！感谢你的留言。</p>}
      </form>
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
