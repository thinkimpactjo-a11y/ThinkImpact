"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function DeleteCategoryButton({
  categoryId,
  deleteAction,
}: {
  categoryId: string;
  deleteAction: (id: string) => Promise<{
    message: string;
    success: boolean;
    status: number;
  }>;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router= useRouter()

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const result = await deleteAction(categoryId);

      if (result?.status === 403 || result?.status === 401) {
        setTimeout(() => {
          signOut({ callbackUrl: "/login?reason=expired" });
        }, 500);
        return;
      }

      if (!result.success) {
        console.error(result.message);
        return;
      }

      setOpen(false);
      router.refresh()
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative flex justify-center items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Trash2 className="w-5 h-5 text-[#8B0000] cursor-pointer hover:text-[#800000]" />
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this Category?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end gap-2">
          <DialogTrigger asChild>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </DialogTrigger>
          <button
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleConfirm}
          >
            {loading ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
