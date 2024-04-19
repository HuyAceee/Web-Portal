import { api } from './api'
import { API_PATH } from 'constant/apiPath'
import type { BaseResponseModel } from 'models/common'
import type { SemesterFormModel } from 'models/view/semester'

export const SemesterService = {
  create: async (data: SemesterFormModel): Promise<BaseResponseModel<string>> => {
    return api.post(API_PATH.SEMESTER + '/create', data)
  },
  listForUser: async (): Promise<BaseResponseModel<SemesterFormModel[]>> => {
    return api.post(API_PATH.SEMESTER + '/list')
  },
  getDetail: async (id: string | number): Promise<BaseResponseModel<SemesterFormModel>> => {
    return api.post(API_PATH.SEMESTER + '/detail', { id })
  }
}
