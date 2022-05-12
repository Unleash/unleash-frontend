import { ConstraintSchemaOperatorEnum } from '../../../../openapi';

export const formatOperatorDescription = (
    operator: ConstraintSchemaOperatorEnum
): string => {
    return constraintOperatorDescriptions[operator];
};

const constraintOperatorDescriptions = {
    [ConstraintSchemaOperatorEnum.In]: 'is one of',
    [ConstraintSchemaOperatorEnum.NotIn]: 'is not one of',
    [ConstraintSchemaOperatorEnum.StrContains]: 'is a string that contains',
    [ConstraintSchemaOperatorEnum.StrStartsWith]:
        'is a string that starts with',
    [ConstraintSchemaOperatorEnum.StrEndsWith]: 'is a string that ends with',
    [ConstraintSchemaOperatorEnum.NumEq]: 'is a number equal to',
    [ConstraintSchemaOperatorEnum.NumGt]: 'is a number greater than',
    [ConstraintSchemaOperatorEnum.NumGte]:
        'is a number greater than or equal to',
    [ConstraintSchemaOperatorEnum.NumLt]: 'is a number less than',
    [ConstraintSchemaOperatorEnum.NumLte]: 'is a number less than or equal to',
    [ConstraintSchemaOperatorEnum.DateBefore]: 'is a date before',
    [ConstraintSchemaOperatorEnum.DateAfter]: 'is a date after',
    [ConstraintSchemaOperatorEnum.SemverEq]: 'is a SemVer equal to',
    [ConstraintSchemaOperatorEnum.SemverGt]: 'is a SemVer greater than',
    [ConstraintSchemaOperatorEnum.SemverLt]: 'is a SemVer less than',
};
