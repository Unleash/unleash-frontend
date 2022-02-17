export const NOT_IN = 'NOT_IN';
export const IN = 'IN';
export const STR_ENDS_WITH = 'STR_ENDS_WITH';
export const STR_STARTS_WITH = 'STR_STARTS_WITH';
export const STR_CONTAINS = 'STR_CONTAINS';
export const NUM_EQ = 'NUM_EQ';
export const NUM_GT = 'NUM_GT';
export const NUM_GTE = 'NUM_GTE';
export const NUM_LT = 'NUM_LT';
export const NUM_LTE = 'NUM_LTE';
export const DATE_AFTER = 'DATE_AFTER';
export const DATE_BEFORE = 'DATE_BEFORE';
export const SEMVER_EQ = 'SEMVER_EQ';
export const SEMVER_GT = 'SEMVER_GT';
export const SEMVER_LT = 'SEMVER_LT';

export const allOperators = [
    NOT_IN,
    IN,
    STR_ENDS_WITH,
    STR_STARTS_WITH,
    STR_CONTAINS,
    NUM_EQ,
    NUM_GT,
    NUM_GTE,
    NUM_LT,
    NUM_LTE,
    DATE_AFTER,
    DATE_BEFORE,
    SEMVER_EQ,
    SEMVER_GT,
    SEMVER_LT,
];

export const stringOperators = [STR_ENDS_WITH, STR_STARTS_WITH, STR_CONTAINS];
export const inOperators = [IN, NOT_IN];
export const numOperators = [NUM_EQ, NUM_GT, NUM_GTE, NUM_LT, NUM_LTE];
export const dateOperators = [DATE_AFTER, DATE_BEFORE];
export const semVerOperators = [SEMVER_EQ, SEMVER_GT, SEMVER_LT];
