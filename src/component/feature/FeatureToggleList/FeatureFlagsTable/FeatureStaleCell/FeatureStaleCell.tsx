import { VFC } from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './FeatureStaleCell.styles';
import classnames from 'classnames';

interface IFeatureStaleCellProps {
    stale?: boolean;
}

export const FeatureStaleCell: VFC<IFeatureStaleCellProps> = ({ stale }) => {
    const styles = useStyles();
    return (
        <Typography
            component="span"
            className={classnames(styles.status, stale && styles.stale)}
            data-loading
        >
            {stale ? 'Stale' : 'Active'}
        </Typography>
    );
};
