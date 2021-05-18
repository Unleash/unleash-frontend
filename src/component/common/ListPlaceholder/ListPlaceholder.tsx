import { ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './ListPlaceholder.styles';

interface IListPlaceholderProps {
    text: string;
    link: string;
    linkText: string;
}

const ListPlaceholder = ({ text, link, linkText }: IListPlaceholderProps) => {
    const styles = useStyles();

    return (
        <ListItem className={styles.emptyStateListItem}>
            No features available. Get started by adding a new feature toggle.
            <Link to="/features/create">Add your first toggle</Link>
        </ListItem>
    );
};

export default ListPlaceholder;
