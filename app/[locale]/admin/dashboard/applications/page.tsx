import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DeleteApplicationButton from "@/components/careers/deleteApplicationButton";
import ShowApplicationComponent from "@/components/careers/showApplicationComponent";
import { deleteApplication } from "./(fetch)/deleteApplication";
import { getAllApplications } from "@/app/models/db/lib/services/careers";

export default async function applicationsTable() {
  const applications = await getAllApplications();

  return (
    <main className="flex flex-col justify-center items-center m-2 w-full">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full lg:max-w-[75vw]">
        <h1 className="text-lg md:text-2xl font-bold">Applications</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of your Applications.
        </h2>
      </div>

      {applications.length === 0 ? (
        <div className="w-full text-center py-10 text-gray-500 text-lg max-w-[calc(100vw-32px)] lg:max-w-[75vw]">
          No Applications found
        </div>
      ) : (
        // Center wrapper: controls overall width behavior
        <div className="w-full flex justify-center">
          {/* 
            This inner wrapper sets the effective width:
              - Small screens: calc(100vw - 32px) so it's slightly less than full viewport
              - Large screens: 75vw
              - max-w-[1200px] to avoid overly wide table on very large displays
          */}
          <div className="overflow-x-auto rounded-2xl border border-gray-300 p-2
                  w-[calc(100vw-64px)] lg:w-[75vw] max-w-[1200px]">
            {/* Keep a min width for the inner table so columns don't collapse */}
            <div className="min-w-[70vw]">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name & Info</TableHead>
                    <TableHead className="hidden lg:table-cell">Email</TableHead>
                    <TableHead className="hidden lg:table-cell">Area Of Expertise</TableHead>
                    <TableHead className="hidden lg:table-cell">CV</TableHead>
                    <TableHead className="hidden lg:table-cell">Applied At</TableHead>
                    <TableHead className="text-center hidden lg:table-cell">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {applications.map((application, i) => (
                    <React.Fragment key={application.id ?? i}>
                      {/* Main row */}
                      <TableRow>
                        <TableCell className="flex flex-col text-xs sm:text-base lg:text-base">
                          <span className="font-semibold">
                            {application.first_name} {application.last_name}
                          </span>

                          {/* Small screen details */}
                          <div className="text-gray-500 lg:hidden text-xs flex flex-col gap-1 mt-1">
                            <div>Email: {application.email}</div>
                            <div>Area: {application.area_of_expertise}</div>
                          </div>
                        </TableCell>

                        {/* Email */}
                        <TableCell className="hidden lg:table-cell text-xs sm:text-base">
                          {application.email}
                        </TableCell>

                        {/* Area of Expertise */}
                        <TableCell className="hidden lg:table-cell text-xs sm:text-base">
                          {application.area_of_expertise}
                        </TableCell>

                        {/* CV */}
                        <TableCell className="hidden lg:table-cell text-xs sm:text-base">
                          {application.cv ? (
                            <a
                              href={application.cv}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {application.first_name}’s CV
                            </a>
                          ) : (
                            "—"
                          )}
                        </TableCell>

                        {/* Applied At */}
                        <TableCell className="hidden lg:table-cell text-xs sm:text-base">
                          {application.created_at
                            ? new Date(application.created_at).toLocaleDateString()
                            : ""}
                        </TableCell>

                        {/* Actions for large screens */}
                        <TableCell className="text-xs sm:text-base text-center hidden lg:table-cell">
                          <div className="flex items-center justify-center gap-2">
                            <ShowApplicationComponent
                              application={{
                                ...application,
                                created_at: application.created_at
                                  ? new Date(application.created_at)
                                  : undefined,
                              }}
                            />
                            <DeleteApplicationButton
                              applicationId={application.id ?? ""}
                              deleteAction={deleteApplication}
                            />
                          </div>
                        </TableCell>
                      </TableRow>

                      {/* Actions row for small screens (compact, close to data) */}
                      <TableRow className="lg:hidden bg-gray-50">
                        <TableCell colSpan={6} className="p-2 text-xs text-gray-700 flex items-center justify-between">
                          <span className="text-sm font-semibold">Actions:</span>
                          <div className="flex justify-start items-center gap-2">
                            <ShowApplicationComponent
                              application={{
                                ...application,
                                created_at: application.created_at
                                  ? new Date(application.created_at)
                                  : undefined,
                              }}
                            />
                            <DeleteApplicationButton
                              applicationId={application.id ?? ""}
                              deleteAction={deleteApplication}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
