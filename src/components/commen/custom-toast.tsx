// src/components/CustomToast.tsx
import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import  "@/css/custom-toast.css"; // 确保你有对应的 CSS 文件
import {CustomToastProps} from "@/types/components-interface"; // 引入接口定义

const CustomToast: React.FC<CustomToastProps> = ({
  title,
  description,
  actionText = "确定",
  onActionClick,
  open,
  setOpen,
  duration = 3000, // 默认 3 秒
}) => {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, duration);

      return () => clearTimeout(timer); // 清理定时器
    }
  }, [open, duration, setOpen]);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="ToastRoot"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="ToastTitle">{title}</Toast.Title>
        <Toast.Description className="ToastDescription">
          {description}
        </Toast.Description>
        <Toast.Action
          className="ToastAction"
          asChild
          altText={actionText}
        >
          <button
            className="Button small green"
            onClick={onActionClick ? onActionClick : () => setOpen(false)}
          >
            {actionText}
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default CustomToast;