import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loader from "../../components/misc/Loader";
import axios from "axios";

const API_URL = "http://localhost:4000/api/auth/session/register";

const Signup = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    agreesToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // State for password visibility
  const [isVisible, setIsVisible] = useState(false);
  const togglePasswordVisibility = () => setIsVisible(!isVisible);

  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  const navigate = useNavigate();

  // handle form errors in real-time
  useEffect(() => {
    const errors = {};

    if (formData.username.length < 6 || formData.username.length > 20) {
      errors.username = "Username must be between 6 and 20 characters.";
    }

    if (formData.password.length < 4 || formData.password.length > 20) {
      errors.password = "Password must be between 4 and 20 characters.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
    }
  }, [formData.username, formData.password]);

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmitSignup(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    axios
      .post(API_URL, formData)
      .then((response) => {
        if (response.data.error) {
          window.alert(response.data.error);
          return;
        }

        // On successful signup
        navigate(`/register?success=true`, {
          state: { message: "Signup Successful! Welcome to MySonex!" },
        });

        setTimeout(() => {
          navigate("/login", {
            state: {
              message: `Welcome to MySonex ${formData.firstName}! You may now login.`,
            },
          });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        window.alert("Signup failed. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  }

  return <p>Signup</p>;
};

export default Signup;

// (
//   <div className="flex flex-col items-center justify-center w-full mx-auto translate-y-1/2">
//       <div className="flex gap-2">
//         <h1 className="text-3xl">MySonex</h1> <span>Signup</span>
//       </div>

//       {success === "true" ? (
//         <p className="text-green-500">Signup Successful! Welcome to MySonex!</p>
//       ) : success === "false" ? (
//         <p className="text-red-500">Signup Failed. Please try again.</p>
//       ) : (
//         <p>Signup for a FREE Account and Start using MySonex!</p>
//       )}

//       <div className="w-[380px] h-[380px] rounded-md">
//         <form
//           onSubmit={handleSubmitSignup}
//           className="flex flex-col items-center gap-4"
//         >
//           <Input
//             required
//             type="text"
//             name="firstName"
//             variant="underlined"
//             label="First Name"
//             value={formData.firstName}
//             onChange={handleInputChange}
//           />
//           <Input
//             type="text"
//             name="lastName"
//             variant="underlined"
//             label="Last Name"
//             value={formData.lastName}
//             onChange={handleInputChange}
//           />
//           <Input
//             required
//             type="email"
//             name="email"
//             variant="underlined"
//             label="Email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <Input
//             required
//             type="text"
//             name="username"
//             variant="underlined"
//             label="Username"
//             value={formData.username}
//             onChange={handleInputChange}
//           />
//           {formErrors?.username && (
//             <span className="text-sm text-red-500">{formErrors.username}</span>
//           )}
//           <Input
//             required
//             type={isVisible ? "text" : "password"}
//             name="password"
//             variant="underlined"
//             label="Password"
//             value={formData.password}
//             onChange={handleInputChange}
//             endContent={
//               <button
//                 className="focus:outline-none"
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 aria-label="toggle password visibility"
//               >
//                 {isVisible ? <EyeOff /> : <Eye />}
//               </button>
//             }
//           />
//           {formErrors?.password && (
//             <span className="text-sm text-red-500">{formErrors.password}</span>
//           )}
//           <Checkbox
//             isSelected={formData.agreesToTerms}
//             value={formData.agreesToTerms}
//             onChange={handleInputChange}
//             name="agreesToTerms"
//           >
//             By creating an account, you agree to Sonex terms and Stripe's Terms
//             and Conditions
//           </Checkbox>
//           <Button
//             type="submit"
//             fullWidth
//             isDisabled={
//               Object.keys(formErrors).length > 0 ||
//               formData.agreesToTerms === false
//             }
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader /> Signing up...
//               </>
//             ) : (
//               "Signup"
//             )}
//           </Button>
//         </form>
//       </div>
//     </div>
// )
