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

export default function AddModuleDialog() {
  //
  const [moduleCode, setmoduleCode] = useState<string>("");
  const [moduleTitle, setmoduleTitle] = useState<string>("");
  const [semesterCode, setsemesterCode] = useState<string>("");
  const [specialityid, setspecialityid] = useState<string>("");
  const [teacher, setteacher] = useState<string>("");
  const [moduleCoef, setmoduleCoef] = useState<number>();
  const [eleminationPoint, seteleminationPoint] = useState<number>();
  //
  const [semestersData, setSemestersData] = useState<semesterDto[]>();
  const [specialitiesData, setSpecialitiesData] = useState<specialityDto[]>();
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
    const getSpecialitiesData = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`${API_URL}/specialities`, {
          withCredentials: true,
        });

        setSpecialitiesData(res.data.data);
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
    getSpecialitiesData();
    getsemestersData();
  }, []);

  const handleClick = async () => {
    const data = {
      moduleCode,
      moduleTitle,
      semesterCode,
      specialityid,
      teacher,
      moduleCoef,
      eleminationPoint,
    };
    console.log(data);

    try {
      const res = await axios.post(`${API_URL}/modules/new`, data, {
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
        <DialogTitle>Add module</DialogTitle>
        {/* <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription> */}
      </DialogHeader>
      <div className="flex flex-col items-start space-x-2">
        <div className="w-full">
          <Label htmlFor="moduleCode" className="">
            module code
          </Label>
          <Input
            id="moduleCode"
            name="moduleCode"
            defaultValue={moduleCode}
            onChange={(e) => setmoduleCode(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="moduleTitle" className="">
            module title
          </Label>
          <Input
            id="moduleTitle"
            name="moduleTitle"
            defaultValue={moduleTitle}
            onChange={(e) => setmoduleTitle(e.target.value)}
          />
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          {/* <Label htmlFor="sectionCode" className="">
            Section code
          </Label>
          <Input
            id="sectionCode"
            name="sectionCode"
            defaultValue={sectionCode}
            onChange={(e) => setSectionCode(e.target.value)}
          /> */}
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
        <div className="w-full">
          <Label htmlFor="specialityCode" className="">
            speciality code
          </Label>
          <Select
            name="specialityCode"
            value={specialityid}
            onValueChange={setspecialityid}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={specialityid} />
            </SelectTrigger>
            <SelectContent>
              {/* 4AM,1AS,2AS,3AS */}
              {specialitiesData?.map((item) => {
                return (
                  <SelectItem key={item._id} value={item._id}>
                    {item.specialityCode}
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
          <Label htmlFor="teacher" className="">
            teacher
          </Label>
          <Input
            id="teacher"
            name="teacher"
            defaultValue={teacher}
            onChange={(e) => setteacher(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="moduleCoef" className="">
            module coef
          </Label>
          <Input
            id="moduleCoef"
            name="moduleCoef"
            type="number"
            defaultValue={moduleCoef}
            onChange={(e) => setmoduleCoef(parseInt(e.target.value))}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="eleminationPoint" className="">
            elemination point
          </Label>
          <Input
            id="eleminationPoint"
            name="eleminationPoint"
            type="number"
            defaultValue={eleminationPoint}
            onChange={(e) => seteleminationPoint(parseInt(e.target.value))}
          />
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
