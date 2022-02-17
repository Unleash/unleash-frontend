import { Select, MenuItem, IconButton } from '@material-ui/core';

import { IConstraint } from '../../../../../interfaces/strategy';

import { useStyles } from '../../ConstraintAccordion.styles';
import useUnleashContext from '../../../../../hooks/api/getters/useUnleashContext/useUnleashContext';
import GeneralSelect from '../../../GeneralSelect/GeneralSelect';
import { ConstraintIcon } from '../../ConstraintIcon';
import { Help } from '@material-ui/icons';
import ConditionallyRender from '../../../ConditionallyRender';
import { allOperators } from '../../../../../constants/operators';
import { SAVE } from '../ConstraintAccordionEdit';
import { resolveText } from './helpers';

interface IConstraintAccordionViewHeader {
    localConstraint: IConstraint;
    setContextName: (contextName: string) => void;
    setOperator: (operator: string) => void;
    action: string;
}

const constraintOperators = allOperators.map(operator => {
    return { key: operator, label: operator };
});

export const ConstraintAccordionEditHeader = ({
    localConstraint,
    setContextName,
    setOperator,
    action,
}: IConstraintAccordionViewHeader) => {
    const styles = useStyles();
    const { context } = useUnleashContext();

    if (!context) return null;
    const constraintNameOptions = context.map(context => {
        return { key: context.name, label: context.name };
    });

    return (
        <div className={styles.headerContainer}>
            <ConstraintIcon />
            <div>
                <GeneralSelect
                    id="context-field-select"
                    name="contextName"
                    label="Context Field"
                    options={constraintNameOptions}
                    value={localConstraint.contextName || ''}
                    onChange={(
                        e: React.ChangeEvent<{
                            name?: string;
                            value: unknown;
                        }>
                    ) => {
                        setContextName(e.target.value as string);
                    }}
                    className={styles.headerSelect}
                />
            </div>
            <div>
                <GeneralSelect
                    id="operator-select"
                    name="operator"
                    label="Operator"
                    options={constraintOperators}
                    value={localConstraint.operator}
                    onChange={(
                        e: React.ChangeEvent<{
                            name?: string;
                            value: unknown;
                        }>
                    ) => setOperator(e.target.value as string)}
                    className={styles.headerSelect}
                />
            </div>

            <p className={styles.headerText}>
                {resolveText(
                    localConstraint.operator,
                    localConstraint.contextName
                )}
            </p>
            <ConditionallyRender
                condition={action === SAVE}
                show={<p className={styles.editingBadge}>Updating...</p>}
                elseShow={<p className={styles.editingBadge}>Editing</p>}
            />

            <a
                href="http://docs.getunleash.ai/"
                style={{ marginLeft: 'auto' }}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Help className={styles.help} />
            </a>
        </div>
    );
};
