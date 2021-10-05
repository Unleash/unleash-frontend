import { useStyles } from './FeatureVariants.styles';
import { useHistory, useParams } from 'react-router';
import useFeature from '../../../../hooks/api/getters/useFeature/useFeature';
import { IFeatureViewParams } from '../../../../interfaces/params';
import EditVariants from '../../variant/update-variant-container';
import FeatureOverviewVariants from './FeatureVariantsList/FeatureVariantsList';

const FeatureVariants = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <FeatureOverviewVariants />
        </div>
    );
};

export default FeatureVariants;
