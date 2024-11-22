import { useState } from "react";
import Loader from "../../components/informational/Loader/Loader";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { loginUser, selectUser } from "@/store/userSlice";
import { toast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPopup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(selectUser);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});


  async function handleSubmitLogin(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    if (!credential && !password) {
      setErrors({
        credential: "Please enter your username or email",
        password: "Please enter your password",
      });
      return;
    }

    if (!credential) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        credential: "Please enter your username or email",
      }));
      return;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Please enter your password",
      }));
      return;
    }
    try {
      const result = await dispatch(loginUser({ credential, password }));

      if (loginUser.rejected.match(result)) {
        toast({
          title: "Uh Oh. Login failed!",
          description: result.payload,
          variant: "destructive"
        });
        return;
      }
      toast({
        title: "Login successful",
        description: `Welcome back, ${result.payload.user.firstName}!`,
      });
      return navigate("/user/me");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDemoLogin = async () => {
    //for demo purposes only
    const userCred = {
      credential: "demo@sonexaudio.app",
      password: "password"
    };
    const result = await dispatch(loginUser(userCred));

    if (loginUser.rejected.match(result)) {
      toast({
        title: "Uh Oh. Login failed!",
        description: result.payload,
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Welcome back, Demo!"
    });
    return navigate("/user/me");

  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold">Login to use Sonex</DialogTitle>
        <DialogDescription>

        </DialogDescription>
        <div className="my-4 space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="credential">Username or Email</label>
            <Input value={credential} onChange={(e) => setCredential(e.target.value)} />
            {errors?.credential && <span className="text-sm text-red-500">{errors.credential}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="credential">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors?.password && <span className="text-sm text-red-500">{errors.password}</span>}
          </div>
        </div>
      </DialogHeader>
      <DialogFooter>
        <Button type="button" onClick={handleDemoLogin}>Login as a Demo User</Button>
        <Button type="submit" variant="outline" onClick={handleSubmitLogin} disabled={isSubmitting}>
          {
            isSubmitting
              ?
              (
                <>
                  <Loader />
                  <span>"Logging in..."</span>
                </>
              ) : <span>Login</span>
          }
        </Button>
      </DialogFooter>
    </>
  );
};

export default LoginPopup;