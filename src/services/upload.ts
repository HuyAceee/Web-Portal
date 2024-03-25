import { api } from "./api";
import { API_PATH } from "constant/apiPath";
import type { BaseResponseModel } from "models/common";

export const UploadService = {
  upload: async (data: any): Promise<BaseResponseModel<string>> => {
    return api.post(API_PATH.FILE + "/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
