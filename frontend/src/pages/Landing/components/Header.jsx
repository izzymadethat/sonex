import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginPopup, SignupPopup } from "@/pages/auth";

const Header = () => {

  return (
    <header className="flex justify-between p-4">
      <div className="w-full">
        <p className="text-2xl font-bold text-inherit">Sonex</p>
      </div>
      <nav className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              Login
            </Button>
          </DialogTrigger>
          <DialogContent>
            <LoginPopup />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Sign Up</Button>
          </DialogTrigger>
          <DialogContent>
            <SignupPopup />
          </DialogContent>
        </Dialog>
      </nav>
    </header>
  );
};

export default Header;
