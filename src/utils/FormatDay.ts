import moment from "moment";

export const formatDate = (date: string): string => {
  const formattedDate = moment(date).format("MM/DD/YYYY");
  const today = moment().format("YYYY-MM-DD");
  return today === date ? "Today" : formattedDate;
};

// format VN time

export const formatTime = (date: string) => {
  const vietnamTime = moment.utc(date).add(7, "hours").format("h:mm A");
  return vietnamTime;
};
