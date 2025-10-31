// app/layout.tsx
import Navbar from "@/components/Navbar";
import "./globals.css";
import Link from "next/link";
import Footer from "@/components/Footer";

import "./globals.css";

export const metadata = {
  title: "World Clock",
  description: "Real-time world clock for multiple cities built with Next.js and Tailwind CSS",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Navbar */}
        <Navbar/>

        {/* Page content */}
        <main style={{ padding: "2rem" }}>{children}</main>

        {/* Footer */}
        <Footer/>
      </body>
    </html>
  );
}
