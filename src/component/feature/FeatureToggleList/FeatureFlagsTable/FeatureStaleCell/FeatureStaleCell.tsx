import { VFC } from 'react';
import { Typography } from '@mui/material';
import { useStyles } from './FeatureStaleCell.styles';
import classnames from 'classnames';

interface IFeatureStaleCellProps {
    stale?: boolean;
}

export const FeatureStaleCell: VFC<IFeatureStaleCellProps> = ({ stale }) => {
    const { classes: styles } = useStyles();
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
