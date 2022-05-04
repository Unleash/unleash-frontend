import {
    IStrategy,
    IStrategyParameter,
    IFeatureStrategyParameters,
} from 'interfaces/strategy';
import { resolveDefaultParamValue } from 'utils/resolveDefaultParamValue';

export const getStrategyObject = (
    selectableStrategies: IStrategy[],
    name: string,
    featureId: string
) => {
    const selectedStrategy = selectableStrategies.find(
        strategy => strategy.name === name
    );

    const parameters: IFeatureStrategyParameters = {};

    selectedStrategy?.parameters.forEach(({ name }: IStrategyParameter) => {
        parameters[name] = resolveDefaultParamValue(name, featureId);
    });

    return { name, parameters, constraints: [] };
};
