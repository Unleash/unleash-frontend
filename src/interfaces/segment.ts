import { IConstraint } from "./strategy";

export interface ISegment {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    createdBy: string;
    constraints: IConstraint[]
}
