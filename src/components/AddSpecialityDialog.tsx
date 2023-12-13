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
import { useState } from "react";
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

export default function AddSpecialityDialog() {
  const [specialityTitle, setSpecialityTitle] = useState<string>("");
  const [specialityCode, setSpecialityCode] = useState<string>("");
  const [requiredLevel, setRequiredLevel] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  const { toast } = useToast();

  const handleClick = async () => {
    const data = {
      specialityCode,
      specialityTitle,
      requiredLevel,
      duration,
    };

    try {
      const res = await axios.post(`${API_URL}/specialities/new`, data, {
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
        <DialogTitle>Add speciality</DialogTitle>
        {/* <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription> */}
      </DialogHeader>
      <div className="flex flex-col items-start space-x-2">
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="specialityTitle" className="">
            speciality title
          </Label>
          <Input
            id="specialityTitle"
            name="specialityTitle"
            defaultValue={specialityTitle}
            onChange={(e) => setSpecialityTitle(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="specialityCode" className="">
            Speciality code
          </Label>
          <Input
            id="specialityCode"
            name="specialityCode"
            defaultValue={specialityCode}
            onChange={(e) => setSpecialityCode(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="requiredLevel" className="">
            Required level
          </Label>
          <Select value={requiredLevel} onValueChange={setRequiredLevel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={requiredLevel} />
            </SelectTrigger>
            <SelectContent>
              {/* 4AM,1AS,2AS,3AS */}
              <SelectItem value="4AM">4AM</SelectItem>
              <SelectItem value="1AS">1AS</SelectItem>
              <SelectItem value="2AS">2AS</SelectItem>
              <SelectItem value="3AS">3AS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Label htmlFor="duration" className="">
            Duration
          </Label>
          <Input
            type="number"
            id="duration"
            name="duration"
            defaultValue={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
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
