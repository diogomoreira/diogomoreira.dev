import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export default function formatDateI18N(timestamp: string, locale?: string) {
  const dateFromTimestamp = new Date(timestamp);
  return locale && locale === "en"
    ? format(dateFromTimestamp, "PPP", { locale: enUS })
    : format(dateFromTimestamp, "PPP");
}
