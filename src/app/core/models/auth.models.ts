export class User {
    // id: number;
    // username?: string;
    // password: string;
    // firstName: string;
    // lastName: string;
    // email: string;

    token?: string;
    validTo: Date;
    userImage: string;
    role: UserRole;
}

export enum UserRole {
    ISSUER = 'ISSUER',
    MASTER = 'MASTER',
}