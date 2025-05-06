export interface Response {
    accessToken: string;
    user: User;
}

export interface User {
    created_at: Date;
    email: string
    name: string
    password: string
    role: string
    updated_at: string
    user_id: number
}