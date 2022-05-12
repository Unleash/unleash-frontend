import { cleanConstraint } from 'utils/cleanConstraint';
import { ConstraintSchemaOperatorEnum } from '../openapi';

test('cleanConstraint values', () => {
    expect(
        cleanConstraint({
            contextName: '',
            operator: ConstraintSchemaOperatorEnum.In,
            value: '1',
            values: ['2'],
        })
    ).toEqual({
        contextName: '',
        operator: 'IN',
        values: ['2'],
    });
});

test('cleanConstraint value', () => {
    expect(
        cleanConstraint({
            contextName: '',
            operator: ConstraintSchemaOperatorEnum.NumEq,
            value: '1',
            values: ['2'],
        })
    ).toEqual({
        contextName: '',
        operator: 'NUM_EQ',
        value: '1',
    });
});
