import type { Metadata } from "next";
import { Nunito_Sans, Open_Sans } from "next/font/google";
import GoogleAnalyticsScript from "./GoogleAnalyticsScript";
import NavBar from "./_components/navbar";
import AuthProvider from "./auth/Provider";
import "./css/globals.css";

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
      <GoogleAnalyticsScript />
      <body className={`${openSans.variable} ${nunitoSans.variable}`}>
        <AuthProvider>
          <NavBar />
          <main className="container">{children}</main>
          <p className="copyright">© Copyright 2024 – Błażej Mzyk</p>
        </AuthProvider>
      </body>
    </html>
  );
}
