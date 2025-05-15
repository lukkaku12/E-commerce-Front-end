import { User } from "../../../../user/interfaces/login-response.interface";
import { ServiceSchedule } from "./service-schedule.interface";

export interface Service {
  service_id: number;
  service_name: string;
  service_description: string;
  service_price: number;
  created_at?: string;
  updated_at?: string;
  seller: User; 
  serviceSchedule: ServiceSchedule[];
}