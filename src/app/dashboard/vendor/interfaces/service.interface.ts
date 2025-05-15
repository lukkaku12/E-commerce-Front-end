import { Schedule } from "./schedule.interface";
import { Seller } from "./seller.interface";

export interface Service {
    service_id: number;
    service_name: string;
    service_description: string;
    service_price: number;
    serviceSchedule: Schedule[];
    seller: Seller
}