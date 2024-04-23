import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./ux/Navbar";
import { StateProvider } from "@/app/store/StateProvider";
import { initialState, reducer } from "@/app/store/reducer";
export const metadata = {
  title: "Nurse Caren",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full flex flex-col">
        <StateProvider initialState={initialState} reducer={reducer}>
          <div>
            <Navbar />
          </div>
          {children}
        </StateProvider>
      </body>
    </html>
  );
}
