import AddSectionDialog from "@/components/AddSectionDialog";
import AddStudentDialog from "@/components/AddStudentDialog";
import DeleteSectionDialog from "@/components/DeleteSectionDialog";
import DeleteStudentDialog from "@/components/DeleteStudentDialog";
import EditSectionDialog from "@/components/EditSectionDialog";
import EditStudentDialog from "@/components/EditStudentDialog";
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
export interface studentsDto {
  _id: string;
  registerationNumber: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  birthPlace: string;
  address: string;
  phoneNumber: string;
  fatherFirstName: string;
  motherFullName: string;
  studentLevel: "3AS" | "2AS" | "1AS" | "4AM";
  scolareYear: string;
  brothersNumber: number;
  parentFamilyStatus: "married" | "divorced";
  studentFamilyStatus: "single" | "divorced" | "married";
  fatherJob: string;
  motherJob: string;
  sex: "male" | "female";
  Nationality: string;
  sectionid: string;
  sectionCode: string;
  __v: number;
}

export default function StudentsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [studentsData, setStudentsDate] = useState<studentsDto[] | null>(null);

  const { toast } = useToast();

  const { theme } = useTheme();

  useEffect(() => {
    const getStudentsData = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`${API_URL}/students`, {
          withCredentials: true,
        });

        setStudentsDate(res.data.data);
        // console.log(res.data);
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

    getStudentsData();
  }, []);
  return (
    <ScrollArea>
      <LeftPageTitleAndContainer title="Students">
        {isLoading && <Spinner />}
        {studentsData && studentsData.length !== 0 && (
          <>
            <div className="w-full flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> Add a student
                  </Button>
                </DialogTrigger>
                <AddStudentDialog />
                {/* <AddSpecialityDialog specialitiesData={specialitiesData} /> */}
              </Dialog>
            </div>

            <Table className="h-[400px]   ">
              <TableCaption>A list of your students.</TableCaption>
              <TableHeader className="">
                <TableRow>
                  <TableHead className="">Registeration number</TableHead>
                  <TableHead>firstName</TableHead>
                  <TableHead>lastName</TableHead>
                  <TableHead>birth date</TableHead>
                  <TableHead>birth place</TableHead>
                  <TableHead className="">address</TableHead>
                  <TableHead>phone number</TableHead>
                  <TableHead>father first name</TableHead>
                  <TableHead>mother full name</TableHead>
                  <TableHead>student level</TableHead>
                  <TableHead>brothers number</TableHead>
                  <TableHead>parents family status</TableHead>
                  <TableHead>student family status</TableHead>
                  <TableHead>father job</TableHead>
                  <TableHead>mother job</TableHead>
                  <TableHead>sex</TableHead>
                  <TableHead>nationality</TableHead>
                  <TableHead>section code</TableHead>
                  <TableHead>options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsData?.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className={` max-h-[70px] ${
                      theme === "light"
                        ? "hover:bg-slate-200"
                        : "hover:bg-slate-700"
                    } `}
                  >
                    <TableCell className="font-medium">
                      <p className="w-[130px]">{item.registerationNumber}</p>
                    </TableCell>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>
                      {new Date(item.birthDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{item.birthPlace}</TableCell>
                    <TableCell className="w-max">
                      <p className="w-[130px]">{item.address}</p>
                    </TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>{item.fatherFirstName}</TableCell>
                    <TableCell>
                      <p className="w-[130px]">{item.motherFullName}</p>
                    </TableCell>
                    <TableCell>{item.studentLevel}</TableCell>
                    <TableCell>{item.brothersNumber}</TableCell>
                    <TableCell>{item.parentFamilyStatus}</TableCell>
                    <TableCell>{item.studentFamilyStatus}</TableCell>
                    <TableCell>{item.fatherJob}</TableCell>
                    <TableCell>{item.motherJob}</TableCell>
                    <TableCell>{item.sex}</TableCell>
                    <TableCell>{item.Nationality}</TableCell>
                    <TableCell>
                      <p className="w-[130px]">{item.sectionCode}</p>
                    </TableCell>

                    <TableCell>
                      <div className="w-[150px] flex justify-around">
                        {/* edit speciality btn */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Edit2 />
                            </Button>
                          </DialogTrigger>
                          <EditStudentDialog
                            id={item._id}
                            item={item}
                            index={index}
                            studentsData={studentsData}
                          />
                        </Dialog>
                        {/* delete speciality btn */}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant={"destructive"}>
                              <Trash />
                            </Button>
                          </AlertDialogTrigger>
                          <DeleteStudentDialog
                            url={`${API_URL}/students/${item._id}`}
                            item={item}
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
        {studentsData?.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center text-center">
            <h1 className="font-bold text-[30px]">No data to show...</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus /> Add a student
                </Button>
              </DialogTrigger>
              <AddStudentDialog />
            </Dialog>
          </div>
        )}
      </LeftPageTitleAndContainer>
    </ScrollArea>
  );
}
