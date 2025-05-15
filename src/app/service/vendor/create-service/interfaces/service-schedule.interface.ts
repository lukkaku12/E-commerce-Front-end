export interface ServiceSchedule {
    schedule_id?: number;
    service_id?: number;
    start_time: string; // formato 'HH:mm:ss'
    ending_time: string;
    schedule_date: string; // formato 'YYYY-MM-DD'
    isAvailable: boolean;
    created_at?: string;
    updated_at?: string;
  }