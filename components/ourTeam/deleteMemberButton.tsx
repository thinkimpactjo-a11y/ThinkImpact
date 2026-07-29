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

export default function DeleteMemberButton({
  memberId,
  deleteAction,
}: {
  memberId: string;
  deleteAction: (
    id: string,
  ) => Promise<{ message: string; success: boolean; status: number }>;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const result = await deleteAction(memberId);
      console.log("result: ", result);

      if (result.success) {
        setOpen(false);
        return;
      }

      if (result?.status === 403 || result?.status === 401) {
        setTimeout(() => {
          signOut({ callbackUrl: "/login?reason=expired" });
        }, 800);
        return;
      }

      console.error(result.message || "Failed to delete member");
      setOpen(false);
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative flex items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Trash2 className="h-5 w-5 cursor-pointer text-[#8B0000] hover:text-[#800000]" />
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
            Are you sure you want to delete this member?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
