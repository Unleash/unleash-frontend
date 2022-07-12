import { IUser } from './user';

export interface IGroup {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    users: IGroupUser[];
}

export interface IGroupUser extends IUser {
    role: 'owner' | 'member';
    joinedAt: Date;
}
