import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME } from "../../constants/common";

// const ibmPlexSans = IBM_Plex_Sans({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600", "700"],
// });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@200,201,300,301,400,401,500,501,600,601,700,701&display=swap" rel="stylesheet" />
      </head>
      <body className={`antialiased`}>
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#a5d6a7]/25 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#66bb6a]/20 blur-3xl"></div>
        <div className="p-4 lg:p-6">{children}</div>
      </body>
    </html>
  );
}
