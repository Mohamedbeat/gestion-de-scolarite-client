import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
  access_token: string;
}

interface AuthContextInterface {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/login", //http://192.168.100.7:
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      setUser(res.data.data);
      console.log(user);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      toast({
        variant: "default",
        title: "Welcome",
        description: res.data.message,
      });
    } catch (error) {
      console.log(error);
      if (error.response.data.errors) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.response.data.errors[0].msg,
        });
      } else if (error.response.data) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.response.data.message,
        });
      }
    }
  };
  const logout = async (): Promise<void> => {
    try {
      const res = await axios.post("http://127.0.0.1:3000/api/v1/users/logout");
      console.log(res);
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const savedUser: User | null = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
