import { IConstraint } from 'interfaces/strategy';
import { operatorsForContext } from 'utils/operator-utils';

export const createConstraint = (contextName: string): IConstraint => {
    return {
        contextName,
        operator: operatorsForContext(contextName)[0],
        values: [],
        value: '',
        caseInsensitive: false,
        inverted: false,
    };
};
