import { FC } from 'react';

import { Typography, useTheme } from '@material-ui/core';
import Gradient from '../../common/Gradient/Gradient';
import { ReactComponent as RightToggleIcon } from '../../../assets/icons/toggleRight.svg';
import { ReactComponent as LeftToggleIcon } from '../../../assets/icons/toggleLeft.svg';

import { useStyles } from './StandaloneBanner.styles';

interface IStandaloneBannerProps {
    title: string;
}

const StandaloneBanner: FC<IStandaloneBannerProps> = ({ title, children }) => {
    const theme = useTheme();
    const styles = useStyles();
    return (
        <Gradient from={theme.palette.primary.main} to={'#173341'}>
            <div className={styles.container}>
                <Typography variant="h1" className={styles.title}>
                    {title}
                </Typography>
                {children}
            </div>

            <div className={styles.switchesContainer}>
                <RightToggleIcon className={styles.switchIcon} />
                <br></br>
                <LeftToggleIcon className={styles.switchIcon} />
            </div>
        </Gradient>
    );
};

export default StandaloneBanner;
