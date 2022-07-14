import React, { useCallback, useState } from 'react';
import {Button, SelectChangeEvent} from '@mui/material';
import { ProjectAccessAssign } from './ProjectAccessAssign/ProjectAccessAssign';
import { PageContent } from 'component/common/PageContent/PageContent';
import { useStyles } from './ProjectAccess.styles';
import useToast from 'hooks/useToast';
import { Dialogue as ConfirmDialogue } from 'component/common/Dialogue/Dialogue';
import useProjectAccess, {
    IProjectAccessUser,
} from 'hooks/api/getters/useProjectAccess/useProjectAccess';
import useProjectApi from 'hooks/api/actions/useProjectApi/useProjectApi';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { ProjectAccessTable } from './ProjectAccessTable/ProjectAccessTable';
import {Search} from "../../common/Search/Search";
import {useSearchParams} from "react-router-dom";
import {SidebarModal} from "../../common/SidebarModal/SidebarModal";
import {CreateUnleashContext} from "../../context/CreateUnleashContext/CreateUnleashContext";

export const ProjectAccessPage = () => {
    const projectId = useRequiredPathParam('projectId');
    const { classes: styles } = useStyles();
    const { access, refetchProjectAccess } = useProjectAccess(projectId);
    const { setToastData } = useToast();
    const { removeUserFromRole, changeUserRole } = useProjectApi();
    const [showDelDialogue, setShowDelDialogue] = useState(false);
    const [user, setUser] = useState<IProjectAccessUser | undefined>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [open, setOpen] = useState(false);

    const handleRoleChange = useCallback(
        (userId: number) => async (evt: SelectChangeEvent) => {
            const roleId = Number(evt.target.value);
            try {
                await changeUserRole(projectId, roleId, userId);
                refetchProjectAccess();
                setToastData({
                    type: 'success',
                    title: 'Success',
                    text: 'User role changed successfully',
                });
            } catch (err: any) {
                setToastData({
                    type: 'error',
                    title: err.message || 'Server problems when adding users.',
                });
            }
        },
        [changeUserRole, projectId, refetchProjectAccess, setToastData]
    );

    const handleRemoveAccess = (user: IProjectAccessUser) => {
        setUser(user);
        setShowDelDialogue(true);
    };

    const removeAccess = (user: IProjectAccessUser | undefined) => async () => {
        if (!user) return;
        const { id, roleId } = user;

        try {
            await removeUserFromRole(projectId, roleId, id);
            refetchProjectAccess();
            setToastData({
                type: 'success',
                title: `${
                    user.email || user.username || 'The user'
                } has been removed from project`,
            });
        } catch (err: any) {
            setToastData({
                type: 'error',
                title: err.message || 'Server problems when adding users.',
            });
        }
        setShowDelDialogue(false);
    };

    const [searchValue, setSearchValue] = useState(
        searchParams.get('search') || ''
    );

    return (
        <PageContent
            header={
                <PageHeader
                    titleElement="Project roles"
                    actions={
                        <>
                            <Search
                                initialValue={searchValue}
                                onChange={setSearchValue}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setOpen(true)}
                            >
                                Assign user/group
                            </Button>
                            <SidebarModal
                                label="Create new context"
                                onClose={() => setOpen(false)}
                                open={open}
                            >
                                <ProjectAccessAssign
                                    onSubmit={() => setOpen(false)}
                                    onCancel={() => setOpen(false)}
                                    roles={access?.roles}
                                    modal
                                />
                            </SidebarModal>
                        </>
                    }
                />
            }
            className={styles.pageContent}
        >
            <ProjectAccessTable
                access={access}
                handleRoleChange={handleRoleChange}
                handleRemoveAccess={handleRemoveAccess}
                projectId={projectId}
            />
            <ConfirmDialogue
                open={showDelDialogue}
                onClick={removeAccess(user)}
                onClose={() => {
                    setUser(undefined);
                    setShowDelDialogue(false);
                }}
                title="Really remove user from this project"
            />
        </PageContent>
    );
};
