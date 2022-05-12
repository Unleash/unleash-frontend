import { ConstraintSchemaOperatorEnum } from '../../../../../openapi';

export const resolveText = (
    operator: ConstraintSchemaOperatorEnum,
    contextName: string
) => {
    const base = `To satisfy this constraint, values passed into the SDK as ${contextName} must`;

    if (operator === ConstraintSchemaOperatorEnum.In) {
        return `${base} include:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.NotIn) {
        return `${base} not include:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.StrEndsWith) {
        return `${base} end with:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.StrStartsWith) {
        return `${base} start with:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.StrContains) {
        return `${base} contain:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.NumEq) {
        return `${base} match:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.NumGt) {
        return `${base} be greater than:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.NumGte) {
        return `${base} be greater than or equal to:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.NumLt) {
        return `${base} be less than:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.NumLte) {
        return `${base} be less than or equal to:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.DateAfter) {
        return `${base} be after the following date`;
    }

    if (operator === ConstraintSchemaOperatorEnum.DateBefore) {
        return `${base} be before the following date:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.SemverEq) {
        return `${base} match the following version:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.SemverGt) {
        return `${base} be greater than the following version:`;
    }

    if (operator === ConstraintSchemaOperatorEnum.SemverLt) {
        return `${base} be less than the following version:`;
    }
};
