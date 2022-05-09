import { IConstraint } from './strategy';

export interface ISegment {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    createdBy: string;
    constraints: IConstraint[];
}

export interface ISegmentStrategy {
    id: string;
    featureName: string;
    projectId: string;
    environment: string;
    strategyName: string;
}

export type ISegmentPayload = Pick<
    ISegment,
    'name' | 'description' | 'constraints'
>;
