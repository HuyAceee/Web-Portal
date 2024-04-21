export interface SubjectPointModel {
  subjectName: string;
  point: number | string;
  id: number;
  name: string;
  startDate?: string | number
  endDate?: string | number
}

export interface SemesterPointModel {
  userEmail?: string;
  semesterId?: number;
  startDate?: string | number;
  endDate?: string | number;
  listSubjectPoint: SubjectPointModel[];
}

export interface SemesterPointAdminModel {
  email: string
  name: string
  listSemesterPoint: SemesterPointModel[]
}

export interface PointUpdateRequestItemModel {
  id: number;
  point: number
}
