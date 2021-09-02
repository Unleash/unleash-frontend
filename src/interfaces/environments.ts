export interface IEnvironment {
    name: string;
    type: string;
    createdAt: string;
    displayName: string;
    sortOrder: number;
}

export interface IEnvironmentPayload {
    name: string;
    displayName: string;
    type: string;
}

export interface IEnvironmentResponse {
    environments: IEnvironment[];
}
