interface IAuthStatus {
    authDetails: IAuthDetails;
    showDialog: boolean;
    profile?: IUser;
}

interface IAuthDetails {
    type: string;
    path: string;
    message: string;
    options: string[];
}

interface IUser {
    id: number;
    email: string;
    name: string;
    createdAt: string;
    imageUrl: string;
    loginAttempts: number;
    permissions: string[];
    inviteLink: string;
    rootRole: number;
    seenAt: string | null;
    username: string;
}

export interface IUserPayload {
    name: string;
    email: string;
    id?: string;
}

export interface IAddedUser extends IUser {
    emailSent?: boolean;
}

export default IAuthStatus;
