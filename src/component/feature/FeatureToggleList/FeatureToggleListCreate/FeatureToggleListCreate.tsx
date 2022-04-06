import { useContext } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Add } from '@material-ui/icons';
import ConditionallyRender from 'component/common/ConditionallyRender/ConditionallyRender';
import { CREATE_FEATURE } from 'component/providers/AccessProvider/permissions';
import AccessContext from 'contexts/AccessContext';
import { getCreateTogglePath } from 'utils/routePathHelpers';
import { NAVIGATE_TO_CREATE_FEATURE } from 'utils/testIds';
import {
    resolveFilteredProjectId,
    IFeaturesFilter,
} from 'hooks/useFeaturesFilter';
import { IFlags } from 'interfaces/uiConfig';

interface IFeatureToggleListCreateProps {
    loading: boolean;
    flags: IFlags;
    filter: IFeaturesFilter;
}

export const FeatureToggleListCreate = ({
    loading,
    flags,
    filter,
}: IFeatureToggleListCreateProps) => {
    const { hasAccess } = useContext(AccessContext);
    const smallScreen = useMediaQuery('(max-width:800px)');

    const resolvedProject = resolveFilteredProjectId(filter);
    const createURL = getCreateTogglePath(resolvedProject, flags.E);

    return (
        <ConditionallyRender
            condition={smallScreen}
            show={
                <Tooltip title="Create feature toggle">
                    <IconButton
                        component={Link}
                        to={createURL}
                        data-test={NAVIGATE_TO_CREATE_FEATURE}
                        disabled={!hasAccess(CREATE_FEATURE, resolvedProject)}
                    >
                        <Add titleAccess="New" />
                    </IconButton>
                </Tooltip>
            }
            elseShow={
                <Button
                    to={createURL}
                    color="primary"
                    variant="contained"
                    component={Link}
                    data-test={NAVIGATE_TO_CREATE_FEATURE}
                    disabled={!hasAccess(CREATE_FEATURE, resolvedProject)}
                    className={classnames({ skeleton: loading })}
                >
                    New feature toggle
                </Button>
            }
        />
    );
};
