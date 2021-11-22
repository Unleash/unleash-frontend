import { Button } from '@material-ui/core';
import { useStyles } from './Splash.styles';
import {
    FiberManualRecord,
    FiberManualRecordOutlined,
    CloseOutlined,
} from '@material-ui/icons';
import { useState } from 'react';
import ConditionallyRender from '../ConditionallyRender';
import { useHistory } from 'react-router';

interface ISplashProps {
    components: React.ReactNode[];
}

const Splash: React.FC<ISplashProps> = ({ components }) => {
    const styles = useStyles();
    const history = useHistory();
    const [counter, setCounter] = useState(0);

    const onNext = () => {
        if (counter === components.length - 1) {
            return history.push('/');
        }
        setCounter(counter + 1);
    };

    const onBack = () => {
        setCounter(counter - 1);
    };
    const onClose = () => {
        history.push('/features');
    };

    const calculatePosition = () => {
        if (counter === 0) {
            return '0';
        }

        return counter * 24;
    };

    const renderCircles = () => {
        return components.map((components, index) => {
            if (index === 0) {
                return (
                    <>
                        <FiberManualRecordOutlined />
                        <FiberManualRecord
                            style={{
                                position: 'absolute',
                                transition: 'transform 0.3s ease',
                                left: '0',
                                transform: `translateX(${calculatePosition()}px)`,
                            }}
                        />
                    </>
                );
            }

            return <FiberManualRecordOutlined />;
        });
    };

    return (
        <div className={styles.splashMainContainer}>
            <div className={styles.splashContainer}>
                <div className={styles.closeButtonContainer}>
                    <Button className={styles.closeButton} onClick={onClose}>
                        <CloseOutlined />
                    </Button>
                </div>
                {components[counter]}
                <div className={styles.controllers}>
                    <div className={styles.circlesContainer}>
                        <div className={styles.circles}>{renderCircles()}</div>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <ConditionallyRender
                            condition={counter > 0}
                            show={
                                <Button
                                    className={styles.button}
                                    disabled={counter === 0}
                                    onClick={onBack}
                                >
                                    Back
                                </Button>
                            }
                        />

                        <Button className={styles.nextButton} onClick={onNext}>
                            {counter === components.length - 1
                                ? 'Finish'
                                : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Splash;
