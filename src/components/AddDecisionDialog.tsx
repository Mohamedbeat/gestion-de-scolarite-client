import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { specialityDto } from "@/pages/SpecialityPage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { API_URL } from "@/utils/config";
import { Plus } from "lucide-react";
import { sectionDto } from "@/pages/SectionsPage";
import { semesterDto } from "@/pages/SemestersPage";
import { studentsDto } from "@/pages/StudentsPage";

export default function AddDecisionDialog() {
  //

  const [semesterCode, setsemesterCode] = useState<string>("");
  const [registerationNumber, setregisterationNumber] = useState<string>("");

  //
  const [semestersData, setSemestersData] = useState<semesterDto[]>();
  const [studentsData, setstudentsData] = useState<studentsDto[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  useEffect(() => {
    const getsemestersData = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`${API_URL}/semesters`, {
          withCredentials: true,
        });

        setSemestersData(res.data.data);
        setIsLoading(false);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.response.data.message,
        });
        setIsLoading(false);
      }
    };
    const getstudentsData = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`${API_URL}/students`, {
          withCredentials: true,
        });

        setstudentsData(res.data.data);
        console.log(res.data.data);

        setIsLoading(false);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.response.data.message,
        });
        setIsLoading(false);
      }
    };
    getstudentsData();
    getsemestersData();
  }, []);

  const handleClick = async () => {
    const data = {
      semesterCode,
      registerationNumber,
    };
    console.log(data);

    try {
      const res = await axios.post(`${API_URL}/decisions/new`, data, {
        withCredentials: true,
      });

      toast({
        title: res.data.message,
      });
      location.reload();
    } catch (error: any) {
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

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add decision</DialogTitle>
        {/* <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription> */}
      </DialogHeader>
      <div className="flex flex-col items-start space-x-2">
        <div className="w-full">
          <Label htmlFor="registerationNumber" className="">
            registeration number
          </Label>
          <Select
            name="registerationNumber"
            value={registerationNumber}
            onValueChange={setregisterationNumber}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={registerationNumber} />
            </SelectTrigger>
            <SelectContent>
              {/* 4AM,1AS,2AS,3AS */}
              {studentsData?.map((item) => {
                return (
                  <SelectItem key={item._id} value={item.registerationNumber}>
                    {item.registerationNumber}
                  </SelectItem>
                );
              })}
              {/* <SelectItem value="1AS">1AS</SelectItem>
              <SelectItem value="2AS">2AS</SelectItem>
              <SelectItem value="3AS">3AS</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Label htmlFor="semesterCode" className="">
            semester code
          </Label>
          <Select
            name="semesterCode"
            value={semesterCode}
            onValueChange={setsemesterCode}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={semesterCode} />
            </SelectTrigger>
            <SelectContent>
              {/* 4AM,1AS,2AS,3AS */}
              {semestersData?.map((item) => {
                return (
                  <SelectItem key={item._id} value={item.semesterCode}>
                    {item.semesterCode}
                  </SelectItem>
                );
              })}
              {/* <SelectItem value="1AS">1AS</SelectItem>
              <SelectItem value="2AS">2AS</SelectItem>
              <SelectItem value="3AS">3AS</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button type="submit" size="sm" className="px-3" onClick={handleClick}>
          <Plus /> Add
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
