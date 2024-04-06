import { api } from './api'
import { API_PATH } from 'constant/apiPath'
import type { BaseResponseModel } from 'models/common'
import type { NotificationModel } from 'models/view/notification'

export const NotificationService = {
  create: async (data: NotificationModel): Promise<BaseResponseModel<string>> => {
    return api.post(API_PATH.NOTIFICATION + '/create', data)
  },
  getList: async (): Promise<NotificationModel[]> => {
    return api.post(API_PATH.NOTIFICATION + '/list')
  }
}
