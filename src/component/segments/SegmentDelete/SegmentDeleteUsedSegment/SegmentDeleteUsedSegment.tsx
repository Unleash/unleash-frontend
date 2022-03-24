import React from 'react';
import Dialogue from 'component/common/Dialogue';
import { useStyles } from '../SegmentDeleteConfirm/SegmentDeleteConfirm.styles';
import { ISegment } from 'interfaces/segment';
import { IFeatureStrategy } from 'interfaces/strategy';
import { Link } from 'react-router-dom';
import { formatEditStrategyPath } from 'component/feature/FeatureStrategy/FeatureStrategyEdit/FeatureStrategyEdit';

interface ISegmentDeleteUsedSegmentProps {
    segment: ISegment;
    open: boolean;
    setDeldialogue: React.Dispatch<React.SetStateAction<boolean>>;
    strategies: IFeatureStrategy[] | undefined;
}

export const SegmentDeleteUsedSegment = ({
    segment,
    open,
    setDeldialogue,
    strategies,
}: ISegmentDeleteUsedSegmentProps) => {
    const styles = useStyles();
    const handleCancel = () => {
        setDeldialogue(false);
    };
    console.log(strategies);
    return (
        <Dialogue
            title="You can't delete a used segment"
            open={open}
            primaryButtonText="OK"
            onClick={handleCancel}
            hideSecondaryButton
        >
            <p>
                The following features are using <strong>{segment.name}</strong>{' '}
                in their strategies:
            </p>
            <ul>
                {strategies?.map(strategy => (
                    <li key={strategy.id}>
                        <Link
                            to={formatEditStrategyPath(
                                strategy.projectId!,
                                strategy.featureName!,
                                strategy.environment!,
                                strategy.id
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            {strategy.featureName!}
                        </Link>
                    </li>
                ))}
            </ul>
        </Dialogue>
    );
};
