import { useStyles } from './Create.styles' 
import MenuIcon from '@material-ui/icons/Menu';


interface ICreateProps {
    title: string;
    description: string;
    documentationLink: string;
}

const Create: React.FC<ICreateProps> = ({ title, description, children, documentationLink }) => {
    const styles = useStyles();
    return (
    <section className={styles.container}>
        <aside className={styles.sidebar}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            
            <div className={styles.linkContainer}>
                <MenuIcon className={styles.linkIcon}/>
                <a className={styles.documentationLink} href={documentationLink} rel="noopener noreferrer" target="_blank">Learn more</a>
            </div> 
        </aside>
        <div className={styles.formContent}>
            {children}
        </div>
    </section>
   )
}

export default Create;