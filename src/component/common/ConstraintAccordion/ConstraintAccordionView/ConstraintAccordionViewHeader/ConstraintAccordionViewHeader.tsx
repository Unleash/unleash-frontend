import StringTruncator from '../../../StringTruncator/StringTruncator';
import { Chip, IconButton } from '@material-ui/core';
import { ConstraintIcon } from '../../ConstraintIcon';
import { Delete, Edit } from '@material-ui/icons';
import { IConstraint } from '../../../../../interfaces/strategy';

import { useStyles } from '../../ConstraintAccordion.styles';
import ConditionallyRender from '../../../ConditionallyRender';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { UPDATE_FEATURE_STRATEGY } from 'component/providers/AccessProvider/permissions';
import { useParams } from 'react-router-dom';
import { IFeatureViewParams } from 'interfaces/params';

interface IConstraintAccordionViewHeader {
    compact: boolean;
    constraint: IConstraint;
    onDelete: () => void;
    onEdit: () => void;
    nonExpandable: boolean;
    environmentId: string;
}

export const ConstraintAccordionViewHeader = ({
    compact,
    constraint,
    onEdit,
    onDelete,
    nonExpandable,
    environmentId,
}: IConstraintAccordionViewHeader) => {
    const styles = useStyles();
    const { projectId } = useParams<IFeatureViewParams>();

    const minWidthHeader = compact ? '75px' : '175px';

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerMetaInfo}>
                <ConstraintIcon />
                <div style={{ minWidth: minWidthHeader }}>
                    <StringTruncator
                        text={constraint.contextName}
                        maxWidth="175px"
                    />
                </div>

                <div style={{ minWidth: '220px' }}>
                    <p className={styles.operator}>{constraint.operator}</p>
                </div>
                <ConditionallyRender
                    condition={nonExpandable}
                    show={<Chip label={constraint.value} />}
                    elseShow={
                        <p>
                            {constraint?.values?.length}+ values. Expand to view
                        </p>
                    }
                />
            </div>
            <div className={styles.headerActions}>
                <PermissionIconButton
                    onClick={() => onEdit()}
                    permission={UPDATE_FEATURE_STRATEGY}
                    projectId={projectId}
                    environmentId={environmentId}
                >
                    <Edit />
                </PermissionIconButton>
                <PermissionIconButton
                    onClick={() => onDelete()}
                    permission={UPDATE_FEATURE_STRATEGY}
                    projectId={projectId}
                    environmentId={environmentId}
                >
                    <Delete />
                </PermissionIconButton>
            </div>
        </div>
    );
};
