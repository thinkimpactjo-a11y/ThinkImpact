"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {Plus,  SquarePen, GripVertical } from "lucide-react";
import React, { useState, useTransition } from "react";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { type newMemberDragAndDrop } from "@/types/index";
import { deleteMember } from "@/app/[locale]/admin/dashboard/ourTeam/(fetch)/deleteMember";
import DeleteMemberButton from "./deleteMemberButton";
import { updateMemberOrder } from "@/app/[locale]/admin/dashboard/ourTeam/(fetch)/updateMemberOrder";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { signOut } from "next-auth/react";

function getErrorMessage(error: unknown): string | null {
  if (typeof error === "object" && error !== null && "message" in error) {
    const msg = (error as { message?: unknown }).message;
    return typeof msg === "string" ? msg : null;
  }
  return null;
}

interface Props {
  members: newMemberDragAndDrop[];
}

export default function DragDropOurteam({ members: initialMembers }: Props) {
  const [members, setMembers] = useState(initialMembers);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const router = useRouter();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = members.findIndex((c) => c.id === active.id);
      const newIndex = members.findIndex((c) => c.id === over?.id);
      setMembers(arrayMove(members, oldIndex, newIndex));
    }
  };

  const handleSaveOrder = async () => {
    const body = members.map((member, index) => ({
      id: member.id,
      display_order: index + 1,
    }));
    startTransition(async () => {
      try {
        await updateMemberOrder(body);
        setToast({ message: "Members Ordered successfully!", type: "success" });
        setTimeout(() => {
          setToast(null);
          router.replace("/admin/dashboard/ourTeam");
          window.location.reload();
        }, 1500);
      } catch (error) {
         const message = getErrorMessage(error);
                        if (message === "SESSION_EXPIRED" || message === "UNAUTHENTICATED") {
                          setToast({ message: "Expired Session, Please Login", type: "error" });
                
                          setTimeout(() => {
                            signOut({ callbackUrl: "/login?reason=expired" });
                          }, 500);
                
                          return;
                        }
        console.error(error);
        setToast({ message: "Failed to Order Member.", type: "error" });
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  const SortableRow = ({ member }: { member: newMemberDragAndDrop }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: member.id });

    const style = {
      transform: transform ? `translateY(${transform.y}px)` : undefined,
      transition,
    };

    return (
      <TableRow ref={setNodeRef} style={style}>
        <TableCell
          className="cursor-grab active:cursor-grabbing text-center"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="mx-auto text-gray-500 hover:text-gray-700" />
        </TableCell>

        <TableCell className="text-xs sm:text-base">{member.name_en}</TableCell>
        <TableCell className="text-xs sm:text-base hidden xl:table-cell">
          {member.position_en}
        </TableCell>
        <TableCell className="text-xs sm:text-base text-center">
          {member.main ? "Yes" : "No"}
        </TableCell>
        <TableCell className="flex justify-center">
          <Image
            src={member.image ?? ""}
            alt={member.name_en}
            className="rounded-full object-cover w-10 h-10 md:w-20 md:h-20"
            width={80}
            height={80}
          />
        </TableCell>
        <TableCell className="text-xs sm:text-base text-center">
          {member.display_order ?? "-"}
        </TableCell>

        <TableCell>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/admin/dashboard/ourTeam/${member.id}`}>
                    <SquarePen className="w-5 h-5 text-[#125892] cursor-pointer hover:text-[#0f4473]" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DeleteMemberButton
              memberId={member.id}
              deleteAction={deleteMember}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div>
      <div className="w-full overflow-x-auto border border-gray-300 rounded-2xl p-2 flex justify-center">
        <div className="min-w-[70vw] md:min-w-[70vw]">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={members}
              strategy={verticalListSortingStrategy}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden xl:table-cell">
                      Position
                    </TableHead>
                    <TableHead className="text-center">Main Member</TableHead>
                    <TableHead className="text-center">Image</TableHead>
                    <TableHead className="text-center">Sequence</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <SortableRow key={member.id} member={member} />
                  ))}
                </TableBody>
              </Table>
            </SortableContext>
          </DndContext>
        </div>
      </div>
<div className="flex justify-end gap-2 mt-4">
  <button
    onClick={handleSaveOrder}
    className="bg-[#125892] hover:bg-[#0f4473] text-white px-5 py-3 rounded-md cursor-pointer"
  >
    {isPending ? "Loading..." : "Save Order"}
  </button>

  <Link
    href="/admin/dashboard/ourTeam/newMember"
    className="bg-[#125892] hover:bg-[#0f4473] text-white px-5 py-3 rounded-md flex items-center gap-2"
  >
    <Plus className="w-5 h-5" />
    Add
  </Link>
</div>


      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-5 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
