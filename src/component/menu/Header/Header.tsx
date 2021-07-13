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
import { useStyles } from './Header.styles';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
import { useCommonStyles } from '../../../common.styles';
import { ADMIN, EDITOR } from '../../AccessProvider/permissions';
import useUser from '../../../hooks/api/getters/useUser/useUser';
import { IPermission } from '../../../interfaces/user';
import NavigationMenu from './NavigationMenu/NavigationMenu';

const options = [
    {
        path: '/admin/users',
        permission: ADMIN,
        text: 'Users and roles',
    },
    {
        path: '/admin/api',
        permission: ADMIN,
        text: 'API access',
    },
    {
        path: '/admin/auth',
        permission: ADMIN,
        text: 'Authentication',
    },
    {
        path: '/history',
        permission: ADMIN,
        text: 'Event log',
    },
    {
        path: '/addons',
        permission: EDITOR,
        text: 'Addons',
    },
];

const advancedOptions = [
    {
        path: '/context',
        permission: EDITOR,
        text: 'Context fields',
    },
    {
        path: '/tag-types',
        permission: EDITOR,
        text: 'Tag types',
    },
];

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
            return options;
        }
        return options.filter(option => option.permission !== ADMIN);
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
                        <UnleashLogo className={styles.logo} />
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
                        <Link to="/reporting">Dashboard</Link>
                        <ConditionallyRender
                            condition={flags.P}
                            show={<Link to="/projects-new">Projects</Link>}
                        />

                        <Link to="/applications">Applications</Link>
                        <Link
                            onClick={e => setAnchorElAdvanced(e.currentTarget)}
                        >
                            Advanced
                        </Link>
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
                        <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
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
                    <DrawerMenu
                        links={links}
                        title={name}
                        flags={flags}
                        open={openDrawer}
                        toggleDrawer={toggleDrawer}
                    />
                </Container>
            </AppBar>
        </>
    );
};

Header.propTypes = {
    uiConfig: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default Header;
