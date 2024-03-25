import { BASE_URL } from "constant";
import { RoleEnum } from "models/common";

export const isAdmin = (role: RoleEnum) => role === RoleEnum.ADMIN

export function convertObjectWithDefaults<T>(obj: any, defaultValue = ""): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null || value === undefined ? defaultValue : value,
    ])
  ) as T;
}

export const convertImageUrl = (url: string) => {
  return BASE_URL + '/file?fileName=' + url
}
