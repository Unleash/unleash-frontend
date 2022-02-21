import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import LanguageIcon from '@material-ui/icons/Language';
import PieChart from '@material-ui/icons/PieChart';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { ElementType } from 'react';

export const getHumanReadableStrategyName = (strategyName: string) => {
    const humanReadableStrategy = nameMapping[strategyName];

    if (humanReadableStrategy) {
        return humanReadableStrategy.name;
    }

    return strategyName;
};

export const getFeatureStrategyIcon = (strategyName: string): ElementType => {
    switch (strategyName) {
        case 'remoteAddress':
            return LanguageIcon;
        case 'flexibleRollout':
            return PieChart;
        case 'userWithId':
            return PeopleIcon;
        case 'applicationHostname':
            return LocationOnIcon;
        default:
            return PowerSettingsNewIcon;
    }
};

const nameMapping: Record<string, { name: string; description: string }> = {
    applicationHostname: {
        name: 'Hosts',
        description: 'Enable the feature for a specific set of hostnames',
    },
    default: {
        name: 'Standard',
        description:
            'The standard strategy is strictly on / off for your entire userbase.',
    },
    flexibleRollout: {
        name: 'Gradual rollout',
        description:
            'Roll out to a percentage of your userbase, and ensure that the experience is the same for the user on each visit.',
    },
    gradualRolloutRandom: {
        name: 'Randomized',
        description:
            'Roll out to a percentage of your userbase and randomly enable the feature on a per request basis',
    },
    gradualRolloutSessionId: {
        name: 'Sessions',
        description:
            'Roll out to a percentage of your userbase and configure stickiness based on sessionId',
    },
    gradualRolloutUserId: {
        name: 'Users',
        description:
            'Roll out to a percentage of your userbase and configure stickiness based on userId',
    },
    remoteAddress: {
        name: 'IPs',
        description: 'Enable the feature for a specific set of IP addresses',
    },
    userWithId: {
        name: 'UserIDs',
        description: 'Enable the feature for a specific set of userIds',
    },
};
