import { enUS, ptBR } from "date-fns/locale";

export const locales = {
  pt: { code: "pt", name: "Português", dateLocale: ptBR },
  en: { code: "en", name: "English", dateLocale: enUS },
};

export const defaultLocale = [locales.en];
