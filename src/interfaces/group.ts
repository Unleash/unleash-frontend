import { IUser } from './user';

export interface IGroup {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    users: IGroupUser[];
}

export interface IGroupUser extends IUser {
    role: 'owner' | 'member';
    joinedAt: Date;
}
