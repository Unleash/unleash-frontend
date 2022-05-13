import { useInstanceStatus } from 'hooks/api/getters/useInstanceStatus/useInstanceStatus';
import React, { ReactNode } from 'react';
import { InstanceStatusBar } from 'component/common/InstanceStatus/InstanceStatusBar';

interface IInstanceStatusProps {
    children: ReactNode;
}

export const InstanceStatus = ({ children }: IInstanceStatusProps) => {
    const { instanceStatus } = useInstanceStatus();

    return (
        <div hidden={!instanceStatus} style={{ height: '100%' }}>
            {instanceStatus && (
                <InstanceStatusBarMemo instanceStatus={instanceStatus} />
            )}
            {children}
        </div>
    );
};

const InstanceStatusBarMemo = React.memo(InstanceStatusBar);
