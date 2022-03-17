import { IUnleashContextDefinition } from 'interfaces/context';
import { IConstraint } from 'interfaces/strategy';

export const createConstraint = (contextName: string): IConstraint => {
    return {
        contextName,
        operator: 'IN',
        values: [],
        value: '',
        caseInsensitive: false,
        inverted: false,
    };
};
