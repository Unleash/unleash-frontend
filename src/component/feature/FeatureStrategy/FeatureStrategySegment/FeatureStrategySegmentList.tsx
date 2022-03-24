import React, { Fragment } from 'react';
import { ISegment } from 'interfaces/segment';
import { Chip } from '@material-ui/core';
import { useStyles } from 'component/feature/FeatureStrategy/FeatureStrategySegment/FeatureStrategySegmentList.styles';
import ConditionallyRender from 'component/common/ConditionallyRender';
import { useHistory } from 'react-router-dom';

interface IFeatureStrategySegmentListProps {
    segments: ISegment[];
    setSegments: React.Dispatch<React.SetStateAction<ISegment[]>>;
}

export const FeatureStrategySegmentList = ({
    segments,
    setSegments,
}: IFeatureStrategySegmentListProps) => {
    const styles = useStyles();
    const { createHref } = useHistory();

    const onRemove = (segmentId: number) => () => {
        setSegments(prev => {
            return prev.filter(segment => segment.id !== segmentId);
        });
    };

    const onOpen = (segmentId: number) => () => {
        const pathname = `/segments/edit/${segmentId}`;
        window.open(createHref({ pathname }), '_blank');
    };

    if (segments.length === 0) {
        return null;
    }

    return (
        <div className={styles.list}>
            {segments.map((segment, i) => (
                <Fragment key={segment.id}>
                    <span className={styles.segment}>
                        <Chip
                            label={segment.name}
                            onClick={onOpen(segment.id)}
                            onDelete={onRemove(segment.id)}
                        />
                    </span>
                    <ConditionallyRender
                        condition={i < segments.length - 1}
                        show={<span className={styles.and}>AND</span>}
                    />
                </Fragment>
            ))}
        </div>
    );
};
