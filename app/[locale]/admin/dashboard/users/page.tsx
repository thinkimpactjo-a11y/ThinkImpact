import React from "react";
import Head from "next/head";
import { getAllusers } from "@/app/models/db/lib/services/users";
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
import { SquarePen } from "lucide-react";
import DeleteUserButton from "@/components/users/deleteUserButton";
import { deleteUser } from "./(fetch)/deleteUser";

export default async function UsersTable() {
  const users = await getAllusers();

  return (
    <>
      <Head>
        <title>Users - Think Impact Dashboard</title>
        <meta
          name="description"
          content="View and manage all users in the Think Impact dashboard."
        />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/users"}
        />

        {/* Open Graph */}
        <meta property="og:title" content="Users - Think Impact Dashboard" />
        <meta
          property="og:description"
          content="View and manage all users in the Think Impact dashboard."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard/users"}
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_APP_URL + "/images/logo.png"}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <main className="flex flex-col justify-center items-center ml-7">
        {/* Header */}
        <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
          <h1 className="text-lg md:text-2xl font-bold">Users</h1>
          <h2 className="text-sm md:text-lg text-gray-600">
            A list of your users.
          </h2>
        </div>

        {/* Table container */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[80vw]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs sm:text-base">
                      {user.first_name}
                    </TableCell>
                    <TableCell className="text-xs sm:text-base">
                      <a
                        href={`mailto:${user.email}`}
                        className="text-[#125892] hover:underline"
                      >
                        {user.email}
                      </a>
                    </TableCell>
                    <TableCell className="text-xs sm:text-base">{user.role}</TableCell>

                    {/* Edit + Delete */}
                    <TableCell>
                      <div className="flex items-center gap-[5px]">
                        {/* Edit Icon */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={`/admin/dashboard/users/${user.id}`}>
                                <SquarePen className="w-5 h-5 text-[#125892] cursor-pointer hover:text-[#0f4473]" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="center">
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Delete Icon */}
                        <DeleteUserButton userId={user.id} deleteAction={deleteUser} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}
