import { api } from './api'
import { API_PATH } from 'constant/apiPath'
import type { BaseResponseModel } from 'models/common'
import type { PointUpdateRequestItemModel, SemesterPointAdminModel, SemesterPointModel } from 'models/view/point'

export const PointService = {
  getListForUser: async (): Promise<BaseResponseModel<SemesterPointModel[]>> => {
    return api.post(API_PATH.POINT + '/user')
  },
  update: async (data: PointUpdateRequestItemModel[]): Promise<BaseResponseModel<string>> => {
    return api.post(API_PATH.POINT + '/update', data)
  },
  getListForAdmin: async (): Promise<BaseResponseModel<SemesterPointAdminModel[]>> => {
    return api.post(API_PATH.POINT + '/admin')
  }
}
