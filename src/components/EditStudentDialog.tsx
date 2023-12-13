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
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { API_URL, fomratingDate } from "@/utils/config";
import { sectionDto } from "@/pages/SectionsPage";
import { studentsDto } from "@/pages/StudentsPage";

type level = "3AS" | "2AS" | "1AS" | "4AM";

export default function EditStudentDialog({
  id,
  item,
  index,
  studentsData,
}: {
  id: string;
  item: studentsDto;
  index: number;
  studentsData: studentsDto[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerationNumber, setRegisterationNumber] = useState<string>(
    item.registerationNumber
  );
  const [firstName, setFirstName] = useState<string>(item.firstName);
  const [lastName, setLastName] = useState<string>(item.lastName);
  const newBirthDate = fomratingDate(
    new Date(item.birthDate).toLocaleDateString()
  );
  const [birthDate, setbirthDate] = useState<string>(newBirthDate);
  const [birthPlace, setBirthPlace] = useState<string>(item.birthPlace);
  const [address, setAddress] = useState<string>(item.address);
  const [phoneNumber, setPhoneNumber] = useState<string>(item.phoneNumber);
  const [fatherFirstName, setfatherFirstName] = useState<string>(
    item.fatherFirstName
  );
  const [motherFullName, setmotherFullName] = useState<string>(
    item.motherFullName
  );
  const [studentLevel, setstudentLevel] = useState<string>(item.studentLevel);
  const [brothersNumber, setbrothersNumber] = useState<number>(
    item.brothersNumber
  );
  const [parentFamilyStatus, setparentFamilyStatus] = useState<string>(
    item.parentFamilyStatus
  );
  const [studentFamilyStatus, setstudentFamilyStatus] = useState<string>(
    item.studentFamilyStatus
  );
  const [fatherJob, setfatherJob] = useState<string>(item.fatherJob);
  const [motherJob, setmotherJob] = useState<string>(item.motherJob);
  const [sex, setsex] = useState<string>(item.sex);
  const [Nationality, setNationality] = useState<string>(item.Nationality);
  const [sectionid, setsectionid] = useState<string>(item.sectionid);
  const [sectionCode, setsectionCode] = useState<string>(item.sectionCode);

  const [sectionsData, setSectionsData] = useState<sectionDto[] | null>(null);

  useEffect(() => {
    const getSectionData = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`${API_URL}/sections`, {
          withCredentials: true,
        });

        setSectionsData(res.data.data);
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
    getSectionData();
  }, []);

  const { toast } = useToast();

  const handleEdit = async (id: string) => {
    // const newStartDate = fomratingDate(startDate);
    // const newEndDate = fomratingDate(endDate);
    const data = {
      registerationNumber,
      firstName,
      lastName,
      birthDate,
      birthPlace,
      address,
      phoneNumber,
      fatherFirstName,
      motherFullName,
      studentLevel,
      brothersNumber,
      parentFamilyStatus,
      studentFamilyStatus,
      fatherJob,
      motherJob,
      sex,
      Nationality,
      sectionid,
    };
    console.log(data);

    try {
      const res = await axios.put(`${API_URL}/students/${id}`, data, {
        withCredentials: true,
      });

      toast({
        title: res.data.message,
      });
      // sectionsData[index].specialityTitle = data.specialityTitle;
      // sectionsData[index].sectionCode = data.sectionCode;
      // sectionsData[index].startDate = new Date(data.startDate);
      // sectionsData[index].endDate = new Date(data.endDate);
      // sectionsData[index].specialityid = data.specialityid;
      studentsData[index].registerationNumber = registerationNumber;
      studentsData[index].firstName = firstName;
      studentsData[index].lastName = lastName;
      studentsData[index].birthDate = new Date(birthDate);
      studentsData[index].birthPlace = birthDate;
      studentsData[index].address = address;
      studentsData[index].phoneNumber = phoneNumber;
      studentsData[index].fatherFirstName = fatherFirstName;
      studentsData[index].motherFullName = motherFullName;
      studentsData[index].studentLevel = studentLevel as level;
      studentsData[index].brothersNumber = brothersNumber;
      studentsData[index].parentFamilyStatus = parentFamilyStatus as
        | "married"
        | "divorced";
      studentsData[index].studentFamilyStatus = studentFamilyStatus as
        | "single"
        | "divorced"
        | "married";
      studentsData[index].fatherJob = fatherJob;
      studentsData[index].motherJob = motherJob;
      studentsData[index].sex = sex as "male" | "female";
      studentsData[index].Nationality = Nationality;
      studentsData[index].sectionid = sectionid;
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
    <DialogContent className="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Edit section</DialogTitle>
        {/* <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription> */}
      </DialogHeader>
      <div className="grid grid-cols-3  gap-2 space-x-2">
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="registerationNumber" className="">
            regesteration number
          </Label>
          <Input
            id="registerationNumber"
            name="registerationNumber"
            defaultValue={registerationNumber}
            onChange={(e) => setRegisterationNumber(e.target.value)}
          />
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="firstName" className="">
            first name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="lastName" className="">
            last name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="birthDate" className="">
            Birth date
          </Label>
          <Input
            id="birthDate"
            name="birthDate"
            type="date"
            defaultValue={birthDate}
            onChange={(e) => setbirthDate(e.target.value)}
          />
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="birthPlace" className="">
            birth place
          </Label>
          <Input
            id="birthPlace"
            name="birthPlace"
            defaultValue={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
          />
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="address" className="">
            address
          </Label>
          <Input
            id="address"
            name="address"
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="phoneNumber" className="">
            phone number
          </Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            defaultValue={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="fatherFirstName" className="">
            father First Name
          </Label>
          <Input
            id="fatherFirstName"
            name="fatherFirstName"
            defaultValue={fatherFirstName}
            onChange={(e) => setfatherFirstName(e.target.value)}
          />
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="motherFullName" className="">
            mother full Name
          </Label>
          <Input
            id="motherFullName"
            name="motherFullName"
            defaultValue={motherFullName}
            onChange={(e) => setmotherFullName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="studentLevel" className="">
            student level
          </Label>
          <Select value={studentLevel} onValueChange={setstudentLevel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={studentLevel} />
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
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="brothersNumber" className="">
            brothers number
          </Label>
          <Input
            id="brothersNumber"
            name="brothersNumber"
            type="number"
            defaultValue={brothersNumber}
            onChange={(e) => setbrothersNumber(parseInt(e.target.value))}
          />
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="parentFamilyStatus" className="">
            parent Family Status
          </Label>
          <Select
            value={parentFamilyStatus}
            onValueChange={setparentFamilyStatus}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={parentFamilyStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="divorced">divorced</SelectItem>
              <SelectItem value="married">married</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="studentFamilyStatus" className="">
            student Family Status
          </Label>
          <Select
            value={studentFamilyStatus}
            onValueChange={setstudentFamilyStatus}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={studentFamilyStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">single</SelectItem>
              <SelectItem value="divorced">divorced</SelectItem>
              <SelectItem value="married">married</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="fatherJob" className="">
            father job
          </Label>
          <Input
            id="fatherJob"
            name="fatherJob"
            defaultValue={fatherJob}
            onChange={(e) => setfatherJob(e.target.value)}
          />
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="motherJob" className="">
            mother job
          </Label>
          <Input
            id="motherJob"
            name="motherJob"
            defaultValue={motherJob}
            onChange={(e) => setmotherJob(e.target.value)}
          />
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="sex" className="">
            sex
          </Label>
          <Select value={sex} onValueChange={setsex}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={sex} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">male</SelectItem>
              <SelectItem value="female">female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          {/* grid grid-cols-2 flex-1 gap-2 */}
          <Label htmlFor="nationality" className="">
            nationality
          </Label>
          <Input
            id="nationality"
            name="nationality"
            defaultValue={Nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
        </div>

        {/* ////// */}
        <div className="w-full">
          <Label htmlFor="sectionid" className="">
            section code
          </Label>
          <Select
            name="sectionid"
            value={sectionid}
            onValueChange={setsectionid}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={item.sectionCode} />
            </SelectTrigger>
            <SelectContent>
              {/* 4AM,1AS,2AS,3AS */}
              {sectionsData?.map((item) => {
                return (
                  <SelectItem key={item._id} value={item._id}>
                    {item.sectionCode}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="w-full">
          <Label htmlFor="specialityid" className="">
            Speciality title
          </Label>
          <Select
            name="specialityid"
            value={specialityid}
            onValueChange={setSpecialityid}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={item.specialityTitle} />
            </SelectTrigger>
            <SelectContent>
              4AM,1AS,2AS,3AS
              {specialitiesData?.map((item) => {
                return (
                  <SelectItem key={item._id} value={item._id}>
                    {item.specialityTitle}
                  </SelectItem>
                );
              })}
              <SelectItem value="1AS">1AS</SelectItem>
              <SelectItem value="2AS">2AS</SelectItem>
              <SelectItem value="3AS">3AS</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>
      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button
          type="submit"
          size="sm"
          className="px-3"
          onClick={() => handleEdit(item._id)}
        >
          Edit
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
