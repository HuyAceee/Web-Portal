export interface SubjectPointModel {
  subjectName: string;
  point: number | string;
  id: number;
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
