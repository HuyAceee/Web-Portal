import { api } from './api'
import { API_PATH } from 'constant/apiPath'
import type { BaseResponseModel } from 'models/common'
import type { QuestionModel } from 'models/view/question'

export const QuestionService = {
  create: async (data: QuestionModel): Promise<BaseResponseModel<string>> => {
    return api.post(API_PATH.QUESTION + '/create', data)
  },
  getList: async (): Promise<BaseResponseModel<QuestionModel[]>> => {
    return api.get(API_PATH.QUESTION + '/list')
  },
  answer: async (data: QuestionModel): Promise<BaseResponseModel<string>> => {
    return api.post(API_PATH.QUESTION + '/answer', data)
  },
}
