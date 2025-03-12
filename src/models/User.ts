export interface User {
    userID?: number;
    name: string;
    email: string;
    password: string;
    role: 'User' | 'Admin';
}
