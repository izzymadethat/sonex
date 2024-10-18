import { Link, useNavigate } from "react-router-dom";
import { Mail, RectangleEllipsis } from "lucide-react";
import { useState } from "react";
import Loader from "../../components/misc/Loader";
import axios from "axios";

const API_URL = "http://localhost:4000/api/auth/session";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ credential: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmitLogin(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    axios
      .post(API_URL, formData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.accessToken);
          window.alert(
            `Login successful! Welcome back, ${response.data.user.firstName}!`
          );
          navigate("/user/@me");
        }
      })
      .catch((error) => {
        window.alert("Login failed. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  }

  return <p>Login</p>;
};

export default Login;

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
