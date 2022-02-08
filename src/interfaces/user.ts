export interface IAuthStatus {
    authDetails?: IAuthDetails;
    profile?: IUser;
    permissions: IPermission[];
    splash: ISplash;
    feedback: IUserFeedback[]
}

export interface ISplash {
    [key: string]: boolean;
}

export interface IPermission {
    permission: string;
    project?: string;
    environment?: string;
}

export interface IAuthDetails {
    type: string;
    path: string;
    message: string;
    defaultHidden: boolean;
    options: IAuthOptions[];
}

export interface IAuthOptions {
    type: string;
    message: string;
    path: string;
}

export interface IUserResponse {
    user: IUser;
    feedback: IUserFeedback[];
    permissions: IPermission[];
    splash: ISplash;
}

export interface IUser {
    id: number;
    email: string;
    name: string;
    createdAt: string;
    imageUrl: string;
    loginAttempts: number;
    permissions: string[] | null;
    inviteLink: string;
    rootRole: number;
    seenAt: string | null;
    username?: string;
}

export interface IUserFeedback {
    neverShow: boolean;
    feedbackId: string;
    given?: string;
    userId: number;
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
