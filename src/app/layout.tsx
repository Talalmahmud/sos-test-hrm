import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ContextProvider from "@/components/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Softmax HRM",
  description: "Management of sos hrm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          {children}
          <ToastContainer
            toastStyle={{ fontSize: "14px", width: "100%" }}
            position="top-center"
            autoClose={2000}
          />
        </ContextProvider>
      </body>
    </html>
  );
}
