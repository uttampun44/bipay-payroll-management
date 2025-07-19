  "use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FrontLayout from "@layouts/front/frontlayout";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { account } from "./appwrite";
import BackendLayout from "@layouts/backend/backendlayout";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bipay Payroll Management",
  description:
    "Bipay is a payroll management platform that allows you to manage your payroll, employee information, and taxes all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const AuthUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData || null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    AuthUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {user ? (
            <BackendLayout>{children}</BackendLayout>
          ) : (
            <FrontLayout>{children}</FrontLayout>
          )}
          <Toaster richColors position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
