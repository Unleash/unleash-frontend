import { IconButton } from '@material-ui/core';
import { Add, Label } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import useFeature from '../../../../../hooks/api/getters/useFeature/useFeature';
import { IFeatureViewParams } from '../../../../../interfaces/params';
import { useStyles } from './FeatureOverviewTags.styles';

const FeatureOverviewTags = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.tagheaderContainer}>
                <div className={styles.tagHeader}>
                    <Label className={styles.tag} />
                    <h4 className={styles.tagHeaderText}>Tags</h4>
                </div>

                <IconButton>
                    <Add />
                </IconButton>
            </div>

            <div className={styles.tagContent}>TagContent</div>
        </div>
    );
};

export default FeatureOverviewTags;
