import Head from "next/head";
import ChangePasswordForm from "@/components/changePassword/changePasswordForm"; 

export default async function ChangePasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Head>
        <title>Change Password - Think Impact</title>
        <meta
          name="description"
          content="Change your Think Impact account password safely and securely."
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL}/change-password`} />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Change Password - Think Impact" />
        <meta
          property="og:description"
          content="Change your Think Impact account password safely and securely."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/change-password`} />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:site_name" content="Think Impact" />
      </Head>

      <ChangePasswordForm locale={locale} />
    </>
  );
}
