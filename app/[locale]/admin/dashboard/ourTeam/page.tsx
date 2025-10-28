import Head from "next/head";
import { getAllMembers } from "@/app/models/db/lib/services/outTeam";
import DragDropClients from "@/components/ourTeam/dragDropOurTeam";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function membersTable() {
  const members = await getAllMembers();

  return (
    <>
      <main className="flex flex-col justify-center items-center xl:ml-5 m-2">
        <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
          <h1 className="text-lg md:text-2xl font-bold">Members</h1>
          <h2 className="text-sm md:text-lg text-gray-600">
            A list of your Team Members.
          </h2>
        </div>

        {members.length === 0 ? (
          <div className="w-full text-center py-10 text-gray-500 text-lg min-w-[75vw]">
            No Members found. Please add a new Member.
          </div>
        ) : (
          <DragDropClients members={members} />
        )}

        <div className="flex justify-end mt-4  w-full">
          <Link
            href="/admin/dashboard/ourTeam/newMember"
            className="bg-[#125892] hover:bg-[#0f4473] text-white px-5 py-3 rounded-md flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add
          </Link>
        </div>
      </main>
    </>
  );
}
