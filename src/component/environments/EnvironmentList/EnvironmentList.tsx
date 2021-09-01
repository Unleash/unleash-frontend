import HeaderTitle from '../../common/HeaderTitle';

import ResponsiveButton from '../../common/ResponsiveButton/ResponsiveButton';
import { Add, CloudCircle, Delete } from '@material-ui/icons';
import PageContent from '../../common/PageContent';
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from '@material-ui/core';
import useEnvironments from '../../../hooks/api/getters/useEnvironments/useEnvironments';
import { IEnvironment } from '../../../interfaces/environments';
import ConditionallyRender from '../../common/ConditionallyRender';
import { useContext } from 'react';
import AccessContext from '../../../contexts/AccessContext';
import { Link, useHistory } from 'react-router-dom';
import { DELETE_CONTEXT_FIELD } from '../../AccessProvider/permissions';

const EnvironmentList = () => {
    const { hasAccess } = useContext(AccessContext);
    const { environments } = useEnvironments();
    const history = useHistory();

    const environmentList = () =>
        environments.map((env: IEnvironment) => (
            <ListItem key={env.name}>
                <ListItemIcon>
                    <CloudCircle />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Link to={`/environments/${env.name}`}>
                            <strong>{env.name}</strong>
                        </Link>
                    }
                    secondary={env.displayName}
                />
                <ConditionallyRender
                    condition={hasAccess(DELETE_CONTEXT_FIELD)}
                    show={
                        <Tooltip title="Delete context field">
                            <IconButton aria-label="delete" onClick={() => {}}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    }
                />
            </ListItem>
        ));

    const navigateToCreateEnvironment = () => {
        history.push('/environments/create');
    };

    return (
        <PageContent
            headerContent={
                <HeaderTitle
                    title="Environments"
                    actions={
                        <>
                            <ResponsiveButton
                                onClick={navigateToCreateEnvironment}
                                maxWidth="700px"
                                tooltip="Add environment"
                                Icon={Add}
                            >
                                Add Environment
                            </ResponsiveButton>
                        </>
                    }
                />
            }
        >
            <List>{environmentList()}</List>
        </PageContent>
    );
};

export default EnvironmentList;
