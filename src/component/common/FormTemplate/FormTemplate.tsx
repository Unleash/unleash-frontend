import { useStyles } from './FormTemplate.styles';
import MenuBookIcon from '@material-ui/icons/MenuBook';

interface ICreateProps {
    title: string;
    description: string;
    documentationLink: string;
}

const FormTemplate: React.FC<ICreateProps> = ({
    title,
    description,
    children,
    documentationLink,
}) => {
    const styles = useStyles();
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
            </aside>
            <div className={styles.formContent}>{children}</div>
        </section>
    );
};

export default FormTemplate;
