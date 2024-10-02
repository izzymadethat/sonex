import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button
} from "@nextui-org/react";
import { navLinks } from "../../../constants";

const Header = () => {
  return (
    <Navbar
      shouldHideOnScroll
      isBlurred
      isBordered
      classNames={{
        base: ["bg-[#212121]"]
      }}
    >
      <NavbarBrand>
        <p className="font-bold text-inherit">Sonex</p>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem className="flex gap-2">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.route} underline="hover">
              {link.title}
            </Link>
          ))}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/register">
            Signup for Free
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
