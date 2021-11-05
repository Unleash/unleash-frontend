import Splash from '../Splash/Splash';
import EnvironmentSplashPage from './EnvironmentSplashPage/EnvironmentSplashPage';
import { VpnKey, CloudCircle } from '@material-ui/icons';
import { useStyles } from './EnvironmentSplash.styles';
import splashImg from '../../../assets/img/env-splash-2.png';
import { formatAssetPath } from '../../../utils/format-path';

const EnvironmentSplash = () => {
    const styles = useStyles();
    return (
        <Splash
            components={[
                <EnvironmentSplashPage
                    title={
                        <h2 className={styles.title}>
                            Environments are coming to Unleash!
                        </h2>
                    }
                    topDescription={
                        <p className={styles.topDescription}>
                            We are bringing native environment support to
                            Unleash.{' '}
                            <b>
                                Your current configurations won’t be affected,
                            </b>{' '}
                            but you’ll have the option of adding strategies to
                            specific environments going forward.
                        </p>
                    }
                    bottomDescription={
                        <p className={styles.bottomDescription}>
                            By default you will get access three environments:
                            default, development and production. All of your
                            current configurations will live in the default
                            environment and <b>nothing will change until you make a
                            conscious decision to change.</b>
                        </p>
                    }
                    image={<CloudCircle className={styles.icon}/>}
                />,
                <EnvironmentSplashPage
                    title={
                        <h2 className={styles.title}>
                            Strategies live in environments
                        </h2>
                    }
                    topDescription={
                        <p className={styles.topDescription}>
                            A feature toggle lives as an entity across multiple
                            environments, but your strategies will live in a
                            specific environment. This allows you to have
                            different configuration per environment for a
                            feature toggle.
                        </p>
                    }
                    image={<img
                        alt="Generic Webhook logo"
                        className={styles.img}
                        src={formatAssetPath(splashImg)}
                    />}
                />,
                <EnvironmentSplashPage
                    title={
                        <h2 className={styles.title}>
                            Environments are turned on per project
                        </h2>
                    }
                    topDescription={
                        <p className={styles.topDescription}>
                            Feature toggles live in projects. In order to turn
                            of environments for a feature toggle you need to
                            navigate to your project and explicitly turn on the
                            environments you active for the project want. Then
                            every feature toggle who lives in that project will
                            have access to those environments.
                        </p>
                    }
                />,
                <EnvironmentSplashPage
                    title={
                        <h2 className={styles.title}>
                            API Keys control which environment you get the
                            configuration from
                        </h2>
                    }
                    topDescription={
                        <p className={styles.topDescription}>
                            Once you have set up environments for you feature
                            toggle and added strategies to the specific
                            environments, you need to instruct your SDKs to
                            fetch configuration from the correct environment.
                            You’ll do this by creating an environment specific
                            API Key.
                        </p>
                    }
                    bottomDescription={
                        <p className={styles.bottomDescription}>
                            By creating an environment specific API key, you
                            will encode the environment into the API key, which
                            will instruct unleash to retrieve the configuration
                            for that environment.
                        </p>
                    }
                    image={<VpnKey className={styles.icon}/>}
                />,
            ]}
        />
    );
};

export default EnvironmentSplash;
