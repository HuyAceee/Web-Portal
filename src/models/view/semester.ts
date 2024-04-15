export interface SemesterFormModel {
  classroomId?: number;
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
}

export enum SubjectTimeTypeEnum {
  PRAK,
  LAB,
  LECTURE_PARK
}
