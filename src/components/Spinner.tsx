import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="w-full h-[150px] text-center flex items-center justify-center ">
      <Loader2 className=" animate-spin h-[150px] w-[150px]" />
    </div>
  );
}
