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
        <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Illumyn" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
      </head>
      <body className={`antialiased`}>
        <div className="p-4 lg:p-6 min-h-screen flex flex-col gap-6">
          <TopBar />
          <div className="flex-1 flex flex-col items-center justify-center gap-6">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
