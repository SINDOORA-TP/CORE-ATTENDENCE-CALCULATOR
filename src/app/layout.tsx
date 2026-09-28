import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Core Calculator – Attendance Calculator",
  description:
    "Calculate remaining classes, attendance recovery requirements, and future attendance projections. Know exactly how many classes you need to attend.",
  keywords: [
    "attendance calculator",
    "college attendance",
    "class attendance tracker",
    "attendance recovery",
    "student attendance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
