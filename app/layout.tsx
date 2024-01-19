import type { Metadata } from "next";
import { Nunito_Sans, Open_Sans } from "next/font/google";
import "./css/globals.css";
import NavBar from "./navbar";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Blaise Mzyk",
  description: "Blaise Mzyk Webpage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${nunitoSans.variable} container`}>
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
