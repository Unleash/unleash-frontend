import { Grid } from '@material-ui/core';
import { UPDATE_STRATEGY } from '../../providers/AccessProvider/permissions';
import PageContent from '../../common/PageContent/PageContent';
import useStrategies from '../../../hooks/api/getters/useStrategies/useStrategies';
import { useHistory, useParams } from 'react-router-dom';
import { useFeatures } from '../../../hooks/api/getters/useFeatures/useFeatures';
import useApplications from '../../../hooks/api/getters/useApplications/useApplications';
import { StrategyDetails } from './StrategyDetails/StrategyDetails';
import HeaderTitle from '../../common/HeaderTitle';
import PermissionIconButton from '../../common/PermissionIconButton/PermissionIconButton';
import { Edit } from '@material-ui/icons';
import ConditionallyRender from '../../common/ConditionallyRender';

export const StrategyView = () => {
    const { name } = useParams<{ name: string }>();
    const { strategies } = useStrategies();
    const { features } = useFeatures();
    const { applications } = useApplications();
    const history = useHistory();

    const toggles = features.filter(toggle => {
        return toggle?.strategies.findIndex(s => s.name === name) > -1;
    });

    const strategy = strategies.find(n => n.name === name);

    const handleEdit = () => {
        history.push(`/strategies/${name}/edit`);
    };

    if (!strategy) return null;
    return (
        <PageContent
            headerContent={
                <HeaderTitle
                    title={strategy?.name}
                    subtitle={strategy?.description}
                    actions={
                        <ConditionallyRender
                            condition={strategy.editable}
                            show={
                                <PermissionIconButton
                                    permission={UPDATE_STRATEGY}
                                    tooltip={'Edit strategy'}
                                    data-loading
                                    onClick={handleEdit}
                                >
                                    <Edit titleAccess="Edit strategy" />
                                </PermissionIconButton>
                            }
                        />
                    }
                />
            }
        >
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <StrategyDetails
                        strategy={strategy}
                        toggles={toggles}
                        applications={applications}
                    />
                </Grid>
            </Grid>
        </PageContent>
    );
};
