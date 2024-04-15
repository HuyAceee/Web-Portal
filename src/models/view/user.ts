import type { RoleEnum } from "models/common";

export interface UserInformationModel {
  email: string;
  name: string;
  birthDate?: string | number;
  phoneNumber:string;
  imageUrl: string;
  role: RoleEnum;
  classroom?: string | number;
  classroomId?: string | number;
  isFemale: boolean;
}

export interface ChangePasswordFormModel {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}