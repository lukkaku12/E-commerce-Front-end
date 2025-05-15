export interface Schedule {
    schedule_id: number;
    schedule_date: string;
    start_time: string;
    ending_time: string;
    isAvailable: boolean;
    created_at?: string;
    updated_at?: string;
}
  