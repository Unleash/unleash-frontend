import { IConstraint } from './strategy';

export interface ISegment {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    createdBy: string;
    constraints: IConstraint[];
}

export type ICreateSegmentPayload = Pick<
    ISegment,
    'name' | 'description' | 'constraints'
>;

export type IUpdateSegmentPayload = Pick<
    ISegment,
    'id' | 'name' | 'description' | 'constraints'
>;
