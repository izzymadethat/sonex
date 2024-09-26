import { Button, Checkbox, Input, user } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Signup = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [agreesToTerms, setAgreesToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State for password visibility
  const [isVisible, setIsVisible] = useState(false);
  const togglePasswordVisibility = () => setIsVisible(!isVisible);

  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  const navigate = useNavigate();

  const handleTermsChange = () => setAgreesToTerms(!agreesToTerms);
  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmitSignup(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      if (!agreesToTerms) {
        setFormError("You must agree to the terms and conditions.");
        return;
      }

      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.username ||
        !formData.email ||
        !formData.password
      ) {
        setFormError("Please fill in all fields.");
        return;
      }

      // Simulate the server request (success or failure)
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          const success = Math.random() > 0.5; // Randomly simulate success/failure
          success ? resolve() : reject(new Error("Signup Failed"));
        }, 2000)
      );

      // On successful signup
      setIsSubmitted(true);
      navigate(`/register?success=true`, {
        state: { message: "Signup Successful! Welcome to MySonex!" },
      });

      // Wait for 2 seconds before redirecting to home
      setTimeout(() => {
        navigate("/", { state: { message: "User created successfully!" } });
      }, 2000);
    } catch (error) {
      console.log(error);
      setFormError("Signup failed. Please try again.");
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

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
        {formError && (
          <div className="bg-red-500 text-white p-2 rounded-md mb-4">
            {formError}
          </div>
        )}
        <form
          onSubmit={handleSubmitSignup}
          className="flex flex-col gap-4 items-center"
        >
          <Input
            required
            type="text"
            name="firstName"
            variant="underlined"
            label="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="lastName"
            variant="underlined"
            label="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <Input
            required
            type="email"
            name="email"
            variant="underlined"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            required
            type="text"
            name="username"
            variant="underlined"
            label="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <Input
            required
            type={isVisible ? "text" : "password"}
            name="password"
            variant="underlined"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
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
          <Checkbox
            size="sm"
            isSelected={agreesToTerms}
            onChange={handleTermsChange}
          >
            By creating an account, you agree to Sonex terms and Stripe's Terms
            and Conditions
          </Checkbox>
          <Button type="submit" fullWidth>
            {isSubmitting ? (
              <>
                <Loader /> Signing up...
              </>
            ) : (
              "Signup"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
