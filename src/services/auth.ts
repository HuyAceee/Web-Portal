import { api } from "./api";
import { API_PATH } from "constant/apiPath";
import type { BaseResponseModel } from "models/common";
import type { AuthLoginRequest } from "models/request/auth";

export const AuthService = {
  login: async (data: AuthLoginRequest): Promise<BaseResponseModel<string>> => {
    return api.post(API_PATH.AUTH + "/login", data);
  },
};
