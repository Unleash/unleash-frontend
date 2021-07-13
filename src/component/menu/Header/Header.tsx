import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Container,
    Typography,
    IconButton,
    Tooltip,
    Button,
    Menu,
    MenuItem,
} from '@material-ui/core';
import { DrawerMenu } from '../drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Breadcrumb from '../breadcrumb';
import SettingsIcon from '@material-ui/icons/Settings';
import UserProfile from '../../user/UserProfile';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { ReactComponent as UnleashLogo } from '../../../assets/img/logo-dark-with-text.svg';
import { ReactComponent as UnleashLogoIconOnly } from '../../../assets/img/logo-dark.svg';

import { useStyles } from './Header.styles';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
import { useCommonStyles } from '../../../common.styles';
import { ADMIN } from '../../AccessProvider/permissions';
import useUser from '../../../hooks/api/getters/useUser/useUser';
import { IPermission } from '../../../interfaces/user';
import NavigationMenu from './NavigationMenu/NavigationMenu';
import { adminOptions, advancedOptions } from './navOptions';

const Header = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState();
    const [anchorElAdvanced, setAnchorElAdvanced] = useState();
    const [admin, setAdmin] = useState(false);
    const { permissions } = useUser();
    const commonStyles = useCommonStyles();
    const { uiConfig } = useUiConfig();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const styles = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => setOpenDrawer(prev => !prev);
    const handleClose = () => setAnchorEl(null);
    const handleCloseAdvanced = () => setAnchorElAdvanced(null);

    useEffect(() => {
        const admin = permissions.find(
            (element: IPermission) => element.permission === ADMIN
        );

        if (admin) {
            setAdmin(true);
        }
    }, [permissions]);

    const selectOptions = () => {
        if (admin) {
            return adminOptions;
        }
        return adminOptions.filter(option => option.permission !== ADMIN);
    };

    const { links, name, flags } = uiConfig;

    return (
        <>
            <AppBar className={styles.header} position="static">
                <Container className={styles.container}>
                    {/* <IconButton
                        className={styles.drawerButton}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Link to="/" className={commonStyles.flexRow}>
                        <ConditionallyRender
                            condition={smallScreen}
                            show={
                                <UnleashLogoIconOnly
                                    className={styles.logoOnly}
                                />
                            }
                            elseShow={<UnleashLogo className={styles.logo} />}
                        />
                    </Link>
                    {/* <ConditionallyRender
                        condition={!smallScreen}
                        show={
                            <Typography
                                variant="h1"
                                className={styles.headerTitle}
                            >
                                <Route path="/:path" component={Breadcrumb} />
                            </Typography>
                        }
                    /> */}

                    <div className={styles.links}>
                        <ConditionallyRender
                            condition={flags?.P}
                            show={<Link to="/projects-new">Projects</Link>}
                        />

                        <button
                            rol="button"
                            className={styles.advancedNavButton}
                            tabIndex={0}
                            onClick={e => setAnchorElAdvanced(e.currentTarget)}
                            onMouseEnter={e =>
                                setAnchorElAdvanced(e.currentTarget)
                            }
                        >
                            Advanced
                        </button>
                        <NavigationMenu
                            id="settings-navigation"
                            options={advancedOptions}
                            anchorEl={anchorElAdvanced}
                            handleClose={handleCloseAdvanced}
                        />
                    </div>

                    <div className={styles.userContainer}>
                        <Tooltip title="Go to the documentation">
                            <a
                                href="https://docs.getunleash.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.docsLink}
                            >
                                <MenuBookIcon className={styles.docsIcon} />
                            </a>
                        </Tooltip>
                        <IconButton
                            onClick={e => setAnchorEl(e.currentTarget)}
                            onMouseEnter={e => setAnchorEl(e.currentTarget)}
                        >
                            <SettingsIcon className={styles.docsIcon} />
                        </IconButton>
                        <NavigationMenu
                            id="settings-navigation"
                            options={selectOptions()}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                        />

                        <UserProfile />
                    </div>
                </Container>
            </AppBar>
        </>
    );
};

export default Header;
