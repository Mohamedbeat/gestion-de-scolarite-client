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

export default function EditSemesterDialog({
  id,
  item,
  index,
  semestersData,
}: {
  id: string;
  item: semesterDto;
  index: number;
  semestersData: semesterDto[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [semesterTitle, setSemestertitle] = useState<string>(
    item.semesterTitle
  );
  // const [semesterCode, setsemesterCode] = useState<string>(
  //   item.semesterCode
  // );
  const [sectionCode, setSectionCode] = useState<string>(item.sectionCode);
  const [sectionsData, setSectionsData] = useState<sectionDto[]>();

  useEffect(() => {
    const getSectionsData = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`${API_URL}/sections`, {
          withCredentials: true,
        });

        setSectionsData(res.data.data);
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

    getSectionsData();
  }, []);
  const { toast } = useToast();

  const handleEdit = async (id: string) => {
    // const newStartDate = fomratingDate(startDate);
    // const newEndDate = fomratingDate(endDate);
    const data = {
      sectionCode,
      semesterTitle,
      semesterCode: semesterTitle.trim() + "-" + sectionCode,
    };

    try {
      const res = await axios.put(`${API_URL}/semesters/${id}`, data, {
        withCredentials: true,
      });
      console.log(res);

      toast({
        title: res.data.message,
      });
      // sectionsData[index].specialityTitle = data.specialityTitle;
      semestersData[index].sectionCode = data.sectionCode;
      semestersData[index].semesterTitle = data.sectionCode;
      semestersData[index].semesterCode = data.semesterCode;
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
        <DialogTitle>Edit section</DialogTitle>
        {/* <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription> */}
      </DialogHeader>
      <div className="flex flex-col items-start space-x-2">
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
          <Label htmlFor="sectionCode" className="">
            Section code
          </Label>
          <Select
            name="sectionCode"
            value={sectionCode}
            onValueChange={setSectionCode}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={sectionCode} />
            </SelectTrigger>
            <SelectContent>
              {/* 4AM,1AS,2AS,3AS */}
              {sectionsData?.map((item) => {
                return (
                  <SelectItem key={item._id} value={item.sectionCode}>
                    {item.sectionCode}
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
          <Label htmlFor="semesterTitle" className="">
            Semester title
          </Label>
          <Input
            id="semesterTitle"
            name="semesterTitle"
            defaultValue={semesterTitle}
            onChange={(e) => setSemestertitle(e.target.value)}
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
          onClick={() => handleEdit(item._id)}
        >
          Edit
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
