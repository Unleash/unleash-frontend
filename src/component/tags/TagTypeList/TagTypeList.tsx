import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from '@mui/material';
import { Add, Delete, Edit, Label } from '@mui/icons-material';
import { HeaderTitle } from 'component/common/HeaderTitle/HeaderTitle';
import PageContent from 'component/common/PageContent/PageContent';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import {
    DELETE_TAG_TYPE,
    UPDATE_TAG_TYPE,
} from 'component/providers/AccessProvider/permissions';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from './TagTypeList.module.scss';
import AccessContext from 'contexts/AccessContext';
import useTagTypesApi from 'hooks/api/actions/useTagTypesApi/useTagTypesApi';
import useTagTypes from 'hooks/api/getters/useTagTypes/useTagTypes';
import useToast from 'hooks/useToast';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { formatUnknownError } from 'utils/formatUnknownError';
import { ITagType } from 'interfaces/tags';

export const TagTypeList = () => {
    const { hasAccess } = useContext(AccessContext);
    const [deletion, setDeletion] = useState<{
        open: boolean;
        name?: string;
    }>({ open: false });
    const history = useHistory();
    const smallScreen = useMediaQuery('(max-width:700px)');
    const { deleteTagType } = useTagTypesApi();
    const { tagTypes, refetch } = useTagTypes();
    const { setToastData, setToastApiError } = useToast();

    const deleteTag = async () => {
        try {
            if (deletion.name) {
                await deleteTagType(deletion.name);
                refetch();
                setDeletion({ open: false });
                setToastData({
                    type: 'success',
                    show: true,
                    title: 'Successfully deleted tag type.',
                });
            }
        } catch (error) {
            setToastApiError(formatUnknownError(error));
        }
    };

    let header = (
        <HeaderTitle
            title="Tag Types"
            actions={
                <ConditionallyRender
                    condition={hasAccess(UPDATE_TAG_TYPE)}
                    show={
                        <ConditionallyRender
                            condition={smallScreen}
                            show={
                                <Tooltip title="Add tag type">
                                    <IconButton
                                        onClick={() =>
                                            history.push('/tag-types/create')
                                        }
                                        size="large"
                                    >
                                        <Add />
                                    </IconButton>
                                </Tooltip>
                            }
                            elseShow={
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        history.push('/tag-types/create')
                                    }
                                >
                                    New tag type
                                </Button>
                            }
                        />
                    }
                />
            }
        />
    );

    const renderTagType = (tagType: ITagType) => {
        let link = (
            <Link to={`/tag-types/edit/${tagType.name}`}>
                <strong>{tagType.name}</strong>
            </Link>
        );
        let deleteButton = (
            <Tooltip title={`Delete ${tagType.name}`}>
                <IconButton
                    onClick={() =>
                        setDeletion({
                            open: true,
                            name: tagType.name,
                        })
                    }
                    size="large"
                >
                    <Delete />
                </IconButton>
            </Tooltip>
        );

        return (
            <ListItem
                key={`${tagType.name}`}
                classes={{ root: styles.tagListItem }}
            >
                <ListItemIcon>
                    <Label />
                </ListItemIcon>
                <ListItemText primary={link} secondary={tagType.description} />
                <PermissionIconButton
                    permission={UPDATE_TAG_TYPE}
                    component={Link}
                    tooltip="Edit tag type"
                    to={`/tag-types/edit/${tagType.name}`}
                >
                    <Edit className={styles.icon} />
                </PermissionIconButton>
                <ConditionallyRender
                    condition={hasAccess(DELETE_TAG_TYPE)}
                    show={deleteButton}
                />
            </ListItem>
        );
    };
    return (
        <PageContent headerContent={header}>
            <List>
                <ConditionallyRender
                    condition={tagTypes.length > 0}
                    show={tagTypes.map(tagType => renderTagType(tagType))}
                    elseShow={<ListItem>No entries</ListItem>}
                />
            </List>
            <Dialogue
                title="Really delete Tag type?"
                open={deletion.open}
                onClick={deleteTag}
                onClose={() => {
                    setDeletion({ open: false });
                }}
            />
        </PageContent>
    );
};
