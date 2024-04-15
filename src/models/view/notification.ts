export interface NotificationModel {
  id?: number;
  title: string;
  description: string;
  startDate?: string | number;
  endDate?: string | number;
  imageUrl: string;
}
