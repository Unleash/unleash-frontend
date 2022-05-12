import { ConstraintSchemaOperatorEnum } from '../openapi';

export interface IFeatureStrategy {
    id?: string;
    strategyName?: string;
    name: string;
    constraints: IConstraint[];
    parameters: IFeatureStrategyParameters;
    projectId?: string;
    environment?: string;
}

export interface IFeatureStrategyParameters {
    [key: string]: string | number | undefined;
}

export interface IFeatureStrategyPayload {
    name?: string;
    constraints: IConstraint[];
    parameters: IFeatureStrategyParameters;
}

export interface IStrategy {
    name: string;
    displayName: string;
    editable: boolean;
    deprecated: boolean;
    description: string;
    parameters: IStrategyParameter[];
}

export interface IStrategyParameter {
    name: string;
    description: string;
    required: boolean;
    type: string;
}

export interface IStrategyPayload {
    name: string;
    description: string;
    parameters: IStrategyParameter[];
}

export interface IConstraint {
    inverted?: boolean;
    values?: string[];
    value?: string;
    caseInsensitive?: boolean;
    operator: ConstraintSchemaOperatorEnum;
    contextName: string;
}
