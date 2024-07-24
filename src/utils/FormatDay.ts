import moment from "moment";

export const formatDate = (date: string): string => {
  const formattedDate = moment(date).format("DD/MM/YYYY");
  const today = moment().format("YYYY-MM-DD");
  return today === date ? "Today" : formattedDate;
};
