import { ReactNode } from "react";
import { Link } from "react-router-dom";
interface setClickMenuInt {
  (title: string): void;
}

export default function SideMenuToggle({
  keyValue,
  Icon,
  title,
  clickMenu,
  setClickMenu,
}: {
  keyValue: string;
  Icon: ReactNode;
  title: string;
  clickMenu: string;
  setClickMenu: setClickMenuInt;
}) {
  return (
    <Link
      to={`/${title.toLowerCase()}`}
      key={keyValue}
      className={`w-full flex gap-4 items-start justify-start border
      border-gray-300 rounded-sm py-2 px-3 transition-all hover:bg-gray-950 hover:text-white ${
        clickMenu === title && "bg-gray-950 text-white pl-6"
      } hover:pl-6 `}
      onClick={() => setClickMenu(title)}
    >
      {Icon}
      <h3 className="font-semibold"> {title} </h3>
    </Link>
  );
}
