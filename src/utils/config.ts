export const API_URL = "http://127.0.0.1:3000/api/v1";

export const fomratingDate = (oldDate: string): string => {
  // const inputDate = new Date(oldDate).toLocaleDateString();
  // console.log(oldDate);

  // const [year, month, day] = inputDate.split("-");
  const [day, month, year] = oldDate.split("/");

  const newDate = `${year}-${month}-${day}`;
  // const dateObject = new Date(`${year}/${month}/${day}`);
  // console.log(newDate);

  // const newMonth = dateObject.getMonth() + 1; // Months are 0-indexed, so add 1
  // const newDay = dateObject.getDate();
  // const newYear = dateObject.getFullYear();

  // const formattedDate = `${newMonth.toString().padStart(2, "0")}/${newDay
  //   .toString()
  //   .padStart(2, "0")}/${newYear}`;

  return newDate;
};
