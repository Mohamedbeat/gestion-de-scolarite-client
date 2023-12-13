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
import { Edit2, Plus, Trash, RefreshCcw } from "lucide-react";
import AddDecisionDialog from "@/components/AddDecisionDialog";
import DeleteDecisionDialog from "@/components/DeleteDecisionDialog";

export interface decisionDto {
  _id: string;
  semesterCode: string;
  registerationNumber: string;
  decision: string;
  semesterAverage: number;
  __v: number;
}

export default function DecisionPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const { theme } = useTheme();

  const [decisionsData, setdecisions] = useState<decisionDto[]>();
  useEffect(() => {
    const getDecisionsData = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(
          `${API_URL}/decisions?minAverage=0&maxAverage=20`,
          {
            withCredentials: true,
          }
        );

        setdecisions(res.data.data);
        // console.log(res.data.data);

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

    getDecisionsData();
  }, []);

  const updateDecision = async (item: decisionDto) => {
    try {
      setIsLoading(true);

      const res = await axios.put(
        `${API_URL}/decisions`,
        {
          registerationNumber: item.registerationNumber,
          semesterCode: item.semesterCode,
        },
        {
          withCredentials: true,
        }
      );

      toast({
        title: res.data.message,
      });
      // console.log(res.data.data);

      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response.data.message,
      });
      setIsLoading(false);
    }
  };
  return (
    <ScrollArea>
      <LeftPageTitleAndContainer title="Decision">
        {isLoading && <Spinner />}
        {decisionsData && decisionsData.length !== 0 && (
          <>
            <div className="w-full flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> Add a module
                  </Button>
                </DialogTrigger>
                <AddDecisionDialog />
              </Dialog>
            </div>

            <Table className="h-[400px]">
              <TableCaption>A list of your decisions.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">registeration number</TableHead>
                  <TableHead>semester code</TableHead>
                  <TableHead>decision</TableHead>
                  <TableHead>semesterAverage</TableHead>
                  <TableHead>Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {decisionsData?.map((item, index) => (
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
                    <TableCell>{item.semesterCode}</TableCell>
                    <TableCell>{item.decision}</TableCell>
                    <TableCell>{item.semesterAverage.toFixed(2)}</TableCell>

                    <TableCell>
                      <div className="w-full flex justify-around">
                        {/* edit speciality btn */}

                        <Button onClick={() => updateDecision(item)}>
                          <RefreshCcw />
                        </Button>

                        {/* delete speciality btn */}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant={"destructive"}>
                              <Trash />
                            </Button>
                          </AlertDialogTrigger>
                          <DeleteDecisionDialog
                            url={`${API_URL}/decisions/${item._id}`}
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
