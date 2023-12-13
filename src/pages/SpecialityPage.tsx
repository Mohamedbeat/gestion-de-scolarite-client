import AddSpecialityDialog from "@/components/AddSpecialityDialog";
import DeleteDialog from "@/components/DeleteSpecialityDialog";
import EditSpecialityDialog from "@/components/EditSpecialityDialog";
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
import { Trash, Edit2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export interface specialityDto {
  _id: string;
  specialityTitle: string;
  specialityCode: string;
  requiredLevel: string;
  duration: number;
  __v: number;
}

export default function SpecialityPage() {
  const { toast } = useToast();
  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [specialitiesData, setSpecialitiesData] = useState<
    specialityDto[] | null
  >(null);

  useEffect(() => {
    const getspecialitiesData = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(
          "http://127.0.0.1:3000/api/v1/specialities",
          { withCredentials: true }
        );

        console.log(res);
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
  return (
    <ScrollArea>
      <LeftPageTitleAndContainer title="Speciality">
        {isLoading && <Spinner />}
        {specialitiesData && specialitiesData.length !== 0 && (
          <>
            <div className="w-full flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> Add a speciality
                  </Button>
                </DialogTrigger>
                <AddSpecialityDialog />
              </Dialog>
            </div>
            <Table>
              <TableCaption>A list of your specialities.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Speciality code</TableHead>
                  <TableHead>Speciality title</TableHead>
                  <TableHead>Required level</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specialitiesData?.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className={`${
                      theme === "light"
                        ? "hover:bg-slate-200"
                        : "hover:bg-slate-700"
                    } `}
                  >
                    <TableCell className="font-medium">
                      {item.specialityCode}
                    </TableCell>
                    <TableCell>{item.specialityTitle}</TableCell>
                    <TableCell>{item.requiredLevel}</TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell>
                      <div className="w-full flex justify-around">
                        {/* edit speciality btn */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Edit2 />
                            </Button>
                          </DialogTrigger>
                          <EditSpecialityDialog
                            id={item._id}
                            item={item}
                            index={index}
                            specialitiesData={specialitiesData}
                          />
                        </Dialog>
                        {/* delete speciality btn */}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant={"destructive"}>
                              <Trash />
                            </Button>
                          </AlertDialogTrigger>
                          <DeleteDialog
                            url={`${API_URL}/specialities/${item._id}`}
                            item={item}
                            index={index}
                            specialitiesData={specialitiesData}
                          />
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {/* /////////// */}
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

        {/* ////////////////////////////////////////// */}
        {specialitiesData?.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center text-center">
            <h1 className="font-bold text-[30px]">No data to show...</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus /> Add a speciality
                </Button>
              </DialogTrigger>
              <AddSpecialityDialog />
            </Dialog>
          </div>
        )}
      </LeftPageTitleAndContainer>
    </ScrollArea>
  );
}
