const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (date) => {
  const convertToYear = (date) => new Date(date).getFullYear() || "";
  const convertToMonth = (date) => months[new Date(date).getMonth()] || "";
  const convertToDay = (date) => new Date(date).getDate() || "";
};
