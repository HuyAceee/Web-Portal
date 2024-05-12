export interface SemesterFormModel {
  id?: number
  classroomId?: number;
  classroomName?: string;
  startDate?: string | number;
  endDate?: string | number;
  listSubject: SubjectModel[];
}

export interface SubjectModel {
  name: string;
  listSubjectTime: SubjectTimeModel[];
}

export interface SubjectTimeModel {
  type: SubjectTimeTypeEnum | number;
  teacherName: string;
  className: string;
  week: number;
  weekday: number;
  period: number
}

export enum SubjectTimeTypeEnum {
  PRAK,
  LAB,
  LECTURE_PARK
}
