import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { navLinks } from "../constants";

const Header = () => {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit">Sonex</p>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem className="flex gap-2">
          {navLinks.map((link) => (
            <Link href={link.route}>{link.title}</Link>
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
