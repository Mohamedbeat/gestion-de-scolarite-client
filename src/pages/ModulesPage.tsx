import LeftPageTitleAndContainer from "@/components/LeftPageTitleAndContainer";
import Spinner from "@/components/Spinner";
import { useTheme } from "@/components/theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { API_URL } from "@/utils/config";
import axios from "axios";
import { useEffect, useState } from "react";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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
import AddModuleDialog from "@/components/AddModuleDialog";
import EditModuleDialog from "@/components/EditModuleDialog";
import DeleteModuleDialog from "@/components/DeleteModuleDialog";

export interface moduleDto {
  _id: string;
  moduleCode: string;
  semesterCode: string;
  moduleTitle: string;
  moduleCoef: number;
  eleminationPoint: number;
  teacher: string;
  specialityid: string;
  specialityCode: string;
  __v: 0;
}

export default function ModulesPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const { theme } = useTheme();

  const [modulesData, setModulesDate] = useState<moduleDto[]>();
  const getSemestersData = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(`${API_URL}/modules`, {
        withCredentials: true,
      });

      setModulesDate(res.data.data);

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
  useEffect(() => {
    getSemestersData();
  }, []);

  const filterData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const res = await axios.get(`${API_URL}/semesters?`, {
        withCredentials: true,
      });

      setModulesDate(res.data.data);
      setIsLoading(false);
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

  const resetFilters = () => {
    // setSectionCodeFilter("");

    getSemestersData();
  };
  return (
    <ScrollArea>
      <LeftPageTitleAndContainer title="Modules">
        {isLoading && <Spinner />}
        {modulesData && modulesData.length !== 0 && (
          <>
            <div className="w-full flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> Add a module
                  </Button>
                </DialogTrigger>
                <AddModuleDialog />
                {/* <AddSemesterDialog /> */}
              </Dialog>
            </div>

            <Table className="h-[400px]">
              <TableCaption>A list of your modules.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">module code</TableHead>
                  <TableHead className="">semester code</TableHead>
                  <TableHead>module title</TableHead>
                  <TableHead>module coef</TableHead>
                  <TableHead>elemination point</TableHead>
                  <TableHead>teacher</TableHead>
                  <TableHead>speciality code</TableHead>
                  <TableHead>Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modulesData?.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className={`${
                      theme === "light"
                        ? "hover:bg-slate-200"
                        : "hover:bg-slate-700"
                    } `}
                  >
                    <TableCell className="font-medium">
                      {item.moduleCode}
                    </TableCell>
                    <TableCell>{item.semesterCode}</TableCell>
                    <TableCell>{item.moduleTitle}</TableCell>
                    <TableCell>{item.moduleCoef}</TableCell>
                    <TableCell>{item.eleminationPoint}</TableCell>
                    <TableCell>{item.teacher}</TableCell>
                    <TableCell>{item.specialityCode}</TableCell>

                    <TableCell>
                      <div className="w-full flex justify-around">
                        {/* edit speciality btn */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Edit2 />
                            </Button>
                          </DialogTrigger>
                          <EditModuleDialog
                            id={item._id}
                            item={item}
                            index={index}
                            modulesData={modulesData}
                          />
                          {/* <EditSemesterDialog
                            id={item._id}
                            item={item}
                            index={index}
                            semestersData={semestersData}
                          /> */}
                        </Dialog>
                        {/* delete speciality btn */}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant={"destructive"}>
                              <Trash />
                            </Button>
                          </AlertDialogTrigger>
                          <DeleteModuleDialog
                            url={`${API_URL}/modules/${item._id}`}
                            item={item}
                          />
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
