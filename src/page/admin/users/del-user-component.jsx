import React from 'react';
import Dialogue from '../../../component/common/Dialogue/Dialogue';
import ConditionallyRender from '../../../component/common/conditionally-render';

const DelUserComponent = ({ showDialog, closeDialog, user, removeUser }) => (
    <ConditionallyRender
        condition={user}
        show={
            <Dialogue
                open={showDialog}
                title="Really delete user?"
                onClose={closeDialog}
                onClick={() => removeUser(user)}
                primaryButtonText="Delete user"
                secondaryButtonText="Cancel"
            >
                <div>Are you sure you want to delete {user ? `${user.name} (${user.email})` : ''}?</div>
            </Dialogue>
        }
    />
);
export default DelUserComponent;
