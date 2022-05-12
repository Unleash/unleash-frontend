import { ConstraintSchemaOperatorEnum } from '../openapi';

export const stringOperators: ConstraintSchemaOperatorEnum[] = [
    ConstraintSchemaOperatorEnum.StrContains,
    ConstraintSchemaOperatorEnum.StrStartsWith,
    ConstraintSchemaOperatorEnum.StrEndsWith,
];

export const inOperators: ConstraintSchemaOperatorEnum[] = [
    ConstraintSchemaOperatorEnum.In,
    ConstraintSchemaOperatorEnum.NotIn,
];

export const numOperators: ConstraintSchemaOperatorEnum[] = [
    ConstraintSchemaOperatorEnum.NumEq,
    ConstraintSchemaOperatorEnum.NumGt,
    ConstraintSchemaOperatorEnum.NumGte,
    ConstraintSchemaOperatorEnum.NumLt,
    ConstraintSchemaOperatorEnum.NumLte,
];

export const dateOperators: ConstraintSchemaOperatorEnum[] = [
    ConstraintSchemaOperatorEnum.DateBefore,
    ConstraintSchemaOperatorEnum.DateAfter,
];

export const semVerOperators: ConstraintSchemaOperatorEnum[] = [
    ConstraintSchemaOperatorEnum.SemverEq,
    ConstraintSchemaOperatorEnum.SemverGt,
    ConstraintSchemaOperatorEnum.SemverLt,
];

export const singleValueOperators: ConstraintSchemaOperatorEnum[] = [
    ...semVerOperators,
    ...dateOperators,
    ...numOperators,
];

export const multipleValueOperators: ConstraintSchemaOperatorEnum[] = [
    ...stringOperators,
    ...inOperators,
];

export const newOperators: ConstraintSchemaOperatorEnum[] = [
    ...stringOperators,
    ...dateOperators,
    ...singleValueOperators,
];

export const allOperators: ConstraintSchemaOperatorEnum[] = [
    ...singleValueOperators,
    ...multipleValueOperators,
    ...newOperators,
];
