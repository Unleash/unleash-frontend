import { capitalize, IconButton } from '@material-ui/core';
import classnames from 'classnames';
import { useParams } from 'react-router-dom';
import { useCommonStyles } from '../../../../../common.styles';
import useFeature from '../../../../../hooks/api/getters/useFeature/useFeature';
import { getFeatureTypeIcons } from '../../../../../utils/get-feature-type-icons';
import ConditionallyRender from '../../../../common/ConditionallyRender';
import { useStyles } from './FeatureViewMetadata.styles';

import { Edit } from '@material-ui/icons';

const FeatureViewMetaData = () => {
    const styles = useStyles();
    const commonStyles = useCommonStyles();
    const { projectId, featureId } = useParams();

    const { feature } = useFeature(projectId, featureId);

    const { project, description, type } = feature;

    const IconComponent = getFeatureTypeIcons(type);

    return (
        <div className={classnames(styles.container)}>
            <div className={styles.metaDataHeader}>
                <IconComponent className={styles.headerIcon} />{' '}
                <h3 className={styles.header}>
                    {capitalize(type || '')} toggle
                </h3>
            </div>
            <div className={styles.body}>
                <span className={styles.bodyItem}>Project: {project}</span>
                <ConditionallyRender
                    condition
                    show={
                        <span className={styles.bodyItem}>
                            <div>Description:</div>
                            <div className={styles.descriptionContainer}>
                                <p>{description}</p>
                                <IconButton>
                                    <Edit />
                                </IconButton>
                            </div>
                        </span>
                    }
                    elseShow={
                        <span>
                            No description.{' '}
                            <IconButton>
                                <Edit />
                            </IconButton>
                        </span>
                    }
                />
            </div>
        </div>
    );
};

export default FeatureViewMetaData;
