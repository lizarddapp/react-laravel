import React, { useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";
import { useToastStore } from "../store/toast";
import { clsx } from "clsx";
const MyToast = () => {
  const toast = useToastStore((state) => state.toasts);
  const setToast = useToastStore((state) => state.setToast);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (toast) {
      setOpen(true);
    }
  }, [toast]);
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className={clsx(
          " rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut",
          toast?.type === "success" ? "bg-white" : "bg-red-500 text-white"
        )}
        open={open}
        onOpenChange={(e) => {
          setOpen(e);
          if (!e) {
            setToast(null);
          }
        }}
      >
        <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
          {toast?.msg}
        </Toast.Title>
        <Toast.Description asChild>{toast?.msg}</Toast.Description>
        <Toast.Action
          className="[grid-area:_action]"
          asChild
          altText="Goto schedule to undo"
        ></Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

export default MyToast;
