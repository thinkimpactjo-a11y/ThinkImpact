import React from "react";
import Head from "next/head";
import { getBannerbyId } from "@/app/models/db/lib/services/banners";
import EditBannerForm from "@/components/banner/editBannerForm";
import { editBanner } from "../(actions)/editBannerAction";

async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const banner = await getBannerbyId(params.id);

  return (
    <>
      <Head>
        <title>Think Impact - Edit Banner</title>
        <meta
          name="description"
          content="Edit an existing banner for Think Impact website. Update banner details efficiently."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/edit-banner/${params.id}`}
        />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Think Impact - Edit Banner" />
        <meta
          property="og:description"
          content="Edit an existing banner for Think Impact website. Update banner details efficiently."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/admin/edit-banner/${params.id}`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`}
        />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <EditBannerForm banner={banner[0]} action={editBanner} />
    </>
  );
}

export default Page;
