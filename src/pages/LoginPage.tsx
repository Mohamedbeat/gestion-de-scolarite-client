import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const { user, login } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  if (user) {
    navigate("/");
  }

  const handleSumbit = (e: Event) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="w-full flex items-center justify-center h-[100vh]">
      <div className="w-[1280px] flex items-center justify-center">
        <div className="w-[30vw] flex flex-col items-center justify-center gap-9">
          {/* Page title */}
          <div className="w-full font-semibold flex items-center justify-start text-xl">
            <h1>Login Page</h1>
          </div>
          {/* username input */}
          <div className="w-full px-3">
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* password input */}
          <div className="w-full px-3">
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* password input */}
          <div className="w-full px-3 flex items-center justify-end">
            <Button onClick={(e) => handleSumbit(e)}>Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
