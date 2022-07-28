import { MouseEvent, useState, VFC } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { AddToPhotos as CopyIcon } from '@mui/icons-material';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { IFeatureEnvironment } from 'interfaces/featureToggle';

interface ICopyStrategyIconMenuProps {
    environments: IFeatureEnvironment['name'][];
}

export const CopyStrategyIconMenu: VFC<ICopyStrategyIconMenuProps> = ({
    environments,
}) => {
    const projectId = useRequiredPathParam('projectId');
    const featureId = useRequiredPathParam('featureId');
    // TODO: strategy details
    /// TODO: permissions
    // TODO: API
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Tooltip title="Copy to another environment">
                <IconButton
                    size="large"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <CopyIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {environments.map(environment => (
                    <MenuItem key={environment} onClick={handleClose}>
                        {environment}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
