import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import styles from 'component/styles.module.scss';
import Header from 'component/menu/Header/Header';
import Footer from 'component/menu/Footer/Footer';
import Proclamation from 'component/common/Proclamation/Proclamation';
import BreadcrumbNav from 'component/common/BreadcrumbNav/BreadcrumbNav';
import textureImage from 'assets/img/texture.png';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { SkipNavLink } from 'component/common/SkipNav/SkipNavLink';
import { SkipNavTarget } from 'component/common/SkipNav/SkipNavTarget';

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        justifyContent: 'space-between',
    },
    contentContainer: {
        height: '100%',
        padding: '3.25rem 0',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            padding: '3.25rem 0.75rem',
        },
    },
}));

interface IMainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: IMainLayoutProps) => {
    const muiStyles = useStyles();
    const { uiConfig } = useUiConfig();

    return (
        <>
            <SkipNavLink />
            <Header />
            <SkipNavTarget />
            <Grid container className={muiStyles.container}>
                <main className={classnames(styles.contentWrapper)}>
                    <Grid item className={styles.content} xs={12} sm={12}>
                        <div
                            className={muiStyles.contentContainer}
                            style={{ zIndex: 200 }}
                        >
                            <BreadcrumbNav />
                            <Proclamation toast={uiConfig.toast} />
                            {children}
                        </div>
                    </Grid>
                    <div style={{ overflow: 'hidden' }}>
                        <img
                            src={textureImage}
                            alt=""
                            style={{
                                position: 'fixed',
                                zIndex: 1,
                                bottom: 0,
                                right: 0,
                                width: 400,
                            }}
                        />
                    </div>
                </main>
                <Footer />
            </Grid>
        </>
    );
};
