import { specialityDto } from "@/pages/SpecialityPage";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Trash } from "lucide-react";
import { studentsDto } from "@/pages/StudentsPage";

export default function DeleteStudentDialog({
  url,
  item,
}: {
  url: string;
  item: studentsDto;
}) {
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      const res = await axios.delete(url, { withCredentials: true });

      toast({
        variant: "default",
        title: res.data.message,
      });

      // specialitiesData.splice(index, 1);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response.data.message,
      });
    }
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be <b>undone</b>. This will <b>permanently </b>
          delete the item from data. <br />
          Item: <b> {item.registerationNumber}</b>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          onClick={handleClick}
        >
          <Trash /> Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
