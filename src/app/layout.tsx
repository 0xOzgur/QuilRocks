import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import dynamic from 'next/dynamic';
import { AuthProvider } from '../context/AuthContext';

const inter = Inter({ subsets: ["latin"] });

const AuthButton = dynamic(() => import('../components/AuthButton'), { ssr: false });

export const metadata: Metadata = {
  title: "Quil Rocks",
  description: "Traditional Rocks Collection, on Quilibrium!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="relative min-h-screen">
            <AuthButton />
            {children}
          </div>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}