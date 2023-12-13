import { useContext, useEffect } from "react";
import SideMenu from "./SideMenu";
import { AuthContext } from "@/providers/AuthProvider";
import LoginPage from "@/pages/LoginPage";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, []);
  return (
    <div className="w-[1280px] p-5 flex  justify-between ">
      <SideMenu />
      <div className="flex-[3]">{children}</div>
    </div>
  );
}
