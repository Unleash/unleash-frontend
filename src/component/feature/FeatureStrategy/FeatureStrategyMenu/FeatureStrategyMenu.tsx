import PermissionButton from '../../../common/PermissionButton/PermissionButton';
import { useState } from 'react';
import { CREATE_FEATURE_STRATEGY } from '../../../providers/AccessProvider/permissions';
import { Popover } from '@material-ui/core';
import { FeatureStrategyMenuCards } from './FeatureStrategyMenuCards/FeatureStrategyMenuCards';

interface IFeatureStrategyMenuProps {
    label: string;
    projectId: string;
    featureId: string;
    environmentId: string;
}

export const FeatureStrategyMenu = ({
    label,
    projectId,
    featureId,
    environmentId,
}: IFeatureStrategyMenuProps) => {
    const [anchor, setAnchor] = useState(null);
    const isPopoverOpen = Boolean(anchor);
    const popoverId = isPopoverOpen ? 'FeatureStrategyMenuPopover' : undefined;

    return (
        <>
            <PermissionButton
                permission={CREATE_FEATURE_STRATEGY}
                projectId={projectId}
                environmentId={environmentId}
                onClick={event => setAnchor(event.currentTarget)}
                aria-describedby={popoverId}
            >
                {label}
            </PermissionButton>
            <Popover
                id={popoverId}
                open={isPopoverOpen}
                anchorEl={anchor}
                onClose={() => setAnchor(null)}
            >
                <FeatureStrategyMenuCards
                    projectId={projectId}
                    featureId={featureId}
                    environmentId={environmentId}
                />
            </Popover>
        </>
    );
};
