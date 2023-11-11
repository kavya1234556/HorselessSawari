import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";

interface ModalProps {
  title?: string;
  description?: string;
  className?: string;
  isOpen: boolean;
  showHeader?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  className,
  showHeader = true,
}) => {
  const onHandleModalChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onHandleModalChange}>
      <DialogContent className={cn("p-0 max-w-[1056px] ", className)}>
        {showHeader && (
          <DialogHeader>
            <DialogTitle className="text-[22px] sm:pl-[37px] pt-[30px] sm:text-left pb-[30px] bg-purple text-center font-medium">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <Separator orientation="horizontal" />

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
