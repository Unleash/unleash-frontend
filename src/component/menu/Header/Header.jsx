import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
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
import { useStyles } from './styles';

const Header = ({ uiConfig }) => {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const styles = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => setOpenDrawer(prev => !prev);

    const { links, name, flags } = uiConfig;

    return (
        <React.Fragment>
            <AppBar className={styles.header} position="static">
                <Container className={styles.container}>
                    <IconButton
                        className={styles.drawerButton}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <ConditionallyRender
                        condition={!smallScreen}
                        show={
                            <Typography
                                variant="h1"
                                className={styles.headerTitle}
                            >
                                <Route path="/:path" component={Breadcrumb} />
                            </Typography>
                        }
                    />

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
        </React.Fragment>
    );
};

Header.propTypes = {
    uiConfig: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default Header;
