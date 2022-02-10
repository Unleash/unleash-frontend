import { useContext, useState } from 'react';
import classnames from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
} from '@material-ui/core';
import {
    Add,
    Delete,
    Extension,
    Visibility,
    VisibilityOff,
} from '@material-ui/icons';
import {
    CREATE_STRATEGY,
    DELETE_STRATEGY,
    UPDATE_STRATEGY,
} from '../../providers/AccessProvider/permissions';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';
import PageContent from '../../common/PageContent/PageContent';
import HeaderTitle from '../../common/HeaderTitle';
import { useStyles } from './StrategiesList.styles';
import AccessContext from '../../../contexts/AccessContext';
import Dialogue from '../../common/Dialogue';
import { ADD_NEW_STRATEGY_ID } from '../../../testIds';
import PermissionIconButton from '../../common/PermissionIconButton/PermissionIconButton';
import PermissionButton from '../../common/PermissionButton/PermissionButton';
import { getHumanReadableStrategyName } from '../../../utils/strategy-names';
import useStrategies from '../../../hooks/api/getters/useStrategies/useStrategies';
import useStrategiesApi from '../../../hooks/api/actions/useStrategiesApi/useStrategiesApi';
import useToast from '../../../hooks/useToast';

export const StrategiesList = () => {
    const history = useHistory();
    const styles = useStyles();
    const smallScreen = useMediaQuery('(max-width:700px)');
    const { hasAccess } = useContext(AccessContext);
    const [dialogueMetaData, setDialogueMetaData] = useState({
        show: false,
        title: '',
    });
    const { strategies, refetchStrategies } = useStrategies();
    const { removeStrategy, deprecateStrategy, reactivateStrategy } =
        useStrategiesApi();
    const { setToastData, setToastApiError } = useToast();

    const headerButton = () => (
        <ConditionallyRender
            condition={hasAccess(CREATE_STRATEGY)}
            show={
                <ConditionallyRender
                    condition={smallScreen}
                    show={
                        <PermissionIconButton
                            data-test={ADD_NEW_STRATEGY_ID}
                            onClick={() => history.push('/strategies/create')}
                            permission={CREATE_STRATEGY}
                            tooltip={'Add new strategy'}
                        >
                            <Add />
                        </PermissionIconButton>
                    }
                    elseShow={
                        <PermissionButton
                            onClick={() => history.push('/strategies/create')}
                            color="primary"
                            permission={CREATE_STRATEGY}
                            data-test={ADD_NEW_STRATEGY_ID}
                            tooltip={'Add new strategy'}
                        >
                            Add new strategy
                        </PermissionButton>
                    }
                />
            }
        />
    );

    const strategyLink = ({ name, deprecated }) => (
        <Link to={`/strategies/view/${name}`}>
            <strong>{getHumanReadableStrategyName(name)}</strong>
            <ConditionallyRender
                condition={deprecated}
                show={<small> (Deprecated)</small>}
            />
        </Link>
    );

    const onReactivateStrategy = strategy => {
        setDialogueMetaData({
            show: true,
            title: 'Really reactivate strategy?',
            onConfirm: () => {
                try {
                    reactivateStrategy(strategy);
                    refetchStrategies();
                    setToastData({
                        type: 'success',
                        title: 'Success',
                        text: 'Strategy reactivated successfully',
                    });
                } catch (e: any) {
                    setToastApiError(e.toString());
                }
            },
        });
    };

    const onDeprecateStrategy = strategy => {
        setDialogueMetaData({
            show: true,
            title: 'Really deprecate strategy?',
            onConfirm: () => {
                try {
                    deprecateStrategy(strategy);
                    refetchStrategies();
                    setToastData({
                        type: 'success',
                        title: 'Success',
                        text: 'Strategy deprecated successfully',
                    });
                } catch (e: any) {
                    setToastApiError(e.toString());
                }
            },
        });
    };

    const onDeleteStrategy = strategy => {
        setDialogueMetaData({
            show: true,
            title: 'Really delete strategy?',
            onConfirm: () => {
                try {
                    removeStrategy(strategy);
                    refetchStrategies();
                    setToastData({
                        type: 'success',
                        title: 'Success',
                        text: 'Strategy deleted successfully',
                    });
                } catch (e: any) {
                    setToastApiError(e.toString());
                }
            },
        });
    };

    const reactivateButton = strategy => (
        <Tooltip title="Reactivate activation strategy">
            <PermissionIconButton
                onClick={() => onReactivateStrategy(strategy)}
                permission={UPDATE_STRATEGY}
                tooltip={'Reactivate activation strategy'}
            >
                <VisibilityOff />
            </PermissionIconButton>
        </Tooltip>
    );

    const deprecateButton = strategy => (
        <ConditionallyRender
            condition={strategy.name === 'default'}
            show={
                <Tooltip title="You cannot deprecate the default strategy">
                    <div>
                        <IconButton disabled>
                            <Visibility />
                        </IconButton>
                    </div>
                </Tooltip>
            }
            elseShow={
                <div>
                    <PermissionIconButton
                        onClick={() => onDeprecateStrategy(strategy)}
                        permission={UPDATE_STRATEGY}
                        tooltip={'Deprecate activation strategy'}
                    >
                        <Visibility />
                    </PermissionIconButton>
                </div>
            }
        />
    );

    const deleteButton = strategy => (
        <ConditionallyRender
            condition={strategy.editable}
            show={
                <PermissionIconButton
                    onClick={() => onDeleteStrategy(strategy)}
                    permission={DELETE_STRATEGY}
                    tooltip={'Delete strategy'}
                >
                    <Delete />
                </PermissionIconButton>
            }
            elseShow={
                <Tooltip title="You cannot delete a built-in strategy">
                    <div>
                        <IconButton disabled>
                            <Delete />
                        </IconButton>
                    </div>
                </Tooltip>
            }
        />
    );

    const strategyList = () =>
        strategies.map(strategy => (
            <ListItem
                key={strategy.name}
                classes={{
                    root: classnames(styles.listItem, {
                        [styles.deprecated]: strategy.deprecated,
                    }),
                }}
            >
                <ListItemAvatar>
                    <Extension style={{ color: '#0000008a' }} />
                </ListItemAvatar>
                <ListItemText
                    primary={strategyLink(strategy)}
                    secondary={strategy.description}
                />
                <ConditionallyRender
                    condition={strategy.deprecated}
                    show={reactivateButton(strategy)}
                    elseShow={deprecateButton(strategy)}
                />
                <ConditionallyRender
                    condition={hasAccess(DELETE_STRATEGY)}
                    show={deleteButton(strategy)}
                />
            </ListItem>
        ));

    const onDialogConfirm = () => {
        dialogueMetaData?.onConfirm();
        setDialogueMetaData(prev => ({ ...prev, show: false }));
    };

    return (
        <PageContent
            headerContent={
                <HeaderTitle title="Strategies" actions={headerButton()} />
            }
        >
            <Dialogue
                open={dialogueMetaData.show}
                onClick={onDialogConfirm}
                title={dialogueMetaData?.title}
                onClose={() =>
                    setDialogueMetaData(prev => ({ ...prev, show: false }))
                }
            />
            <List>
                <ConditionallyRender
                    condition={strategies.length > 0}
                    show={<>{strategyList()}</>}
                    elseShow={<ListItem>No strategies found</ListItem>}
                />
            </List>
        </PageContent>
    );
};
