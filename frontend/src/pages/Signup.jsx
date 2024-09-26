import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Signup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const togglePasswordVisibility = () => setIsVisible(!isVisible);

  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto translate-y-1/2 flex flex-col justify-center items-center">
      <div className="flex gap-2">
        <h1 className="text-3xl">MySonex</h1> <span>Signup</span>
      </div>

      {success === "true" ? (
        <p className="text-green-500">Signup Successful! Welcome to MySonex!</p>
      ) : success === "false" ? (
        <p className="text-red-500">Signup Failed. Please try again.</p>
      ) : (
        <p>Signup for a FREE Account and Start using MySonex!</p>
      )}

      <div className="w-[380px] h-[380px] rounded-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const signupSuccess = true;
            let message = "";

            message = signupSuccess
              ? "Signup Successful!"
              : "Signup Failed. Please try again.";

            window.alert(message);

            navigate(`/signup?success=${signupSuccess}`, {
              state: {
                message: signupSuccess
                  ? "Signup Successful!"
                  : "Signup Failed. Please try again."
              }
            });
          }}
          className="flex flex-col gap-4 items-center"
        >
          <Input
            type="text"
            name="firstName"
            variant="underlined"
            label="First Name"
          />
          <Input
            type="text"
            name="lastName"
            variant="underlined"
            label="Last Name"
          />
          <Input type="email" name="email" variant="underlined" label="Email" />
          <Input
            type={isVisible ? "text" : "password"}
            name="password"
            variant="underlined"
            label="Password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={togglePasswordVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? <EyeOff /> : <Eye />}
              </button>
            }
          />
          <Button type="submit" fullWidth>
            Sign Up for Free
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
