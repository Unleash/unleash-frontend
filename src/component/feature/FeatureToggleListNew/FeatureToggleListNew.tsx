import { Switch } from '@material-ui/core';
import { useStyles } from './FeatureToggleListNew.styles';

const FeatureToggleListNew = () => {
    const styles = useStyles();
    return (
        <ul className={styles.list}>
            <li className={styles.listItem}>
                <span className={styles.listItemNameContainer}>
                    <p style={{ fontWeight: 'bold' }}>name</p>
                </span>

                <span className={styles.listItemTypeContainer}>
                    <p style={{ fontWeight: 'bold' }}>type</p>
                </span>
                <span className={styles.listItemEnvContainer}>
                    <p style={{ fontWeight: 'bold', width: '70px' }}>dev</p>
                    <p style={{ fontWeight: 'bold', width: '70px' }}>prod</p>
                </span>
            </li>

            <li className={styles.listItem}>
                <span className={styles.listItemNameContainer}>
                    <p>my-feature-toggle</p>
                </span>

                <span className={styles.listItemTypeContainer}>
                    <p>type</p>
                </span>
                <span className={styles.listItemEnvContainer}>
                    <span style={{ width: '70px' }}>
                        <Switch checked />
                    </span>

                    <span style={{ width: '70px' }}>
                        <Switch checked />
                    </span>
                </span>
            </li>
        </ul>
        // <TableContainer>
        //     <Table>
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell align="center">name</TableCell>
        //                 <TableCell align="center">type</TableCell>
        //                 <TableCell align="center">dev</TableCell>
        //                 <TableCell align="center">prod</TableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             <TableRow>
        //                 <TableCell align="center">my-feature-toggle</TableCell>
        //                 <TableCell align="center">release</TableCell>
        //                 <TableCell align="center">
        //                     <Switch checked />
        //                 </TableCell>
        //                 <TableCell align="center">
        //                     <Switch checked />
        //                 </TableCell>
        //             </TableRow>
        //         </TableBody>
        //     </Table>
        // </TableContainer>
    );
};

export default FeatureToggleListNew;
