import { Button } from "@/components/ui/button";
import { navLinks } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectUser } from "@/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDemoLogin = async () => {
    await dispatch(
      loginUser({ credential: "demo@user.com", password: "password" })
    ); //for demo purpose only

    return navigate("/user/me");
  };

  return (
    <header className="flex justify-between p-4">
      <div className="w-full">
        <p className="text-2xl font-bold text-inherit">Sonex</p>
      </div>
      <nav className="flex items-center gap-4">
        <Button variant="outline" onClick={handleDemoLogin}>
          Login
        </Button>
        <Button>Sign Up</Button>
      </nav>
    </header>
  );
};

export default Header;

// const nav = (
//   <Navbar
//       shouldHideOnScroll
//       isBlurred
//       isBordered
//       classNames={{
//         base: ["bg-[#212121]"]
//       }}
//     >
//       <NavbarBrand>
//         <p className="font-bold text-inherit">Sonex</p>
//       </NavbarBrand>
//       <NavbarContent justify="center">
//         <NavbarItem className="flex gap-2">
//           {navLinks.map((link, index) => (
//             <Link key={index} href={link.route} underline="hover">
//               {link.title}
//             </Link>
//           ))}
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         <NavbarItem>
//           <Link href="/login">Login</Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Button as={Link} href="/register">
//             Signup for Free
//           </Button>
//         </NavbarItem>
//       </NavbarContent>
//     </Navbar>
// )
