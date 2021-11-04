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
const circles = [
    <FiberManualRecord
    // style={{ transform: `translateX(${x})`, transition: '0.4 ease' }}
    />,
    <FiberManualRecordOutlined />,
    <FiberManualRecordOutlined />,
    <FiberManualRecordOutlined />,
];
const arraymove = (
    arr: React.ReactNode[],
    fromIndex: number,
    toIndex: number
) => {
    let element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
};

const Splash: React.FC<ISplashProps> = props => {
    const styles = useStyles();
    const { components } = props;
    const [counter, setCounter] = useState(0);
    const [x, setX] = useState(0);

    const onNext = () => {
        arraymove(circles, counter, counter + 1);
        setCounter(counter + 1);
    };

    const onBack = () => {
        arraymove(circles, counter, counter - 1);
        setCounter(counter - 1);
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
                    <div className={styles.circles}>
                        {circles.map((circle, _) => {
                            console.log(circle, _);
                            return circle;
                        })}
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
