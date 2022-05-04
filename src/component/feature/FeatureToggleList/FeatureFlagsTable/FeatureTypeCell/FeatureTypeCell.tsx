import { VFC } from 'react';
import { Tooltip } from '@mui/material';
import { getFeatureTypeIcons } from 'utils/getFeatureTypeIcons';
import useFeatureTypes from 'hooks/api/getters/useFeatureTypes/useFeatureTypes';
import { useStyles } from './FeatureTypeCell.styles';

interface IFeatureTypeProps {
    type?: string;
}

export const FeatureTypeCell: VFC<IFeatureTypeProps> = ({ type }) => {
    const { classes: styles } = useStyles();
    const { featureTypes } = useFeatureTypes();
    const IconComponent = getFeatureTypeIcons(type);

    const typeName = featureTypes.filter(t => t.id === type).map(t => t.name);

    const title = `This is a "${typeName || type}" toggle`;

    return (
        <Tooltip arrow placement="right" title={title}>
            <IconComponent data-loading className={styles.icon} />
        </Tooltip>
    );
};
