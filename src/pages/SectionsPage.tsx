import AddSectionDialog from "@/components/AddSectionDialog";

import DeleteSectionDialog from "@/components/DeleteSectionDialog";

import EditSectionDialog from "@/components/EditSectionDialog";
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
import { useEffect, useState } from "react";

export interface sectionDto {
  _id: string;
  sectionCode: string;
  specialityid: string;
  specialityTitle: string;
  startDate: Date;
  endDate: Date;
  studentsNumber: number;
  maleStudentsNumber: number;
  femaleStudentsNumber: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export default function SectionsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sectionsData, setSectionsData] = useState<sectionDto[] | null>(null);

  const { toast } = useToast();

  const { theme } = useTheme();

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

  return (
    <ScrollArea>
      <LeftPageTitleAndContainer title="Sections">
        {isLoading && <Spinner />}
        {sectionsData && sectionsData.length !== 0 && (
          <>
            <div className="w-full flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> Add a section
                  </Button>
                </DialogTrigger>
                <AddSectionDialog />
                {/* <AddSpecialityDialog specialitiesData={specialitiesData} /> */}
              </Dialog>
            </div>

            <Table>
              <TableCaption>A list of your sections.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Section code</TableHead>
                  <TableHead>Speciality title</TableHead>
                  <TableHead>Start date</TableHead>
                  <TableHead>End date</TableHead>
                  <TableHead>Students number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectionsData?.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className={`${
                      theme === "light"
                        ? "hover:bg-slate-200"
                        : "hover:bg-slate-700"
                    } `}
                  >
                    <TableCell className="font-medium">
                      {item.sectionCode}
                    </TableCell>
                    <TableCell>{item.specialityTitle}</TableCell>
                    <TableCell>
                      {new Date(item.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(item.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{item.studentsNumber}</TableCell>

                    <TableCell>
                      <div className="w-full flex justify-around">
                        {/* edit speciality btn */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Edit2 />
                            </Button>
                          </DialogTrigger>
                          <EditSectionDialog
                            id={item._id}
                            item={item}
                            index={index}
                            sectionsData={sectionsData}
                          />
                        </Dialog>
                        {/* delete speciality btn */}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant={"destructive"}>
                              <Trash />
                            </Button>
                          </AlertDialogTrigger>
                          <DeleteSectionDialog
                            url={`${API_URL}/sections/${item._id}`}
                            item={item}
                            index={index}
                            sectionsData={sectionsData}
                          />
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
        {sectionsData?.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center text-center">
            <h1 className="font-bold text-[30px]">No data to show...</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus /> Add a section
                </Button>
              </DialogTrigger>
              <AddSectionDialog />
            </Dialog>
          </div>
        )}
      </LeftPageTitleAndContainer>
    </ScrollArea>
  );
}
