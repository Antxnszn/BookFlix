import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <main className="p-6 min-h-screen bg-[#000810] text-white">
        <Outlet />
      </main>
    </>
  );
}