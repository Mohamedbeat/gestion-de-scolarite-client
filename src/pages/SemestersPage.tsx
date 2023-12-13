import AddSectionDialog from "@/components/AddSectionDialog";
import AddSemesterDialog from "@/components/AddSemesterDialog";
import DeleteSectionDialog from "@/components/DeleteSectionDialog";
import DeleteSemesterDialog from "@/components/DeleteSemesterDialog";
import EditSectionDialog from "@/components/EditSectionDialog";
import EditSemesterDialog from "@/components/EditSemesterDialog";
import LeftPageTitleAndContainer from "@/components/LeftPageTitleAndContainer";
import Spinner from "@/components/Spinner";
import { useTheme } from "@/components/theme-provider";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { API_URL } from "@/utils/config";
import axios from "axios";
import { Edit2, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

export interface semesterDto {
  _id: string;
  sectionCode: string;
  semesterCode: string;
  semesterTitle: string;
  successfulStudents: number;
  failedStudents: number;
  __v: number;
}

export default function SemestersPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const { theme } = useTheme();

  const [semestersData, setSemesterDate] = useState<semesterDto[]>();

  useEffect(() => {
    const getSemestersData = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`${API_URL}/semesters`, {
          withCredentials: true,
        });

        setSemesterDate(res.data.data);
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

    getSemestersData();
  }, []);

  return (
    <ScrollArea>
      <LeftPageTitleAndContainer title="Semester">
        {isLoading && <Spinner />}
        {semestersData && semestersData.length !== 0 && (
          <>
            <div className="w-full flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> Add a semester
                  </Button>
                </DialogTrigger>
                <AddSemesterDialog />
                {/* <AddSpecialityDialog specialitiesData={specialitiesData} /> */}
              </Dialog>
            </div>

            <Table className="h-[400px]">
              <TableCaption>A list of your sections.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">semester code</TableHead>
                  <TableHead>Section code</TableHead>
                  <TableHead>Successful students</TableHead>
                  <TableHead>Failed students</TableHead>
                  <TableHead>Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {semestersData?.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className={`${
                      theme === "light"
                        ? "hover:bg-slate-200"
                        : "hover:bg-slate-700"
                    } `}
                  >
                    <TableCell className="font-medium">
                      {item.semesterCode}
                    </TableCell>
                    <TableCell>{item.sectionCode}</TableCell>
                    <TableCell>{item.successfulStudents}</TableCell>
                    <TableCell>{item.failedStudents}</TableCell>

                    <TableCell>
                      <div className="w-full flex justify-around">
                        {/* edit speciality btn */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Edit2 />
                            </Button>
                          </DialogTrigger>
                          <EditSemesterDialog
                            id={item._id}
                            item={item}
                            index={index}
                            semestersData={semestersData}
                          />
                        </Dialog>
                        {/* delete speciality btn */}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant={"destructive"}>
                              <Trash />
                            </Button>
                          </AlertDialogTrigger>
                          <DeleteSemesterDialog
                            url={`${API_URL}/semesters/${item._id}`}
                            item={item}
                          />
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
