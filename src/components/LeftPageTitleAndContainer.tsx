import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { ReactNode } from "react";

export default function LeftPageTitleAndContainer({
  children,
  title,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col w-full py-7">
      {/* Page title */}
      <div className="flex align-baseline gap-4 items-center justify-start border-b-[1px] pb-2 ">
        <Link className=" p-1 transition-all hover:translate-x-[-4px]" to={"/"}>
          <ArrowLeft />
        </Link>
        <h1 className="text-xl font-semibold">{title} page</h1>
      </div>
      <div className="w-[900px] flex flex-col pb-[10px] py-4 ">{children}</div>
    </div>
  );
}
