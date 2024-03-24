export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface BaseResponseModel<T> {
  code: string
  data: T
}