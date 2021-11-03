import { Button } from '@material-ui/core';
import { useStyles } from './Splash.styles';
import {
    FiberManualRecord,
    FiberManualRecordOutlined,
} from '@material-ui/icons';

interface ISplashProps {
    components: React.ReactNode[];
}

const Splash: React.FC<ISplashProps> = props => {
    const styles = useStyles();
    const { components } = props;
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Environments are coming to Unleash!
                </h1>
                <p className={styles.paragraph}>
                    We are bringing native environment support to Unleash. Your
                    current configurations won’t be affected, but you’ll have
                    the option of adding strategies to specific environments
                    going forward.
                </p>
                <div className={styles.center}>
                    <img
                        src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                        alt="new"
                        height='150'
                        width='190'
                    />
                </div>
                <div className={styles.center}>
                    <FiberManualRecordOutlined /><FiberManualRecordOutlined /><FiberManualRecord />
                </div>
                

                <div className={`${styles.center} ${styles.buttonsContainer}`}>
                    <Button className={styles.button}>Back</Button>
                    <Button className={styles.button}>Next</Button>
                </div>
            </div>
        </div>
    );
};

export default Splash;
