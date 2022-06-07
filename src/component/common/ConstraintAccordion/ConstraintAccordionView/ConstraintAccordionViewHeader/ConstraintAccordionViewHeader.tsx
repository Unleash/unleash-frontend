import StringTruncator from 'component/common/StringTruncator/StringTruncator';
import {
    Chip,
    useMediaQuery,
    IconButton,
    Tooltip,
    styled,
} from '@mui/material';
import { ConstraintIcon } from 'component/common/ConstraintAccordion/ConstraintIcon';
import { Delete, Edit } from '@mui/icons-material';
import { IConstraint } from 'interfaces/strategy';

import { useStyles } from 'component/common/ConstraintAccordion/ConstraintAccordion.styles';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import React from 'react';
import { formatConstraintValue } from 'utils/formatConstraintValue';
import { useLocationSettings } from 'hooks/useLocationSettings';
import { ConstraintOperator } from 'component/common/ConstraintAccordion/ConstraintOperator/ConstraintOperator';
import classnames from 'classnames';

// const StyledValuesDiv = styled('div')(({ theme }) => ({
//     display: '-webkit-box',
//     WebkitLineClamp: 1,
//     WebkitBoxOrient: 'vertical',
//     overflow: 'hidden',
//     [theme.breakpoints.down('lg')]: {
//         maxWidth: '160px',
//     },
//     [theme.breakpoints.down(1000)]: {
//         maxWidth: '800px',
//     },
//     [theme.breakpoints.down(830)]: {
//         maxWidth: '250px',
//     },
//     [theme.breakpoints.down(770)]: {
//         maxWidth: '200px',
//     },
//     [theme.breakpoints.down(710)]: {
//         margin: theme.spacing(1, 0),
//         maxWidth: '800px',
//     },
//     [theme.breakpoints.down(468)]: {
//         maxWidth: '250px',
//     },
//     '& .MuiChip-label': {
//         whiteSpace: 'wrap',
//     },
// }));

const StyledSingleValueChip = styled(Chip)(({ theme }) => ({
    [theme.breakpoints.down(710)]: {
        margin: theme.spacing(1, 0),
    },
}));

interface IConstraintAccordionViewHeaderProps {
    compact: boolean;
    constraint: IConstraint;
    onDelete?: () => void;
    onEdit?: () => void;
    singleValue: boolean;
}

export const ConstraintAccordionViewHeader = ({
    compact,
    constraint,
    onEdit,
    onDelete,
    singleValue,
}: IConstraintAccordionViewHeaderProps) => {
    const { classes: styles } = useStyles();
    const { locationSettings } = useLocationSettings();
    const smallScreen = useMediaQuery(`(max-width:${790}px)`);

    const minWidthHeader = compact || smallScreen ? '100px' : '175px';

    const onEditClick =
        onEdit &&
        ((event: React.SyntheticEvent) => {
            event.stopPropagation();
            onEdit();
        });

    const onDeleteClick =
        onDelete &&
        ((event: React.SyntheticEvent) => {
            event.stopPropagation();
            onDelete();
        });

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
                <div className={styles.headerConstraintContainer}>
                    <ConstraintOperator constraint={constraint} />
                </div>
                <ConditionallyRender
                    condition={singleValue}
                    show={
                        <StyledSingleValueChip
                            label={formatConstraintValue(
                                constraint,
                                locationSettings
                            )}
                        />
                    }
                    elseShow={
                        <div className={styles.headerValuesContainer}>
                            {/* <StyledValuesDiv>
                                {constraint?.values
                                    ?.slice(0, 10)
                                    .map((value, index) => (
                                        <Chip
                                            key={index}
                                            label={
                                                <StringTruncator
                                                    text={value}
                                                    maxWidth="150"
                                                    maxLength={25}
                                                />
                                            }
                                            sx={{ marginRight: '4px' }}
                                        />
                                    ))}
                                {constraint?.values?.length &&
                                    constraint?.values?.length > 10 &&
                                    '...'}
                            </StyledValuesDiv> */}
                            <span
                                style={{
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    display: 'block',
                                }}
                            >
                                {constraint?.values
                                    ?.map(value => value)
                                    .join(', ')}
                            </span>
                            <p
                                className={classnames(
                                    styles.headerValuesExpand,
                                    'valuesExpandLabel'
                                )}
                            >
                                Expand to view all ({constraint?.values?.length}
                                )
                            </p>
                        </div>
                    }
                />
            </div>
            <div className={styles.headerActions}>
                <ConditionallyRender
                    condition={Boolean(onEditClick)}
                    show={() => (
                        <Tooltip title="Edit constraint" arrow>
                            <IconButton type="button" onClick={onEditClick}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    )}
                />
                <ConditionallyRender
                    condition={Boolean(onDeleteClick)}
                    show={() => (
                        <Tooltip title="Delete constraint" arrow>
                            <IconButton type="button" onClick={onDeleteClick}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    )}
                />
            </div>
        </div>
    );
};
