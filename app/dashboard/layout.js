import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { StateProvider } from "@/app/store/StateProvider";
import { initialState, reducer } from "@/app/store/reducer";
import Sidebar from "./sidebar/Sidebar";
export const metadata = {
  title: "Nurse Caren",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full flex flex-col">
        <StateProvider initialState={initialState} reducer={reducer}>
          <div className="flex">
            <div>
              <Sidebar />
            </div>
            {children}
          </div>
        </StateProvider>
      </body>
    </html>
  );
}
