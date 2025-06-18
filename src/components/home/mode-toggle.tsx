"use client"
import { useState } from 'react';
import { Moon, Sun } from "lucide-react"
import { User } from 'lucide-react';
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import HttpService from '@/lib/axios-utils';
import  CustomToast  from '@/components/commen/custom-toast';
import { setToken,getToken,removeToken } from '@/lib/token-utils';
import { get } from 'http';
import { USER_GETVERIFYCODE, USER_LOGIN, USER_LOGOUT, USER_REGISTER } from '@/constant/request-url';

export function ModeToggle() {
  const router = useRouter();
  const { setTheme } = useTheme()
  const handleLogin = () => {
    /* 实现游客登录逻辑 */
    console.log('handleLogin');
    if (getToken()) {
      setToastOpen(false);
      setToastData({...toastData, title: '系统提示', description: '您已经登录'});
      setToastOpen(true);
      return;
    }
    setShowLoginDialog(true);
  }

  const handleRegister = () => {
    /* 实现游客注册逻辑 */
    setShowRegisterDialog(true);
  }

  const handleLogout = () => {
    /* 实现登出逻辑 */
    if (!getToken()) {
      setToastOpen(false);
      setToastData({...toastData, title: '系统提示', description: '您尚未登录'});
      setToastOpen(true);
      return;
    }
    // 可选：发送退出请求到后端
    HttpService.post(USER_LOGOUT, {})
      .then(() => {
        removeToken()
        setToastOpen(false);
        setToastData({...toastData, title: '系统提示', description: '已退出登录'});
        setToastOpen(true);
        router.refresh();
      })
  }
  

  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  // 注册表单数据
  const [registerFormData, setRegisterFormData] = useState({
    nickName: '',
    email: '',
    password: '',
    code: ''
  });
  const [countdown, setCountdown] = useState(0);
  const [getCodeTimer, setGetCodeTimer] = useState<number | null>(null); // 新增状态保存定时器ID

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  // 登录表单数据
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  const [toastOpen, setToastOpen] = useState(false);

  const [toastData, setToastData] = useState({
    title: '',
    description: '',
    actionText: "确定",
    onActionClick: undefined,
    duration: 3000 // 默认持续时间为3秒
  });

  // 获取验证码逻辑
  const handleGetCode = async () => {
    if (!registerFormData.email) {
      setToastOpen(false);
      setToastData({...toastData, title: '系统提示', description: '请先填写邮箱'});
      setToastOpen(true);
      return;
    }
    // 清除之前的定时器（如果有）
    if (getCodeTimer) {
      clearInterval(getCodeTimer);
      setCountdown(0);
    }

    setCountdown(60);

    const timer = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGetCodeTimer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    await HttpService.post(USER_GETVERIFYCODE,{ email: registerFormData.email });
    setToastOpen(false);
    setToastData({...toastData, title: '系统提示', description: '验证码成功发送！'});
    setToastOpen(true);
  };

  // 注册提交逻辑
  const handleRegisterSubmit = async () => {
    const response = await HttpService.post(USER_REGISTER, registerFormData);
    if (response) {
      setShowRegisterDialog(false);
      setToastOpen(false);
      setToastData({...toastData, title: '系统提示', description: '注册并登录成功'});
      setToastOpen(true);
      const token = response.data.token;
      setToken(token);
    }
  };

  // 登录提交逻辑
  const handleLoginSubmit = async () => {
    const response = await HttpService.post(USER_LOGIN, loginFormData);
    if (response) {
      setShowLoginDialog(false);

      const token = response.data.token;
      console.log('登录成功，token:', token);
      setToken(token);

      setToastOpen(false);
      setToastData({...toastData, title: '系统提示', description: '登录成功,欢迎回来！'});
      setToastOpen(true);
      router.refresh();
    }
  }

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">账户设置</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleLogin}>
            登录
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleRegister}>
            注册
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            登出
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">切换主题</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>浅色</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>深色</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>系统</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


      <Dialog open={showRegisterDialog} 
        onOpenChange={(open) =>{
          setShowRegisterDialog(open)
          if (!open) {
            // 清空注册表单
            setRegisterFormData({
              nickName: '',
              email: '',
              password: '',
              code: ''
            });
          }
        }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>用户注册</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="昵称"
              value={registerFormData.nickName}
              onChange={(e) => setRegisterFormData({...registerFormData, nickName: e.target.value})}
              required
            />
            <Input
              type="email"
              placeholder="邮箱"
              value={registerFormData.email}
              onChange={(e) => setRegisterFormData({...registerFormData, email: e.target.value})}
              required
            />
            <Input
              type="password"
              placeholder="密码"
              value={registerFormData.password}
              onChange={(e) => setRegisterFormData({...registerFormData, password: e.target.value})}
              required
            />
            <div className="flex gap-2">
              <Input
                placeholder="验证码"
                value={registerFormData.code}
                onChange={(e) => setRegisterFormData({...registerFormData, code: e.target.value})}
                required
              />
              <Button 
                onClick={handleGetCode}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `${countdown}s后重试` : '获取验证码'}
              </Button>
            </div>
            <Button className="w-full" onClick={handleRegisterSubmit}>
              立即注册
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showLoginDialog} 
       onOpenChange={(open) =>{
          setShowLoginDialog(open)
          if (!open) {
            // 清空登录表单
            setLoginFormData({
              email: '',
              password: ''
            });
          }
        }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>用户登录</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="邮箱"
              value={loginFormData.email}
              onChange={(e) => setLoginFormData({...loginFormData, email: e.target.value})}
            />
            <Input
              type="password"
              placeholder="密码"
              value={loginFormData.password}
              onChange={(e) => setLoginFormData({...loginFormData, password: e.target.value})}
            />
            <Button className="w-full" onClick={handleLoginSubmit}>
              立即登录
            </Button>
          </div>
        </DialogContent>
      </Dialog>


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
