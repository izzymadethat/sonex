import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Mail, RectangleEllipsis } from "lucide-react";
import { useState } from "react";
import Loader from "../../components/misc/Loader";

const Login = () => {
  const [formData, setFormData] = useState({ credential: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmitLogin(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch("http://localhost:8000/api/auth/session", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!data.user) {
        setFormError(data.errors.login);
      } else {
        setIsSubmitted(true);
        setFormError(null);
      }
      window.alert(`Login successful! Welcome back, ${data.user.firstName}!`);
    } catch (error) {
      // Handle errors
      console.log(error);
      setFormError("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="w-full mx-auto translate-y-1/2 flex flex-col justify-center items-center">
      <div className="flex gap-2">
        <h1 className="text-3xl">MySonex</h1>
        <span>Login</span>
      </div>

      <div className="w-[380px] h-[380px] rounded-md p-4 ">
        {formError && (
          <div className="bg-red-500 text-white p-2 rounded-md mb-4">
            {formError}
          </div>
        )}
        <form
          onSubmit={handleSubmitLogin}
          className="flex flex-col gap-4 items-center"
        >
          <Input
            required
            type="text"
            name="credential"
            variant="underlined"
            label="Username or Email"
            value={formData.credential}
            onChange={handleInputChange}
            startContent={<Mail />}
          />
          <Input
            required
            type="password"
            variant="underlined"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            startContent={<RectangleEllipsis />}
          />
          <Link
            to="/forgot-password"
            className="text-xs text-center text-blue-500 underline"
          >
            Forgot Password?
          </Link>
          <br />
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-xs text-right hover:underline transition-all duration-300">
            <Link to="/register">No account? Sign Up</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
