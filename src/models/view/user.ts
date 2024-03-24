import type { RoleEnum } from "models/common";

export interface UserInformationModel {
  email: string;
  name: string;
  birthDate: string;
  phoneNumber:string;
  imageUrl: string;
  role: RoleEnum;
  classroom: string;
}
