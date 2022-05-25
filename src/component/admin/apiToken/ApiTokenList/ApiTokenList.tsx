import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';
import useToast from 'hooks/useToast';
import useLoading from 'hooks/useLoading';
import {
    useApiTokens,
    IApiToken,
} from 'hooks/api/getters/useApiTokens/useApiTokens';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import ApiError from 'component/common/ApiError/ApiError';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { FileCopy } from '@mui/icons-material';
import copy from 'copy-to-clipboard';
import { useLocationSettings } from 'hooks/useLocationSettings';
import { formatDateYMD } from 'utils/formatDate';
import { ProjectsList } from './ProjectsList/ProjectsList';
import { useStyles } from './ApiTokenList.styles';
import { RemoveApiTokenButton } from 'component/admin/apiToken/RemoveApiTokenButton/RemoveApiTokenButton';

export const ApiTokenList = () => {
    const { classes: styles } = useStyles();
    const { uiConfig } = useUiConfig();
    const { locationSettings } = useLocationSettings();
    const { setToastData } = useToast();
    const { tokens, loading, refetch, error } = useApiTokens();
    const ref = useLoading(loading);

    const renderError = () => {
        return <ApiError onClick={refetch} text="Error fetching api tokens" />;
    };

    const copyToken = (value: string) => {
        if (copy(value)) {
            setToastData({
                type: 'success',
                title: 'Token copied',
                text: `Token is copied to clipboard`,
            });
        }
    };

    const renderApiTokens = (tokens: IApiToken[]) => {
        return (
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell className={styles.hideSM}>Created</TableCell>
                        <TableCell className={styles.hideSM}>
                            Username
                        </TableCell>
                        <TableCell
                            className={`${styles.center} ${styles.hideXS}`}
                        >
                            Type
                        </TableCell>
                        <ConditionallyRender
                            condition={uiConfig.flags.E}
                            show={
                                <>
                                    <TableCell
                                        className={`${styles.center} ${styles.hideXS}`}
                                    >
                                        Projects
                                    </TableCell>
                                    <TableCell
                                        className={`${styles.center} ${styles.hideXS}`}
                                    >
                                        Environment
                                    </TableCell>
                                </>
                            }
                        />
                        <TableCell className={styles.hideMD}>Secret</TableCell>
                        <TableCell className={styles.token}>Token</TableCell>
                        <TableCell className={styles.actionsContainer}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tokens.map(item => {
                        return (
                            <TableRow
                                key={item.secret}
                                className={styles.tableRow}
                            >
                                <TableCell
                                    align="left"
                                    className={styles.hideSM}
                                >
                                    {formatDateYMD(
                                        item.createdAt,
                                        locationSettings.locale
                                    )}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={styles.hideSM}
                                >
                                    {item.username}
                                </TableCell>
                                <TableCell
                                    className={`${styles.center} ${styles.hideXS}`}
                                >
                                    {item.type}
                                </TableCell>
                                <ConditionallyRender
                                    condition={uiConfig.flags.E}
                                    show={
                                        <>
                                            <TableCell
                                                className={`${styles.center} ${styles.hideXS}`}
                                            >
                                                <ProjectsList
                                                    project={item.project}
                                                    projects={item.projects}
                                                />
                                            </TableCell>
                                            <TableCell
                                                className={`${styles.center} ${styles.hideXS}`}
                                            >
                                                {item.environment}
                                            </TableCell>
                                            <TableCell className={styles.token}>
                                                <b>Type:</b> {item.type}
                                                <br />
                                                <b>Env:</b> {item.environment}
                                                <br />
                                                <b>Projects:</b>{' '}
                                                <ProjectsList
                                                    project={item.project}
                                                    projects={item.projects}
                                                />
                                            </TableCell>
                                        </>
                                    }
                                    elseShow={
                                        <>
                                            <TableCell className={styles.token}>
                                                <b>Type:</b> {item.type}
                                                <br />
                                                <b>Username:</b> {item.username}
                                            </TableCell>
                                        </>
                                    }
                                />
                                <TableCell className={styles.hideMD}>
                                    <Box
                                        component="span"
                                        display="inline-block"
                                        width="250px"
                                    >
                                        ************************************
                                    </Box>
                                </TableCell>
                                <TableCell className={styles.actionsContainer}>
                                    <Tooltip title="Copy token" arrow>
                                        <IconButton
                                            onClick={() => {
                                                copyToken(item.secret);
                                            }}
                                            size="large"
                                        >
                                            <FileCopy />
                                        </IconButton>
                                    </Tooltip>
                                    <RemoveApiTokenButton token={item} />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    };

    return (
        <div ref={ref}>
            <ConditionallyRender condition={error} show={renderError()} />
            <div className={styles.container}>
                <ConditionallyRender
                    condition={tokens.length < 1 && !loading}
                    show={<div>No API tokens available.</div>}
                    elseShow={renderApiTokens(tokens)}
                />
            </div>
        </div>
    );
};
