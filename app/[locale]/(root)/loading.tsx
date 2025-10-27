import React from "react";
import Image from "next/image";
import loader from "@/public/style/loader.gif";

export default function loading() {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Image src={loader} alt="loading" width={200} height={200} />
    </div>
  );
}
