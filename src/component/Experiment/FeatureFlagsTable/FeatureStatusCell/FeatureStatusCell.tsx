import { VFC } from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './FeatureStatusCell.styles';
import classnames from 'classnames';

interface IFeatureStatusCellProps {
    stale?: boolean;
}

export const FeatureStatusCell: VFC<IFeatureStatusCellProps> = ({ stale }) => {
    const styles = useStyles();
    return (
        <Typography
            component="span"
            className={classnames(styles.status, stale && styles.stale)}
        >
            {stale ? 'Stale' : 'Active'}
        </Typography>
    );
};
