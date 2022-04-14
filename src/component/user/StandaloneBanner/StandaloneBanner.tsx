import { FC } from 'react';
import { Typography, useTheme, useMediaQuery } from '@material-ui/core';
import Gradient from 'component/common/Gradient/Gradient';
import { ReactComponent as Logo } from 'assets/icons/logoWhiteBg.svg';
import { ReactComponent as LogoWithText } from 'assets/img/logoWhiteTransparentHorizontal.svg';
import { useStyles } from './StandaloneBanner.styles';
import ConditionallyRender from 'component/common/ConditionallyRender/ConditionallyRender';

interface IStandaloneBannerProps {
    title: string;
}

const StandaloneBanner: FC<IStandaloneBannerProps> = ({ title, children }) => {
    const theme = useTheme();
    const styles = useStyles();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Gradient
            from={theme.palette.primary.main}
            // @ts-expect-error
            to={theme.palette.login.gradient.bottom}
            className={styles.gradient}
        >
            <div className={styles.container}>
                <Typography variant="h1" className={styles.title}>
                    {title}
                </Typography>
                <Typography className={styles.bannerSubtitle}>
                    Committed to creating new ways of developing software
                </Typography>
            </div>

            <div className={styles.logoContainer}>
                <ConditionallyRender
                    condition={smallScreen}
                    show={
                        <LogoWithText
                            className={styles.logo}
                            aria-label="Unleash logo"
                        />
                    }
                    elseShow={
                        <Logo
                            className={styles.logo}
                            aria-label="Unleash logo"
                        />
                    }
                />
            </div>
        </Gradient>
    );
};

export default StandaloneBanner;
