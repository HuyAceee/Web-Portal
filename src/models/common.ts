export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface BaseResponseModel<T> {
  code: string;
  data: T;
}

export interface HeaderLabelModel {
  id: string;
  label?: string;
  align?: "center" | "left" | "right" | "inherit" | "justify";
  width?: string;
  minWidth?: string;
}

export enum AccountPageEnum {
  PROFILE = "PROFILE",
  NEW = "NEW",
  UPDATE = "UPDATE",
}

export interface CardModel {
  image: string;
  title: string;
  description: string;
}
