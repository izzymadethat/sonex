import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3000);
  }, []);

  return (
    <main className="w-full mx-auto translate-y-1/2 flex flex-col justify-center items-center">
      <div className="flex gap-2">
        <h1 className="text-3xl">MySonex</h1>
        <span>Logout</span>
      </div>
      <div className="w-[380px] h-[380px] rounded-md  ">
        <p>You have successfully logged out!</p>
      </div>
    </main>
  );
};

export default Logout;
