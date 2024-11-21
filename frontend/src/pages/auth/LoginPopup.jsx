import { Link, useNavigate } from "react-router-dom";
import { Mail, RectangleEllipsis } from "lucide-react";
import { useState } from "react";
import Loader from "../../components/informational/Loader/Loader";
import axios from "axios";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { loginUser, selectUser } from "@/store/userSlice";
import { toast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";

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

// (
//   <main className="flex flex-col items-center justify-center w-full mx-auto translate-y-1/2">
//   <div className="flex gap-2">
//     <h1 className="text-3xl">MySonex</h1>
//     <span>Login</span>
//   </div>

//   <div className="w-[380px] h-[380px] rounded-md p-4 ">
//     {formError && (
//       <div className="p-2 mb-4 text-white bg-red-500 rounded-md">
//         {formError}
//       </div>
//     )}
//     <form
//       onSubmit={handleSubmitLogin}
//       className="flex flex-col items-center gap-4"
//     >
//       <Input
//         required
//         type="text"
//         name="credential"
//         variant="underlined"
//         label="Username or Email"
//         value={formData.credential}
//         onChange={handleInputChange}
//         startContent={<Mail />}
//       />
//       <Input
//         required
//         type="password"
//         variant="underlined"
//         label="Password"
//         name="password"
//         value={formData.password}
//         onChange={handleInputChange}
//         startContent={<RectangleEllipsis />}
//       />
//       <Link
//         to="/forgot-password"
//         className="text-xs text-center text-blue-500 underline"
//       >
//         Forgot Password?
//       </Link>
//       <br />
//       <Button type="submit" fullWidth disabled={isSubmitting}>
//         {isSubmitting ? (
//           <>
//             <Loader /> Logging in...
//           </>
//         ) : (
//           "Login"
//         )}
//       </Button>
//       <p className="text-xs text-right transition-all duration-300 hover:underline">
//         <Link to="/register">No account? Sign Up</Link>
//       </p>
//     </form>
//   </div>
// </main>
// )
