import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loader from "../../components/informational/Loader/Loader";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { createUser, loginUser, selectUser } from "@/store/userSlice";
import { useSelector } from "react-redux";


const Signup = () => {
  const dispatch = useDispatch();
  const { error, status } = useSelector(selectUser);


  // State for form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});


  // // handle form errors in real-time
  // useEffect(() => {
  //   const errors = {};

  //   if (username.length < 6 || username.length > 20) {
  //     errors.username = "Username must be between 6 and 20 characters.";
  //   }

  //   if (password.length < 4 || password.length > 20) {
  //     errors.password = "Password must be between 4 and 20 characters.";
  //   }

  //   if (Object.keys(errors).length > 0) {
  //     setFormErrors(errors);
  //   } else {
  //     setFormErrors({});
  //   }
  // }, [username, password]);


  function validateInputs() {
    const errors = {};

    if (!firstName) {
      errors.firstName = "First name is required";
    }
    if (!lastName) {
      errors.lastName = "Last name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!username) {
      errors.username = "Username is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  }

  async function handleSubmitSignup(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const errors = validateInputs();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }


    const userData = {
      firstName,
      lastName,
      username,
      email,
      password
    };

    try {
      const result = await dispatch(createUser(userData));
      if (createUser.fulfilled.match(result)) {
        toast({
          title: "Success",
          description: "Account created successfully. Welcome to Sonex!",
        });
        await dispatch(loginUser({ credential: email, password }));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create account. Please try again. ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold">Create Account</DialogTitle>
        <DialogDescription>
          Sign in to use Sonex!
        </DialogDescription>
      </DialogHeader>
      <div className="my-4 space-y-4">
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="firstName">First Name</label>
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          {formErrors.firstName && <p className="text-sm text-red-500">{formErrors.firstName}</p>}
          {error?.firstName && <p className="text-sm text-red-500">{error.firstName}</p>}
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="lastName">Last Name</label>
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          {formErrors.lastName && <p className="text-sm text-red-500">{formErrors.lastName}</p>}
          {error?.lastName && <p className="text-sm text-red-500">{error.lastName}</p>}
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="email">Email</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
          {error?.email && <p className="text-sm text-red-500">{error.email}</p>}
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="username">Username</label>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          {formErrors.username && <p className="text-sm text-red-500">{formErrors.username}</p>}
          {error?.username && <p className="text-sm text-red-500">{error.username}</p>}
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="password">Password</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
          {error?.password && <p className="text-sm text-red-500">{error.password}</p>}
        </div>

        <div>
          {
            status === "failed" && error?.duplicateCredentials && (
              <p className="font-semibold text-center text-red-500">
                {error.duplicateCredentials ? "Username or email already exists." : error.message || "Signup Failed. Please try again."}
              </p>
            )
          }
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting} onClick={handleSubmitSignup}>Register</Button>
      </DialogFooter>
    </>
  );
};

export default Signup;