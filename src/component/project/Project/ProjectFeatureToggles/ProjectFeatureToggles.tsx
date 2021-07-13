import { Button, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { IFeatureToggleListItem } from '../../../../interfaces/featureToggle';
import ConditionallyRender from '../../../common/ConditionallyRender';
import { PROJECTFILTERING } from '../../../common/flags';
import HeaderTitle from '../../../common/HeaderTitle';
import PageContent from '../../../common/PageContent';
import ResponsiveButton from '../../../common/ResponsiveButton/ResponsiveButton';
import FeatureToggleListNew from '../../../feature/FeatureToggleListNew/FeatureToggleListNew';
import { useStyles } from './ProjectFeatureToggles.styles';

interface IProjectFeatureToggles {
    features: IFeatureToggleListItem[];
    loading: boolean;
}

const ProjectFeatureToggles = ({
    features,
    loading,
}: IProjectFeatureToggles) => {
    const styles = useStyles();
    const { id } = useParams();
    const history = useHistory();

    return (
        <PageContent
            className={styles.container}
            headerContent={
                <HeaderTitle
                    className={styles.title}
                    title="Feature toggles"
                    actions={
                        <>
                            <ConditionallyRender
                                condition={PROJECTFILTERING}
                                show={
                                    <IconButton
                                        className={styles.iconButton}
                                        data-loading
                                    >
                                        <FilterListIcon
                                            className={styles.icon}
                                        />
                                    </IconButton>
                                }
                            />
                            <ResponsiveButton
                                onClick={() => history.push('/features/create')}
                                maxWidth="700px"
                                tooltip="New feature toggle"
                                Icon={Add}
                            >
                                New feature toggle
                            </ResponsiveButton>
                        </>
                    }
                />
            }
        >
            <FeatureToggleListNew
                features={features}
                loading={loading}
                projectId={id}
            />
        </PageContent>
    );
};

export default ProjectFeatureToggles;
