import { Fragment, VFC } from 'react';
import {
    PlaygroundSegmentSchema,
    PlaygroundRequestSchema,
} from 'component/playground/Playground/interfaces/playground.model';
import { ConstraintExecution } from '../ConstraintExecution/ConstraintExecution';
import { CancelOutlined, DonutLarge } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { StrategySeparator } from 'component/common/StrategySeparator/StrategySeparator';
import { useStyles } from './SegmentExecution.styles';
import { styled, Typography } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';

interface ISegmentExecutionProps {
    segments?: PlaygroundSegmentSchema[];
    input?: PlaygroundRequestSchema;
}

const SegmentExecutionLinkWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: theme.fontSizes.smallBody,
    position: 'relative',
}));

const SegmentExecutionHeader = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const SegmentExecutionWrapper = styled('div')(({ theme }) => ({
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadiusMedium,
    border: `1px solid ${theme.palette.dividerAlternative}`,
    background: theme.palette.neutral.light,
}));

const SegmentExecutionConstraintWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2, 2, 2),
}));

const SegmentResultTextWrapper = styled('div')(({ theme }) => ({
    color: theme.palette.error.main,
    display: 'inline-flex',
    justifyContent: 'center',
    marginRight: theme.spacing(1.5),
    gap: theme.spacing(1),
}));

export const SegmentExecution: VFC<ISegmentExecutionProps> = ({
    segments,
    input,
}) => {
    const { classes: styles } = useStyles();

    if (!segments) return null;

    return (
        <>
            {segments.map((segment, index) => (
                <Fragment key={segment.id}>
                    <ConditionallyRender
                        condition={index > 0}
                        show={<StrategySeparator text="AND" />}
                    />
                    <SegmentExecutionWrapper>
                        <SegmentExecutionHeader>
                            <SegmentExecutionLinkWrapper>
                                <DonutLarge color="secondary" sx={{ mr: 1 }} />{' '}
                                Segment:{' '}
                                <Link
                                    to={`/segments/edit/${segment.id}`}
                                    className={styles.link}
                                >
                                    {segment.name}
                                </Link>
                            </SegmentExecutionLinkWrapper>
                            <ConditionallyRender
                                condition={!Boolean(segment.result)}
                                show={
                                    <SegmentResultTextWrapper>
                                        <Typography
                                            variant={'subtitle2'}
                                            sx={{ pt: 0.25 }}
                                        >
                                            segment is false
                                        </Typography>
                                        <span>
                                            <CancelOutlined />
                                        </span>
                                    </SegmentResultTextWrapper>
                                }
                            />
                        </SegmentExecutionHeader>
                        <SegmentExecutionConstraintWrapper>
                            <ConditionallyRender
                                condition={segment.constraints.length > 0}
                                show={() => (
                                    <ConstraintExecution
                                        constraints={segment.constraints}
                                        input={input}
                                        compact
                                    />
                                )}
                                elseShow={() => (
                                    <Typography>
                                        This segment has no constraints.
                                    </Typography>
                                )}
                            />
                        </SegmentExecutionConstraintWrapper>
                    </SegmentExecutionWrapper>
                </Fragment>
            ))}
        </>
    );
};
