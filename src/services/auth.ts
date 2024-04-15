import { api } from "./api";
import { API_PATH } from "constant/apiPath";
import type { BaseResponseModel } from "models/common";
import type { AuthLoginFormModel, ResetPasswordFormModel } from "models/view/auth";
import type { UserInformationModel } from "models/view/user";

export const AuthService = {
  login: async (data: AuthLoginFormModel): Promise<BaseResponseModel<string>> => {
    return api.post(API_PATH.AUTH + "/login", data);
  },
  updateUserInfo: async (data: UserInformationModel): Promise<BaseResponseModel<string>> => {
    return api.post(API_PATH.USER + '/update', data)
  },
  resetPassword: async (data: ResetPasswordFormModel): Promise<BaseResponseModel<string>> => {
    return api.post(API_PATH.AUTH + '/reset_password', data)
  },
  register: async (data: UserInformationModel): Promise<BaseResponseModel<string>> => {
    return api.post(API_PATH.AUTH + '/register', data)
  },
};
