import type { Metadata } from "next";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME } from "../../constants/common";

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
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#a5d6a7]/25 blur-3xl z-[-1]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#66bb6a]/20 blur-3xl z-[-1]"></div>
        <div className="p-4 lg:p-6 min-h-screen flex flex-col gap-6">
          <TopBar />
          <div className="flex-1 flex flex-col items-center justify-center gap-6">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
