import { useTheme } from '@material-ui/core';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import FeatureStrategiesUIContext from '../../../../../../../contexts/FeatureStrategiesUIContext';
import useFeatureStrategy from '../../../../../../../hooks/api/getters/useFeatureStrategy/useFeatureStrategy';
import { IFeatureViewParams } from '../../../../../../../interfaces/params';
import FeatureStrategyExecution from '../../../FeatureStrategyExecution/FeatureStrategyExecution';
import FeatureStrategiesSeparator from '../../FeatureStrategiesSeparator/FeatureStrategiesSeparator';

const FeatureEnvironmentStrategyExecutionSeparator = () => {
    const theme = useTheme();
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '25px',
                marginTop: '1rem',
            }}
        >
            <div
                style={{
                    height: '1px',
                    borderBottom: `2px dotted ${theme.palette.primary.main}`,
                    width: '100%',
                    top: '0',
                }}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{ position: 'absolute', top: '-20px', zIndex: 300 }}
                >
                    <FeatureStrategiesSeparator text="OR" />
                </div>
            </div>
        </div>
    );
};

export default FeatureEnvironmentStrategyExecutionSeparator;
