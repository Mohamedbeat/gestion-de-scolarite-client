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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { API_URL } from "@/utils/config";
import axios from "axios";
import { Edit2, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const [sectionCodeFilter, setSectionCodeFilter] = useState<string>("");
  const [specialityTitleFilter, setSpecialityTitleFilter] =
    useState<string>("");
  const [studentNumberFilter, setStudentNumberFilter] = useState<number>(0);

  const { toast } = useToast();

  const { theme } = useTheme();

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
  useEffect(() => {
    getSectionsData();
  }, []);

  const filterData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const data = {
      sectionCode: sectionCodeFilter,
      specialityTitle: specialityTitleFilter,
      studentNumber: studentNumberFilter,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(`${API_URL}/sections/advancedSearch`, data, {
        withCredentials: true,
      });
      setSectionsData(res.data.data);
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
    setSectionCodeFilter("");
    setSpecialityTitleFilter("");
    setStudentNumberFilter(0);
    getSectionsData();
  };

  return (
    <ScrollArea>
      <LeftPageTitleAndContainer title="Sections">
        <div className="w-full flex justify-end">
          <Accordion type="single" collapsible className="w-full mr-6">
            <AccordionItem value="item-1">
              <AccordionTrigger>Filters</AccordionTrigger>
              <AccordionContent>
                <form action="">
                  <div className="mt-3">
                    <Label htmlFor="sectionCode" className="">
                      section code
                    </Label>
                    <Input
                      id="sectionCode"
                      name="sectionCode"
                      onChange={(e) => setSectionCodeFilter(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <Label htmlFor="specialityTitle" className="">
                      speciality title
                    </Label>
                    <Input
                      id="specialityTitle"
                      name="specialityTitle"
                      onChange={(e) => setSpecialityTitleFilter(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <Label htmlFor="studentsNumber" className="">
                      students number
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      id="studentsNumber"
                      name="studentsNumber"
                      onChange={(e) =>
                        setStudentNumberFilter(parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div className="mt-3 w-full flex justify-end gap-3">
                    <Button
                      type="reset"
                      onClick={resetFilters}
                      variant={"secondary"}
                    >
                      Clear filters
                    </Button>
                    <Button onClick={filterData}>Search</Button>
                  </div>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {isLoading && <Spinner />}
        {sectionsData && sectionsData.length !== 0 && (
          <>
            <div className="w-full flex justify-end mt-6">
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
