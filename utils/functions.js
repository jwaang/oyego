import moment from "moment";

export const convertEpochToReadableDateString = (e) => {
  return moment.unix(e / 1000).format("MMMM Do, YYYY");
};
