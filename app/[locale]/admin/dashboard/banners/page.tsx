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
import { SquarePen, Plus } from "lucide-react";
import { getBannerData } from "@/app/models/db/lib/services/banners";
import Image from "next/image";
import DeleteBannerButton from "@/components/banner/deleteBannerButton";
import { deleteBanner } from "./(actions)/deleteBannerAction";

export default async function UsersTable() {
  const banners = await getBannerData();

  return (
    <main className="flex flex-col justify-center items-center xl:ml-5 m-2">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Banners</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of your Banners.
        </h2>
      </div>
{banners.length === 0 ? (
        <div className="w-full text-center py-10 text-gray-500 text-lg min-w-[80vw]">
          No banners found. Please add a new banner.
        </div>
      ) : (  <div className="w-full overflow-x-auto border border-gray-300 rounded-2xl p-2">
        <div className="min-w-[80vw]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden xl:table-cell">Description</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs sm:text-base">{banner.alt}</TableCell>

                  {/* Description */}
                  <TableCell className="text-xs sm:text-base hidden xl:table-cell">
                    {banner.description_en?.substring(0, 50)}...
                  </TableCell>

                  {/* Image */}
                  <TableCell className="text-xs sm:text-base">
                    <Image
                      src={banner.image ?? ""}
                      alt={banner.alt}
                      width={75}
                      height={75}
                      className="rounded-full object-cover"
                    />
                  </TableCell>

                  {/* Created At */}
                  <TableCell className="text-xs sm:text-base">
                    {banner.created_at?.toLocaleDateString()}
                  </TableCell>

                  {/* Edit Icon */}
                  {/* Edit & Delete Icons in one cell */}
<TableCell>
  <div className="flex items-center gap-[5px]">
    {/* Edit Icon */}
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/admin/dashboard/banners/${banner.id}`}>
            <SquarePen className="w-5 h-5 text-[#125892] cursor-pointer hover:text-[#125892]" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          <p>Edit</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    {/* Delete Icon */}
    <DeleteBannerButton
      bannerId={banner.id ?? ""}
      deleteAction={deleteBanner}
    />
  </div>
</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
)}
      {/* Table container */}
    
      {/* Add Button under the table */}
      <div className="w-full flex justify-end mt-4">
        <Link
          href="/admin/dashboard/banners/newBanner"
          className="bg-[#125892] hover:bg-[#0f4473] text-white px-5 py-3 rounded-md flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add
        </Link>
      </div>
    </main>
  );
}
