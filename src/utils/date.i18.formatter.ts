import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export default function formatDateI18N(timestamp: string, locale?: string) {
  const dateFromTimestamp = new Date(timestamp);
  const formatPattern = "MMM ee, yyyy";
  return locale && locale === "en"
    ? format(dateFromTimestamp, formatPattern, { locale: enUS })
    : format(dateFromTimestamp, formatPattern);
}
