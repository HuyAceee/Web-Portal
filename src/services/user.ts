import { api } from './api'
import { API_PATH } from 'constant/apiPath'
import type { BaseResponseModel } from 'models/common'
import type { UserInformationModel } from 'models/view/user'

export const UserService = {
  getUserInfo: async (): Promise<BaseResponseModel<UserInformationModel>> => {
    return api.get(API_PATH.USER + '/profile')
  },
}
