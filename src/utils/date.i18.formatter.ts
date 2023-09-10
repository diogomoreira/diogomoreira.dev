import { format } from "date-fns";

export default function formatDateI18N(timestamp: string) {
  const dateFromTimestamp = new Date(timestamp);
  const formatPattern = "MMM dd, yyyy";
  return format(dateFromTimestamp, formatPattern);
}
