import { useStyles } from './Splash.styles';

const ChildComponent: React.FC = props => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Environments are coming to Unleash!
            </h1>
        </div>
    );
};

export default ChildComponent;
