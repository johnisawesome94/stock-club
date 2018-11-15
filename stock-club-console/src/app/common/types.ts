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

export class Funds {
    constructor(
        public total: number,
        public available: number,
        public used: number,
        public pending: number) {}
}

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    sub: string;
}

export enum NotificationTypes {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Danger = 'danger'
}

export class Notification {
    constructor(
        public type: string,
        public message: string,
        public dismissible?: boolean,
        public duration?: number) {}
}

export class Stock {
    constructor(
        public id: string,
        public displayName: string,
        public ticker: string,
        public pricePerSharePurchased: number,
        public numberOfSharesOwned: number,
        public totalValueOwned: number,
        public timePurchased: number) {}
}

export class UpdateStock {
    constructor(
        public ticker: string,
        public pricePerShare: number,
        public numberOfShares: number,
        public timePurchased: number) {}
}