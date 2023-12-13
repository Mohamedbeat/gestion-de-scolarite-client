import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";

const data = [
  {
    header: "Specialities",
    desc: "Take a look around your specialities",
  },
  {
    header: "Sections",
    desc: "Check whats going in your sections ",
  },
  {
    header: "Students",
    desc: "Manage your students",
  },
  {
    header: "Marks",
    desc: "Keep up",
  },
];

export default function WelcomePage() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <ScrollArea>
        <div className="w-full flex flex-col items-start justify-center">
          <h1 className="text-2xl font-bold">Welcome {user?.username}!</h1>
        </div>
        <div className="w-full flex flex-col items-start justify-center mt-6">
          <h1 className="text-lg ">Start by taking a look around:</h1>
        </div>
        <div className="flex w-full items-center justify-center">
          <div
            className="w-[80%] grid grid-cols-2 grid-rows-2  gap-4 mt-6"
            // className="w-full flex flex-row flex-wrap items-center justify-center gap-4 mt-6"
          >
            {data.map((item) => {
              return (
                <Link
                  key={item.header}
                  className="flex-1 transition-all hover:translate-y-[-5px]"
                  to={`/${item.header.toLowerCase()}`}
                >
                  <Card className="p-2 transition-all    border border-gray-300">
                    <CardHeader className="p-2 font-semibold">
                      {item.header}
                    </CardHeader>
                    <CardDescription className="px-4">
                      {item.desc}
                    </CardDescription>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
