import moment from "moment";

// format date
export const formatDate = (date: string, showTodayAsDate: boolean = false): string => {
  const formattedDate = moment(date).format("MM/DD/YYYY");
  const today = moment().format("YYYY-MM-DD");

  if (today === moment(date).format("YYYY-MM-DD")) {
    return showTodayAsDate ? formattedDate : "Today";
  }

  return formattedDate;
};

// format VN time

export const formatTime = (date: string) => {
  const vietnamTime = moment.utc(date).add(7, "hours").format("h:mm A");
  return vietnamTime;
};

export const formatDateTime = (datetime: string) => {
  const formattedDateTime = moment(datetime).format("MM/DD/YYYY hh:mm A");
  return formattedDateTime;
};

// const originalDateTime = '2024-08-04T10:03:31Z';
// const formattedDateTime = formatDateTime(originalDateTime);

// console.log(formattedDateTime);
