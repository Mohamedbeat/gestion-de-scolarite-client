import { useContext, useState } from "react";
import {
  BookMarked,
  GraduationCap,
  Users,
  LibraryBig,
  CalendarRange,
  FileBarChart2,
  LogOut,
} from "lucide-react";
import SideMenuToggle from "./SideMenuToggle";
import { AuthContext } from "@/providers/AuthProvider";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

const menuItems = [
  {
    title: "Specialities",
    Icon: <BookMarked />,
  },
  {
    title: "Sections",
    Icon: <GraduationCap />,
  },
  {
    title: "Semesters",
    Icon: <CalendarRange />,
  },
  {
    title: "Modules",
    Icon: <LibraryBig />,
  },
  {
    title: "Students",
    Icon: <Users />,
  },
  {
    title: "Marks",
    Icon: <FileBarChart2 />,
  },
  {
    title: "Decisions",
    Icon: <FileBarChart2 />,
  },
];
export default function SideMenu() {
  const [clickMenu, setClickMenu] = useState<string>("");
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="flex-1 flex flex-col items-start px-4 gap-4 ">
      <div className="flex flex-col w-full items-center justify-center">
        <h1 className="text-2xl font-bold  ">School Management</h1>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4 px-12">
        <div className="w-full flex justify-between items-center">
          <h3>User: {user?.username} </h3> <ModeToggle />
        </div>
        {menuItems.map((item, index) => {
          return (
            <SideMenuToggle
              key={index}
              setClickMenu={setClickMenu}
              clickMenu={clickMenu}
              keyValue={item.title}
              title={item.title}
              Icon={item.Icon}
            />
          );
        })}
        <Button
          variant={"destructive"}
          className={`w-full flex gap-4 items-start justify-start border
      border-gray-300 rounded-sm py-2 px-3 transition-all
       
       hover:pl-6 `}
          //  hover:bg-gray-950 hover:text-white
          // bg-gray-950 text-white pl-6

          onClick={() => logout()}
        >
          <LogOut />
          <h3 className="font-semibold"> Logout </h3>
        </Button>
      </div>
    </div>
  );
}
