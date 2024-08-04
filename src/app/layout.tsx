import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { AuthProvider } from '../components/context/AuthContext';
import { PasskeysProvider } from '../components/context/PasskeysContext';

const inter = Inter({ subsets: ["latin"] });

const AuthButton = dynamic(() => import('../components/AuthButton'), { ssr: false });
const ClientPasskeyModal = dynamic(() => import('../components/ClientPasskeyModal'), { ssr: false });

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
        <PasskeysProvider>
          <AuthProvider>
            <div className="relative min-h-screen">
              <AuthButton />
              <ClientPasskeyModal />
              {children}
            </div>
          </AuthProvider>
        </PasskeysProvider>
      </body>
    </html>
  );
}