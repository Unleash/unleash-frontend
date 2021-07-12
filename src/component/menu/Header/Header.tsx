import React, { useState } from 'react';
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
} from '@material-ui/core';
import { DrawerMenu } from '../drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Breadcrumb from '../breadcrumb';
import UserProfile from '../../user/UserProfile';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { ReactComponent as UnleashLogo } from '../../../assets/img/logo-with-name.svg';
import { useStyles } from './Header.styles';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
import { useCommonStyles } from '../../../common.styles';

const Header = () => {
    const theme = useTheme();
    const commonStyles = useCommonStyles();
    const { uiConfig } = useUiConfig();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const styles = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => setOpenDrawer(prev => !prev);

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
                        <UnleashLogo />
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
                        <Link to="/projects-new">Projects</Link>
                        <Link to="/applications">Applications</Link>
                        <Link to="/api">Advanced</Link>
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
