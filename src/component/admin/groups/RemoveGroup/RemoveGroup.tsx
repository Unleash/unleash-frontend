import { Typography } from '@mui/material';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import { useGroupApi } from 'hooks/api/actions/useGroupApi/useGroupApi';
import { IGroup } from 'interfaces/group';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IRemoveGroupProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    group: IGroup;
}

export const RemoveGroup: FC<IRemoveGroupProps> = ({
    open,
    setOpen,
    group,
}) => {
    const { removeGroup } = useGroupApi();
    const navigate = useNavigate();

    const onRemoveClick = async () => {
        removeGroup(group.id);
        setOpen(false);
        navigate('/admin/groups');
    };

    return (
        <Dialogue
            open={open}
            primaryButtonText="Remove"
            secondaryButtonText="Cancel"
            onClick={onRemoveClick}
            onClose={() => {
                setOpen(false);
            }}
            title="Remove group"
        >
            <Typography>
                Are you sure you wish to remove <strong>{group.name}</strong>?
                If this group is currently assigned to one or more projects then
                users belonging to this group may lose access to those projects.
            </Typography>
        </Dialogue>
    );
};
