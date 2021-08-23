import { Popover, List } from '@material-ui/core';
import NavigationLink from '../NavigationLink/NavigationLink';

interface INavigationMenuProps {
    options: any[];
    id: string;
    anchorEl: any;
    handleClose: () => void;
    style: Object;
}

const NavigationMenu = ({
    options,
    id,
    handleClose,
    anchorEl,
    style,
}: INavigationMenuProps) => {
    return (
        <Popover
            id={id}
            onClose={handleClose}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onMouseLeave={handleClose}
            style={style}
        >
            <List>
                {options.map(option => {
                    return (
                        <NavigationLink
                            key={option.path}
                            handleClose={handleClose}
                            path={option.path}
                            text={option.title}
                        />
                    );
                })}
            </List>
        </Popover>
    );
};

export default NavigationMenu;
