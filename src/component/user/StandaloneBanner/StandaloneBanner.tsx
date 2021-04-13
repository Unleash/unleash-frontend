import { Typography, useTheme } from '@material-ui/core';
import Gradient from '../../common/Gradient/Gradient';
import { ReactComponent as StarIcon } from '../../../icons/star.svg';
import { ReactComponent as RightToggleIcon } from '../../../icons/toggleRight.svg';
import { ReactComponent as LeftToggleIcon } from '../../../icons/toggleLeft.svg';

import { useStyles } from './StandaloneBanner.styles';

const StandaloneBanner = () => {
    const theme = useTheme();
    const styles = useStyles();
    return (
        <Gradient from={theme.palette.primary.main} to={'#173341'}>
            <div
                style={{
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    color: '#fff',
                }}
            >
                <Typography variant="h1" className={styles.title}>
                    Welcome to unleash
                </Typography>
                <Typography variant="body1">
                    Fredrik Oseberg has invited you to Unleash.
                </Typography>
            </div>
            <StarIcon className={styles.midLeftStarTwo} />
            <StarIcon className={styles.midLeftStar} />
            <StarIcon className={styles.midRightStar} />
            <StarIcon className={styles.bottomRightStar} />
            <StarIcon className={styles.bottomStar} />
            <div className={styles.switchesContainer}>
                <RightToggleIcon className={styles.switchIcon} />
                <br></br>
                <LeftToggleIcon className={styles.switchIcon} />
            </div>
        </Gradient>
    );
};

export default StandaloneBanner;
