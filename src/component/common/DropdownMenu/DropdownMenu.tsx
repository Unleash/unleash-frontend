import React, { ReactElement, ReactNode } from 'react';
import { Menu } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { DropdownButton } from '..';
import styles from '../common.module.scss';

interface IDropdownMenuProps {
    renderOptions: () => ReactNode;
    id: string;
    title: string;
    className?: string;
    callback: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    icon?: ReactElement;
    label: string;
    style?: object;
    startIcon?: ReactElement;
}

const DropdownMenu = ({
    renderOptions,
    id,
    title,
    callback,
    icon = <ArrowDropDown />,
    label,
    style,
    startIcon,
    className,
    ...rest
}: IDropdownMenuProps) => {
    const [anchor, setAnchor] = React.useState(null);

    const handleOpen = (e: Event) => setAnchor(e.currentTarget);

    const handleClose = (e: Event) => {
        if (callback && typeof callback === 'function') {
            callback(e);
        }

        setAnchor(null);
    };

    return (
        <>
            <DropdownButton
                id={id}
                label={label}
                title={title}
                startIcon={startIcon}
                onClick={handleOpen}
                style={style}
                aria-controls={id}
                aria-haspopup="true"
                icon={icon}
                {...rest}
            />
            <Menu
                id={id}
                className={styles.dropdownMenu}
                onClick={() => handleClose}
                anchorEl={anchor}
                open={Boolean(anchor)}
            >
                {renderOptions()}
            </Menu>
        </>
    );
};

export default DropdownMenu;
