import { api } from './api'
import { API_PATH } from 'constant/apiPath'
import type { BaseResponseModel } from 'models/common'
import type { ChangePasswordFormModel, UserInformationModel } from 'models/view/user'

export const UserService = {
  getUserInfo: async (): Promise<BaseResponseModel<UserInformationModel>> => {
    return api.get(API_PATH.USER + '/profile')
  },
  changePassword: async (data: ChangePasswordFormModel): Promise<BaseResponseModel<string>> => {
    return api.post(API_PATH.USER + '/change_password', data)
  },
  getList: async (): Promise<BaseResponseModel<UserInformationModel[]>> => {
    return api.get(API_PATH.USER + '/list')
  },
}
