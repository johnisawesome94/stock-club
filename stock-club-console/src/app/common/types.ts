export class Member {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public username: string,
        public email: string) {}
}

export class NewMember {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string) {}
}

export class RegisterUser {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string) {}
}

export interface Funds {
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
