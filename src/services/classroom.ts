import { api } from './api'
import { API_PATH } from 'constant/apiPath'
import type { ClassroomModel } from 'models/view/classroom'

export const ClassroomService = {
  getList: async (): Promise<ClassroomModel[]> => {
    return api.get(API_PATH.CLASSROOM + '/list')
  }
}
