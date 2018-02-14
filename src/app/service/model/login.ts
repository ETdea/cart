export class Login
{
    userName: string;
    password: string;
}

export class UserInfo
{
    name: string;
    isAdmin: boolean;
    token: string;
}

export class ChangePassword
{
    currentPassword: string;
    newPassword: string;
}