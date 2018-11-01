export interface Friend {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string
} 

export interface Money {
    total: number,
    available: number,
    used: number,
    pending: number
}

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}
