import { allOperators, dateOperators } from 'constants/operators';
import { oneOf } from 'utils/oneOf';
import { ConstraintSchemaOperatorEnum } from '../openapi';

export const CURRENT_TIME_CONTEXT_FIELD = 'currentTime';

export const operatorsForContext = (
    contextName: string
): ConstraintSchemaOperatorEnum[] => {
    return allOperators.filter(operator => {
        if (
            oneOf(dateOperators, operator) &&
            contextName !== CURRENT_TIME_CONTEXT_FIELD
        ) {
            return false;
        }

        return !(
            !oneOf(dateOperators, operator) &&
            contextName === CURRENT_TIME_CONTEXT_FIELD
        );
    });
};
