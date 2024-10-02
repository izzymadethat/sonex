import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleLogout() {
      try {
        const response = await fetch("http://localhost:8000/api/auth/session", {
          credentials: "include",
          method: "DELETE",
        });

        if (response.ok) {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleLogout();
  }, []);

  return (
    <main className="w-full mx-auto translate-y-1/2 flex flex-col justify-center items-center">
      <div className="flex gap-2">
        <h1 className="text-3xl">MySonex</h1>
        <span>Logout</span>
      </div>
      <div className="w-[380px] h-[380px] rounded-md  ">
        <p>You have successfully logged out!</p>
        <p>Redirecting to login page...</p>
      </div>
    </main>
  );
};

export default Logout;
