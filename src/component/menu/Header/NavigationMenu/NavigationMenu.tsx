import { Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from '../NavigationLink/NavigationLink.styles';

interface INavigationMenuProps {
    options: any[];
    id: string;
    anchorEl: any;
    handleClose: () => void;
    style: Object;
}

export const NavigationMenu = ({
    options,
    id,
    handleClose,
    anchorEl,
    style,
}: INavigationMenuProps) => {
    const styles = useStyles();

    return (
        <Menu
            id={id}
            onClose={handleClose}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            style={style}
        >
            {options.map(option => {
                return (
                    <MenuItem
                        key={option.path}
                        className={styles.navMenuLink}
                        component={Link}
                        to={option.path}
                        onClick={handleClose}
                    >
                        <span className={styles.menuItemBox} />
                        {option.title}
                    </MenuItem>
                );
            })}
        </Menu>
    );
};
