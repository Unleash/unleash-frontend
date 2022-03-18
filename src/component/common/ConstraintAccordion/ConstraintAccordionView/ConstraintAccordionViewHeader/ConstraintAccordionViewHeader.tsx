import StringTruncator from '../../../StringTruncator/StringTruncator';
import { Chip, useMediaQuery } from '@material-ui/core';
import { ConstraintIcon } from '../../ConstraintIcon';
import { Delete, Edit } from '@material-ui/icons';
import { IConstraint } from '../../../../../interfaces/strategy';

import { useStyles } from '../../ConstraintAccordion.styles';
import ConditionallyRender from '../../../ConditionallyRender';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { UPDATE_FEATURE_STRATEGY } from 'component/providers/AccessProvider/permissions';
import { useParams } from 'react-router-dom';
import { IFeatureViewParams } from 'interfaces/params';
import React from 'react';
import { formatConstraintValue } from 'component/common/Constraint/formatConstraintValue';
import { useLocationSettings } from 'hooks/useLocationSettings';

interface IConstraintAccordionViewHeaderProps {
    compact: boolean;
    constraint: IConstraint;
    onDelete: () => void;
    onEdit: () => void;
    singleValue: boolean;
    environmentId?: string;
}

export const ConstraintAccordionViewHeader = ({
    compact,
    constraint,
    onEdit,
    onDelete,
    singleValue,
    environmentId,
}: IConstraintAccordionViewHeaderProps) => {
    const styles = useStyles();
    const { locationSettings } = useLocationSettings();
    const { projectId } = useParams<IFeatureViewParams>();
    const smallScreen = useMediaQuery(`(max-width:${790}px)`);

    const minWidthHeader = compact || smallScreen ? '100px' : '175px';

    const onEditClick = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        onEdit();
    };

    const onDeleteClick = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        onDelete();
    };

    return (
        <div className={styles.headerContainer}>
            <ConstraintIcon />
            <div className={styles.headerMetaInfo}>
                <div style={{ minWidth: minWidthHeader }}>
                    <StringTruncator
                        text={constraint.contextName}
                        maxWidth="175px"
                        maxLength={25}
                    />
                </div>

                <div style={{ minWidth: '220px', position: 'relative' }}>
                    <ConditionallyRender
                        condition={Boolean(constraint.inverted)}
                        show={<div className={styles.negated}>NOT</div>}
                    />
                    <p className={styles.operator}>{constraint.operator}</p>
                </div>
                <div className={styles.headerViewValuesContainer}>
                    <ConditionallyRender
                        condition={singleValue}
                        show={
                            <Chip
                                label={formatConstraintValue(
                                    constraint,
                                    locationSettings
                                )}
                            />
                        }
                        elseShow={
                            <div className={styles.headerValuesContainer}>
                                <p className={styles.headerValues}>
                                    {constraint?.values?.length} values
                                </p>
                                <p className={styles.headerValuesExpand}>
                                    Expand to view
                                </p>
                            </div>
                        }
                    />
                </div>
            </div>
            <div className={styles.headerActions}>
                <PermissionIconButton
                    onClick={onEditClick}
                    permission={UPDATE_FEATURE_STRATEGY}
                    projectId={projectId}
                    environmentId={environmentId}
                >
                    <Edit titleAccess="edit constraint" />
                </PermissionIconButton>
                <PermissionIconButton
                    onClick={onDeleteClick}
                    permission={UPDATE_FEATURE_STRATEGY}
                    projectId={projectId}
                    environmentId={environmentId}
                >
                    <Delete titleAccess="delete constraint" />
                </PermissionIconButton>
            </div>
        </div>
    );
};
