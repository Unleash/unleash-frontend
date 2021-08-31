export interface IEnvironment {
    name: string;
    type: string;
    createdAt: string;
    displayName: string;
    sortOrder: number;
}

export interface IEnvironmentResponse {
    environments: IEnvironment[];
}
