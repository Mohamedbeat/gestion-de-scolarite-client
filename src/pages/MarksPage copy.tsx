import LeftPageTitleAndContainer from "@/components/LeftPageTitleAndContainer";
import { useTheme } from "@/components/theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Plus, Trash } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { API_URL } from "@/utils/config";
import Spinner from "@/components/Spinner";
import EditMarkDialog from "@/components/EditMarkDialog";

export interface markDto {
  _id: string;
  moduleCode: string;
  registerationNumber: string;
  semesterCode: string;
  controlOne: number;
  controlTwo: number;
  exam: number;
  passage: number;
  moduleAverage: number;
}

export default function MarksPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const { theme } = useTheme();

  const [marksData, setMarksData] = useState<markDto[]>();

  useEffect(() => {
    const getMarksData = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`${API_URL}/marks`, {
          withCredentials: true,
        });

        setMarksData(res.data.data);

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

    getMarksData();
  }, []);
  return (
    <ScrollArea>
      <LeftPageTitleAndContainer title="Marks">
        {isLoading && <Spinner />}
        {marksData && marksData.length !== 0 && (
          <>
            <div className="w-full flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> Add a mark
                  </Button>
                </DialogTrigger>
                {/* <AddModuleDialog /> */}
                {/* <AddSemesterDialog /> */}
              </Dialog>
            </div>

            <Table className="h-[400px]">
              <TableCaption>A list of your marks.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>registeration number</TableHead>
                  <TableHead>module code</TableHead>
                  <TableHead>semester code</TableHead>
                  <TableHead>control one</TableHead>
                  <TableHead>control two</TableHead>
                  <TableHead>exam</TableHead>
                  <TableHead>passage</TableHead>
                  <TableHead>module average</TableHead>
                  <TableHead>Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marksData?.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className={`${
                      theme === "light"
                        ? "hover:bg-slate-200"
                        : "hover:bg-slate-700"
                    } `}
                  >
                    <TableCell className="font-medium">
                      {item.registerationNumber}
                    </TableCell>
                    <TableCell>{item.moduleCode}</TableCell>
                    <TableCell>{item.semesterCode}</TableCell>
                    <TableCell>{item.controlOne}</TableCell>
                    <TableCell>{item.controlTwo}</TableCell>
                    <TableCell>{item.exam}</TableCell>
                    <TableCell>{item.passage}</TableCell>
                    <TableCell>{item.moduleAverage}</TableCell>

                    <TableCell>
                      <div className="w-full flex justify-around">
                        {/* edit speciality btn */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Edit2 />
                            </Button>
                          </DialogTrigger>
                          <EditMarkDialog
                            item={item}
                            index={index}
                            marksData={marksData}
                          />
                        </Dialog>
                        {/* delete speciality btn */}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant={"destructive"}>
                              <Trash />
                            </Button>
                          </AlertDialogTrigger>
                          {/* <DeleteModuleDialog
                            url={`${API_URL}/modules/${item._id}`}
                            item={item}
                          /> */}
                          {/* <DeleteSemesterDialog
                          /> */}
                          {/* <DeleteSectionDialog
                            item={item}
                            index={index}
                            sectionsData={sectionsData}
                          /> */}
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
            </Table>
          </>
        )}
      </LeftPageTitleAndContainer>
    </ScrollArea>
  );
}
