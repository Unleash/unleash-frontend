import { FC } from 'react';
import { Box } from '@mui/material';
import { useStyles } from 'component/common/ListPlaceholder/ListPlaceholder.styles';

const ListPlaceholder: FC = ({ children }) => {
    const { classes: styles } = useStyles();

    return <Box className={styles.emptyStateListItem}>{children}</Box>;
};

export default ListPlaceholder;
