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

export default function EditSectionDialog({
  id,
  item,
  index,
  sectionsData,
}: {
  id: string;
  item: sectionDto;
  index: number;
  sectionsData: sectionDto[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [specialityTitle, setSpecialityTitle] = useState<string>(
    item.specialityTitle
  );

  const [sectionCode, setSectionCode] = useState<string>(item.sectionCode);
  const newStartDate = fomratingDate(
    new Date(item.startDate).toLocaleDateString()
  );
  const newEndDate = fomratingDate(new Date(item.endDate).toLocaleDateString());
  // const newEndDate = fomratingDate(endDate);
  const [startDate, setStartDate] = useState<string>(newStartDate);
  const [endDate, setEndDate] = useState<string>(newEndDate);
  const [specialityid, setSpecialityid] = useState<string>(item.specialityid);
  const [specialitiesData, setSpecialitiesData] = useState<
    specialityDto[] | null
  >(null);

  useEffect(() => {
    const getspecialitiesData = async () => {
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
    getspecialitiesData();
  }, []);

  const { toast } = useToast();

  const handleEdit = async (id: string) => {
    // const newStartDate = fomratingDate(startDate);
    // const newEndDate = fomratingDate(endDate);
    const data = {
      specialityTitle,
      sectionCode,
      startDate,
      endDate,
      specialityid,
    };

    try {
      const res = await axios.put(`${API_URL}/sections/${id}`, data, {
        withCredentials: true,
      });

      toast({
        title: res.data.message,
      });
      // sectionsData[index].specialityTitle = data.specialityTitle;
      sectionsData[index].sectionCode = data.sectionCode;
      sectionsData[index].startDate = new Date(data.startDate);
      sectionsData[index].endDate = new Date(data.endDate);
      sectionsData[index].specialityid = data.specialityid;
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
        <DialogTitle>Edit section</DialogTitle>
        {/* <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription> */}
      </DialogHeader>
      <div className="flex flex-col items-start space-x-2">
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="sectionCode" className="">
            Section code
          </Label>
          <Input
            id="sectionCode"
            name="sectionCode"
            defaultValue={sectionCode}
            onChange={(e) => setSectionCode(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="startDate" className="">
            Start date
          </Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="endDate" className="">
            End date
          </Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="specialityid" className="">
            Speciality title
          </Label>
          <Select
            name="specialityid"
            value={specialityid}
            onValueChange={setSpecialityid}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={item.specialityTitle} />
            </SelectTrigger>
            <SelectContent>
              {/* 4AM,1AS,2AS,3AS */}
              {specialitiesData?.map((item) => {
                return (
                  <SelectItem key={item._id} value={item._id}>
                    {item.specialityTitle}
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
