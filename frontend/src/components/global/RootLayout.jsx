import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};
export default RootLayout;
