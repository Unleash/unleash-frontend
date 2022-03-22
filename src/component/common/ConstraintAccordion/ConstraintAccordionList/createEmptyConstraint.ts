import { dateOperators } from 'constants/operators';
import { IConstraint } from 'interfaces/strategy';
import { oneOf } from 'utils/one-of';
import { operatorsForContext } from 'utils/operator-utils';

export const createEmptyConstraint = (contextName: string): IConstraint => {
    const operator = operatorsForContext(contextName)[0];

    const value = oneOf(dateOperators, operator)
        ? new Date().toISOString()
        : '';

    return {
        contextName,
        operator,
        value,
        values: [],
        caseInsensitive: false,
        inverted: false,
    };
};
