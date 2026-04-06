import { LocalizedValue } from "../apiClient/generated/client";

export const getLocalizedValue = (
  obj?: LocalizedValue,
  locale?: keyof LocalizedValue,
): string | undefined => {
  if (locale && obj?.[locale] && obj[locale].length > 0) {
    return obj[locale];
  }

  if (obj?.["ka"] && obj["ka"].length > 0) {
    return obj["ka"];
  }

  for (const key in obj) {
    const value = obj[key as keyof LocalizedValue];
    if (value && value.length > 0) {
      return value;
    }
  }

  return undefined;
};
