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
        <MenuItem className={styles.menuItem} onClick={handleClose}>
            <Link className={styles.navMenuLink} to={path}>
                <span className={styles.menuItemBox} />
                {text}
            </Link>
        </MenuItem>
    );
};

export default NavigationLink;
