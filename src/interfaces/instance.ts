export interface IInstanceStatus {
    plan: string;
    trialExpiry?: string;
    trialStart?: string;
    trialExtended?: number;
    billingCenter?: string;
    state?: InstanceState;
    seats?: number;
}

export enum InstanceState {
    UNASSIGNED = 'UNASSIGNED',
    TRIAL = 'TRIAL',
    ACTIVE = 'ACTIVE',
    EXPIRED = 'EXPIRED',
    CHURNED = 'CHURNED',
}
