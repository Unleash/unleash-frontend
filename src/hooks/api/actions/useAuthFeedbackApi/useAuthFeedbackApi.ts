import { formatApiPath } from 'utils/formatPath';
import { useCallback } from 'react';
import { useAuthFeedback } from 'hooks/api/getters/useAuth/useAuthFeedback';

interface IFeedback {
    feedbackId: string;
    neverShow?: boolean;
}

interface IUseAuthFeedbackApi {
    createFeedback: (feedback: IFeedback) => Promise<void>;
    updateFeedback: (feedback: IFeedback) => Promise<void>;
}

export const useAuthFeedbackApi = (): IUseAuthFeedbackApi => {
    const { refetchFeedback } = useAuthFeedback();
    const path = formatApiPath('api/admin/feedback');

    const createFeedback = useCallback(
        async (feedback: IFeedback): Promise<void> => {
            await sendFeedback('POST', path, feedback);
            await refetchFeedback();
        },
        [path, refetchFeedback]
    );

    const updateFeedback = useCallback(
        async (feedback: IFeedback): Promise<void> => {
            const pathWithId = `${path}/${feedback.feedbackId}`;
            await sendFeedback('PUT', pathWithId, feedback);
            await refetchFeedback();
        },
        [path, refetchFeedback]
    );

    return {
        createFeedback,
        updateFeedback,
    };
};

const sendFeedback = async (
    method: 'PUT' | 'POST',
    path: string,
    feedback: IFeedback
): Promise<void> => {
    await fetch(path, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
    });
};
