import { useParams, useHistory } from 'react-router-dom';
import { IFeatureViewParams } from '../../../../../../../interfaces/params';
import ConditionallyRender from '../../../../../../common/ConditionallyRender';
import NoItemsStrategies from '../../../../../../common/NoItems/NoItemsStrategies/NoItemsStrategies';
import FeatureOverviewEnvironmentStrategies from '../FeatureOverviewEnvironmentStrategies/FeatureOverviewEnvironmentStrategies';

import { useStyles } from '../FeatureOverviewEnvironment.styles';
import { IFeatureEnvironment } from '../../../../../../../interfaces/featureToggle';
import ResponsiveButton from '../../../../../../common/ResponsiveButton/ResponsiveButton';
import { Add } from '@material-ui/icons';
import { CREATE_FEATURE_STRATEGY } from '../../../../../../providers/AccessProvider/permissions';
import { useContext } from 'react';
import AccessContext from '../../../../../../../contexts/AccessContext';

interface IFeatureOverviewEnvironmentBodyProps {
    getOverviewText: () => string;
    featureEnvironment?: IFeatureEnvironment;
}

const FeatureOverviewEnvironmentBody = ({
    featureEnvironment,
    getOverviewText,
}: IFeatureOverviewEnvironmentBodyProps) => {
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const styles = useStyles();
    const history = useHistory();
    const { hasAccess } = useContext(AccessContext);
    const strategiesLink = `/projects/${projectId}/features2/${featureId}/strategies?environment=${featureEnvironment?.name}&addStrategy=true`;

    if (!featureEnvironment) return null;

    return (
        <div className={styles.accordionBody}>
            <div className={styles.accordionBodyInnerContainer}>
                <div className={styles.resultInfo}>
                    <div className={styles.leftWing} />
                    <div className={styles.separatorText}>
                        {getOverviewText()}
                    </div>
                    <div className={styles.rightWing} />
                </div>

                <ConditionallyRender
                    condition={
                        featureEnvironment?.strategies.length > 0 &&
                        hasAccess(
                            CREATE_FEATURE_STRATEGY,
                            projectId,
                            featureEnvironment.name
                        )
                    }
                    show={
                        <>
                            <div className={styles.linkContainer}>
                                <ResponsiveButton
                                    Icon={Add}
                                    onClick={() => history.push(strategiesLink)}
                                    maxWidth="700px"
                                >
                                    Add strategy
                                </ResponsiveButton>
                            </div>
                            <FeatureOverviewEnvironmentStrategies
                                strategies={featureEnvironment?.strategies}
                                environmentName={featureEnvironment.name}
                            />
                        </>
                    }
                    elseShow={
                        <NoItemsStrategies
                            envName={featureEnvironment.name}
                            onClick={() => history.push(strategiesLink)}
                            projectId={projectId}
                        />
                    }
                />
            </div>
        </div>
    );
};

export default FeatureOverviewEnvironmentBody;
