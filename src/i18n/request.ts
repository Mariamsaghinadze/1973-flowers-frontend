import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

const messagesMap: Record<string, () => Promise<unknown>> = {
  en: () => import("../messages/en.json"),
  ka: () => import("../messages/ka.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (
      (await messagesMap[locale]()) as { default: Record<string, string> }
    ).default,
  };
});
