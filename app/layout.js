import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ux/Navbar";
export const metadata = {
  title: "Nurse Caren",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full flex flex-col">
        <div>
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
