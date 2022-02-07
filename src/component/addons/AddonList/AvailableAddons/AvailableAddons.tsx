import { ReactElement, useContext } from 'react';
import PageContent from '../../../common/PageContent/PageContent';
import {
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import ConditionallyRender from '../../../common/ConditionallyRender/ConditionallyRender';
import { CREATE_ADDON } from '../../../providers/AccessProvider/permissions';
import { useHistory } from 'react-router-dom';
import AccessContext from '../../../../contexts/AccessContext';

interface IProvider {
    name: string;
    displayName: string;
    description: string;
    documentationUrl: string;
    parameters: object[];
    events: string[];
}

interface IAvailableAddonsProps {
    AddonIcon: (name: string) => ReactElement;
    providers: IProvider[];
}

const AvailableAddons = ({ providers, AddonIcon }: IAvailableAddonsProps) => {
    const history = useHistory();
    const { hasAccess } = useContext(AccessContext);

    const renderProvider = (provider: IProvider) => (
        <ListItem key={provider.name}>
            <ListItemAvatar>{AddonIcon(provider.name)}</ListItemAvatar>
            <ListItemText
                primary={provider.displayName}
                secondary={provider.description}
            />
            <ListItemSecondaryAction>
                <ConditionallyRender
                    condition={hasAccess(CREATE_ADDON)}
                    show={
                        <Button
                            variant="contained"
                            name="device_hub"
                            onClick={() =>
                                history.push(`/addons/create/${provider.name}`)
                            }
                            title="Configure"
                        >
                            Configure
                        </Button>
                    }
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
    return (
        <PageContent headerContent="Available addons">
            <List>
                {providers.map((provider: IProvider) =>
                    renderProvider(provider)
                )}
            </List>
        </PageContent>
    );
};

export default AvailableAddons;
