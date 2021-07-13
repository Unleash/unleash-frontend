import { Menu, MenuItem } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './NavigationMenu.styles';

interface INavigationMenuOptions {
    permission: string;
    path: string;
    text: string;
}

interface INavigationMenuProps {
    options: INavigationMenuOptions[];
    id: string;
    anchorEl: any;
    handleClose: () => void;
}

const NavigationMenu = ({
    options,
    id,
    handleClose,
    anchorEl,
}: INavigationMenuProps) => {
    const styles = useStyles();

    return (
        <Menu
            id={id}
            onClose={handleClose}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            style={{ top: '45px', left: '-90px' }}
            onMouseLeave={handleClose}
        >
            {options.map(option => {
                return (
                    <MenuItem
                        className={styles.menuItem}
                        key={option.path}
                        onClick={handleClose}
                    >
                        <Link className={styles.navMenuLink} to={option.path}>
                            <span className={styles.menuItemBox} />
                            {option.text}
                        </Link>
                    </MenuItem>
                );
            })}
        </Menu>
    );
};

export default NavigationMenu;
