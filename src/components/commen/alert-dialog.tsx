// src/components/ui/custom-alert-dialog.tsx
import * as React from "react";
import * as AlertDialogPrimitive from "@/components/ui/alert-dialog";

interface CustomAlertDialogProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  title,
  description,
  confirmText = "确认",
  cancelText = "取消",
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <AlertDialogPrimitive.AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.AlertDialogContent>
        <AlertDialogPrimitive.AlertDialogHeader>
          <AlertDialogPrimitive.AlertDialogTitle>{title}</AlertDialogPrimitive.AlertDialogTitle>
          <AlertDialogPrimitive.AlertDialogDescription>{description}</AlertDialogPrimitive.AlertDialogDescription>
        </AlertDialogPrimitive.AlertDialogHeader>
        <AlertDialogPrimitive.AlertDialogFooter>
          <AlertDialogPrimitive.AlertDialogCancel>{cancelText}</AlertDialogPrimitive.AlertDialogCancel>
          <AlertDialogPrimitive.AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogPrimitive.AlertDialogAction>
        </AlertDialogPrimitive.AlertDialogFooter>
      </AlertDialogPrimitive.AlertDialogContent>
    </AlertDialogPrimitive.AlertDialog>
  );
};

export default CustomAlertDialog;