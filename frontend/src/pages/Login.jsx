import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Lock, Mail, RectangleEllipsis } from "lucide-react";

const Login = () => {
  return (
    <main className="w-full mx-auto translate-y-1/2 flex flex-col justify-center items-center">
      <div className="flex gap-2">
        <h1 className="text-3xl">MySonex</h1>
        <span>Login</span>
      </div>
      <div className="w-[380px] h-[380px] rounded-md p-4 ">
        <form className="flex flex-col gap-4 items-center">
          <Input
            type="text"
            name="credential"
            variant="underlined"
            label="Username or Email"
            startContent={<Mail />}
          />
          <Input
            type="password"
            variant="underlined"
            label="Password"
            name="password"
            startContent={<RectangleEllipsis />}
          />
          <Link
            to="/forgot-password"
            className="text-xs text-center text-blue-500"
          >
            Forgot Password?
          </Link>{" "}
          <br />
          <Button type="submit" fullWidth>
            Login
          </Button>
          <p className="text-xs text-right">
            No account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
