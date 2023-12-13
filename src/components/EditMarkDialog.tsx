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
import { API_URL, fomratingDate } from "@/utils/config";
import { sectionDto } from "@/pages/SectionsPage";
import { semesterDto } from "@/pages/SemestersPage";
import { moduleDto } from "@/pages/ModulesPage";
import { markDto } from "@/pages/MarksPage";

export default function EditMarkDialog({
  item,
  index,
  marksData,
}: {
  item: markDto;
  index: number;
  marksData: markDto[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerationNumber, setregisterationNumber] = useState<string>(
    item.registerationNumber
  );
  const [moduleCode, setmoduleCode] = useState<string>(item.moduleCode);
  const [semesterCode, setsemesterCode] = useState<string>(item.semesterCode);
  const [controlOne, setcontrolOne] = useState<number>(item.controlOne);
  const [controlTwo, setcontrolTwo] = useState<number>(item.controlTwo);
  const [exam, setexam] = useState<number>(item.exam);
  const [passage, setpassage] = useState<number>(item.passage);
  // const [moduleAverage, setmoduleAverage] = useState<number>(
  //   item.moduleAverage
  // );

  const [semestersData, setSemestersData] = useState<semesterDto[]>();
  const [specialitiesData, setSpecialitiesData] = useState<specialityDto[]>();

  const { toast } = useToast();

  const handleEdit = async () => {
    // const newStartDate = fomratingDate(startDate);
    // const newEndDate = fomratingDate(endDate);
    const data = {
      registerationNumber,
      moduleCode,
      semesterCode,
      controlOne,
      controlTwo,
      exam,
      passage,
    };
    console.log(data);

    try {
      const res = await axios.put(`${API_URL}/marks`, data, {
        withCredentials: true,
      });
      console.log(res);

      toast({
        title: res.data.message,
      });
      marksData[index].controlOne = data.controlOne;
      marksData[index].controlTwo = data.controlTwo;
      marksData[index].exam = data.exam;
      marksData[index].passage = data.passage;
      marksData[index].moduleAverage =
        (data.controlOne + data.controlTwo + data.exam) / 4;
      if (marksData[index].moduleAverage < 10 && data.exam < data.passage) {
        marksData[index].moduleAverage =
          (data.controlOne + data.controlTwo + data.passage) / 4;
      }

      // var moduleAverage = (controlOne + controlTwo + exam) / 4;

      // if (moduleAverage < 10 && exam < passage) {
      //   moduleAverage = (controlOne + controlTwo + passage) / 4;
      // }
    } catch (error: any) {
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

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Edit marks</DialogTitle>
        {/* <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription> */}
      </DialogHeader>
      <div className="flex flex-col items-start space-x-2">
        <div className="w-full">
          <Label htmlFor="registerationNumber" className="">
            registeration number
          </Label>
          <Input
            id="registerationNumber"
            disabled={true}
            name="registerationNumber"
            defaultValue={registerationNumber}
            onChange={(e) => setregisterationNumber(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="moduleCode" className="">
            module code
          </Label>
          <Input
            id="moduleCode"
            disabled={true}
            name="moduleCode"
            defaultValue={moduleCode}
            onChange={(e) => setmoduleCode(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="semesterCode" className="">
            semester code
          </Label>
          <Input
            disabled={true}
            id="semesterCode"
            name="semesterCode"
            defaultValue={semesterCode}
            onChange={(e) => setsemesterCode(e.target.value)}
          />
        </div>

        <div className="w-full">
          <Label htmlFor="controlOne" className="">
            control one
          </Label>
          <Input
            id="controlOne"
            name="controlOne"
            defaultValue={controlOne}
            onChange={(e) => setcontrolOne(parseFloat(e.target.value))}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="controlTwo" className="">
            control two
          </Label>
          <Input
            id="controlTwo"
            name="controlTwo"
            defaultValue={controlTwo}
            onChange={(e) => setcontrolTwo(parseFloat(e.target.value))}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="exam" className="">
            exam
          </Label>
          <Input
            id="exam"
            name="exam"
            type="number"
            defaultValue={exam}
            onChange={(e) => setexam(parseFloat(e.target.value))}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="passage" className="">
            passage
          </Label>
          <Input
            id="passage"
            name="passage"
            type="number"
            defaultValue={passage}
            onChange={(e) => setpassage(parseInt(e.target.value))}
          />
        </div>
      </div>
      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button
          type="submit"
          size="sm"
          className="px-3"
          onClick={() => handleEdit()}
        >
          Edit
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
