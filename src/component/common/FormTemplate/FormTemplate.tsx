import { useStyles } from './FormTemplate.styles';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Codebox from '../Codebox/Codebox';
import { IconButton, useMediaQuery } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import ConditionallyRender from '../ConditionallyRender';
import Loader from '../Loader/Loader';

interface ICreateProps {
    title: string;
    description: string;
    documentationLink: string;
    loading?: boolean;
}

const FormTemplate: React.FC<ICreateProps> = ({
    title,
    description,
    children,
    documentationLink,
    loading,
}) => {
    const styles = useStyles();
    const smallScreen = useMediaQuery(`(max-width:${900}px)`);

    return (
        <section className={styles.container}>
            <aside className={styles.sidebar}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>

                <div className={styles.linkContainer}>
                    <MenuBookIcon className={styles.linkIcon} />
                    <a
                        className={styles.documentationLink}
                        href={documentationLink}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Learn more
                    </a>
                </div>
                <ConditionallyRender
                    condition={!smallScreen}
                    show={
                        <>
                            <h3 className={styles.subtitle}>
                                API Command{' '}
                                <IconButton className={styles.iconButton}>
                                    <FileCopy className={styles.icon} />
                                </IconButton>
                            </h3>
                            <Codebox
                                text='curl https://app.unleash-hosted.com/demo/api/client/features \
-H "Authorization: 56907a2fa53c1d16101d509a10b78e36190b0f918d9f122d";'
                            />
                        </>
                    }
                />
            </aside>
            <div className={styles.formContent}>
                <ConditionallyRender
                    condition={loading || false}
                    show={<Loader />}
                    elseShow={<>{children}</>}
                />{' '}
            </div>
        </section>
    );
};

export default FormTemplate;
