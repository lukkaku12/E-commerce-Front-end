export interface Seller {
    user_id: number;
    name: string;
    email: string;
    password?: string;
    role: 'seller' | 'buyer' | string;
    created_at?: string;
    updated_at?: string;
  }