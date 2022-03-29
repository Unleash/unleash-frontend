import { CURRENT_TIME_CONTEXT_FIELD } from 'component/common/ConstraintAccordion/ConstraintAccordionEdit/ConstraintAccordionEditHeader/ConstraintAccordionEditHeader';
import { allOperators, dateOperators, Operator } from 'constants/operators';
import { oneOf } from 'utils/oneOf';

export const operatorsForContext = (contextName: string): Operator[] => {
    return allOperators.filter(operator => {
        if (
            oneOf(dateOperators, operator) &&
            contextName !== CURRENT_TIME_CONTEXT_FIELD
        ) {
            return false;
        }

        if (
            !oneOf(dateOperators, operator) &&
            contextName === CURRENT_TIME_CONTEXT_FIELD
        ) {
            return false;
        }

        return true;
    });
};

export const formatOperatorName = (operator: Operator): string => {
    return formattedOperators[operator] ?? operator;
};

const formattedOperators: Record<Operator, string> = {
    NOT_IN: 'NOT INCLUDE',
    IN: 'INCLUDE',
    STR_ENDS_WITH: 'STRING ENDS WITH',
    STR_STARTS_WITH: 'NOT INCLUDE',
    STR_CONTAINS: 'NOT INCLUDE',
    NUM_EQ: 'NOT INCLUDE',
    NUM_GT: 'NOT INCLUDE',
    NUM_GTE: 'NOT INCLUDE',
    NUM_LT: 'NOT INCLUDE',
    NUM_LTE: 'NOT INCLUDE',
    DATE_AFTER: 'NOT INCLUDE',
    DATE_BEFORE: 'NOT INCLUDE',
    SEMVER_EQ: 'NOT INCLUDE',
    SEMVER_GT: 'NOT INCLUDE',
    SEMVER_LT: 'NOT INCLUDE',
};
