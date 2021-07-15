import { MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './NavigationLink.styles';

interface INavigationLinkProps {
    path: string;
    text: string;
    handleClose: () => void;
}

const NavigationLink = ({ path, text, handleClose }: INavigationLinkProps) => {
    const styles = useStyles();

    return (
        <Link className={styles.navMenuLink} to={path}>
            <MenuItem
                className={styles.menuItem}
                onClick={() => {
                    handleClose();
                }}
            >
                <span className={styles.menuItemBox} />
                {text}
            </MenuItem>
        </Link>
    );
};

export default NavigationLink;
