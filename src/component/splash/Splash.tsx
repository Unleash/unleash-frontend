import { Button } from '@material-ui/core';
import { useStyles } from './Splash.styles';
import {
    FiberManualRecord,
    FiberManualRecordOutlined,
    CloseOutlined,
} from '@material-ui/icons';
import { useState } from 'react';

interface ISplashProps {
    components: React.ReactNode[];
}

const Splash: React.FC<ISplashProps> = props => {
    const styles = useStyles();
    const { components } = props;
    const [counter, setCounter] = useState(0);

    const onNext = () => {
        setCounter(counter + 1);
    };

    const onBack = () => {
        setCounter(counter - 1);
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
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.closeButton}>
                    <Button className={styles.button}>
                        <CloseOutlined />
                    </Button>
                </div>
                {components[counter]}
                <div className={styles.controllers}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className={styles.circles}>{renderCircles()}</div>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <Button
                            className={styles.button}
                            disabled={counter === 0}
                            onClick={onBack}
                        >
                            Back
                        </Button>
                        <Button
                            className={styles.nextButton}
                            disabled={counter === components.length - 1}
                            onClick={onNext}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Splash;
