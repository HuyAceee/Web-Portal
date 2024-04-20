import type { RoleEnum } from "models/common";
import type { ClassroomModel } from "./classroom";

export interface UserInformationModel {
  email: string;
  name: string;
  birthDate?: string | number;
  phoneNumber:string;
  imageUrl: string;
  role: RoleEnum;
  classroom?: ClassroomModel;
  classroomId?: string | number;
  isFemale: boolean;
  password?: string
}

export interface ChangePasswordFormModel {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}