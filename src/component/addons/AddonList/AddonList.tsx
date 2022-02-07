import { ReactElement, useEffect } from 'react';
import ConfiguredAddons from './ConfiguredAddons/ConfiguredAddons';
import AvailableAddons from './AvailableAddons/AvailableAddons';
import { Avatar } from '@material-ui/core';
import { DeviceHub } from '@material-ui/icons';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';
import slackIcon from '../../../assets/icons/slack.svg';
import jiraIcon from '../../../assets/icons/jira.svg';
import webhooksIcon from '../../../assets/icons/webhooks.svg';
import teamsIcon from '../../../assets/icons/teams.svg';
import dataDogIcon from '../../../assets/icons/datadog.svg';
import { formatAssetPath } from '../../../utils/format-path';
import useAddons from '../../../hooks/api/getters/useAddons/useAddons';

const style = {
    width: '40px',
    height: '40px',
    marginRight: '16px',
    float: 'left',
};

const AddonIcon = (name: string): ReactElement => {
    switch (name) {
        case 'slack':
            return (
                <img
                    style={style}
                    alt="Slack Logo"
                    src={formatAssetPath(slackIcon)}
                />
            );
        case 'jira-comment':
            return (
                <img
                    style={style}
                    alt="JIRA Logo"
                    src={formatAssetPath(jiraIcon)}
                />
            );
        case 'webhook':
            return (
                <img
                    style={style}
                    alt="Generic Webhook logo"
                    src={formatAssetPath(webhooksIcon)}
                />
            );
        case 'teams':
            return (
                <img
                    style={style}
                    alt="Microsoft Teams Logo"
                    src={formatAssetPath(teamsIcon)}
                />
            );
        case 'datadog':
            return (
                <img
                    style={style}
                    alt="Datadog"
                    src={formatAssetPath(dataDogIcon)}
                />
            );
        default:
            return (
                <Avatar>
                    <DeviceHub />
                </Avatar>
            );
    }
};

const AddonList = () => {
    const { addons, providers, refetchAddons } = useAddons();

    useEffect(() => {
        if (addons.length === 0) {
            refetchAddons();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addons.length]);

    return (
        <>
            <ConditionallyRender
                condition={addons.length > 0}
                show={<ConfiguredAddons AddonIcon={AddonIcon} />}
            />

            <br />
            <AvailableAddons providers={providers} AddonIcon={AddonIcon} />
        </>
    );
};

export default AddonList;
