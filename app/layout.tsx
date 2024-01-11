import type { Metadata } from "next";
import { Nunito_Sans, Open_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";

const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-open-sans",
});

const nunito_sans = Nunito_Sans({
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
      <body className={`${open_sans.variable} ${nunito_sans.variable}`}>
        <NavBar />
        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}
