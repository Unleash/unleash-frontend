export interface InstanceStatus {
    plan: string;
    trialExpiry?: string;
    trialStart?: string;
    trialExtended?: number;
    billingCenter?: string;
    instanceState?: InstanceState;
}

export enum InstanceState {
    UNASSIGNED = 'UNASSIGNED',
    TRIAL = 'TRIAL',
    ACTIVE = 'ACTIVE',
    EXPIRED = 'EXPIRED',
    CHURNED = 'CHURNED',
}
