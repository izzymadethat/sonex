import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { LoginPopup, SignupPopup } from "@/pages/auth";
import { selectUser } from "@/store/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser: user } = useSelector(selectUser);

  useEffect(() => {
    // No action needed. Just a place holder to remount the
    // component on user sign in/sign up/restore
  }, [user]);

  return (
    <header className="flex justify-between p-4">
      <div className="w-full">
        <p className="text-2xl font-bold text-inherit">Sonex</p>
      </div>
      <nav className="flex items-center gap-4">
        {user ? (
          <Button onClick={() => {
            navigate("/user/me");
            return toast({
              title: `Welcome back, ${user.firstName}!`,
            });
          }}>Go to Dashboard</Button>
        ) : (
          <>
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
          </>
        )}

      </nav>
    </header>
  );
};

export default Header;
