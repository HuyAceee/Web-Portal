import { BASE_URL } from "constant";
import { RoleEnum } from "models/common";

export const isAdmin = (role: RoleEnum) => role === RoleEnum.ADMIN;

export function convertObjectWithDefaults<T>(obj: any, defaultValue = ""): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null || value === undefined ? defaultValue : value,
    ])
  ) as T;
}

export const convertImageUrl = (url: string) => {
  return url ? BASE_URL + "/file?fileName=" + url : '';
};

export function convertObjectToQueryString(
  obj: Record<string, string | number>
) {
  const queryStringParts: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(obj[key]);
      if (typeof obj[key] === "object") {
        encodedValue = JSON.stringify(obj[key]);
      }
      queryStringParts.push(`${encodedKey}=${encodedValue}`);
    }
  }
  return queryStringParts.join("&");
}
