import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../../config/site";
import {Toaster} from "sonner"

const cabin = Cabin({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:{
    default : siteConfig.name,
    template: `%s | ${siteConfig}`
  },
  description: siteConfig.description,
  icons:[
    {
      url:"/logo.svg",
      href: "./logo.svg"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cabin.className}>
        <Toaster/>
        {children}
      </body>
    </html>
  );
}
