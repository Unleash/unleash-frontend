import { FC } from 'react';
import StandaloneBanner from '../../StandaloneBanner/StandaloneBanner';

import { Typography } from '@material-ui/core';

import { useStyles } from './StandaloneLayout.styles';

interface IStandaloneLayout {
    BannerComponent?: JSX.Element;
    showMenu?: boolean;
}

const StandaloneLayout: FC<IStandaloneLayout> = ({
    children,
    BannerComponent,
}) => {
    const styles = useStyles();

    let banner = (
        <StandaloneBanner title="Unleash">
            <Typography className={styles.bannerSubtitle}>
                Committed to creating new ways of developing software.
            </Typography>
        </StandaloneBanner>
    );

    if (BannerComponent) {
        banner = BannerComponent;
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>{banner}</div>
            <div className={styles.rightContainer}>
                <div className={styles.innerRightContainer}>{children}</div>
            </div>
        </div>
    );
};

export default StandaloneLayout;
