import { useParams } from 'react-router-dom';
import useFeature from '../../../../hooks/api/getters/useFeature/useFeature';
import { IFeatureViewParams } from '../../../../interfaces/params';
import FeatureViewEnvironment from '../FeatureViewEnvironment/FeatureViewEnvironment';
import FeatureViewMetaData from '../FeatureViewMetaData/FeatureViewMetaData';
import FeatureOverviewStrategies from './FeatureOverviewStrategies/FeatureOverviewStrategies';

const FeatureOverview = () => {
    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <FeatureViewMetaData />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                }}
            >
                <FeatureOverviewStrategies />
            </div>
        </div>
    );
};

export default FeatureOverview;
