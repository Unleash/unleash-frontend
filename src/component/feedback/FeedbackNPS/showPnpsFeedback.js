import differenceInDays from 'date-fns/differenceInDays';

export const PNPS_FEEDBACK_ID = 'pnps';

export const showPnpsFeedback = feedbackList => {
    if (!feedbackList) return;
    if (feedbackList.length > 0) {
        const feedback = feedbackList.find(
            feedback => feedback.feedbackId === PNPS_FEEDBACK_ID
        );

        if (!feedback) return false;

        if (feedback.neverShow) {
            return false;
        }

        if (feedback.given) {
            const SIX_MONTHS_IN_DAYS = 182;
            const now = new Date();
            const difference = differenceInDays(now, new Date(feedback.given));

            return difference > SIX_MONTHS_IN_DAYS;
        }
        return false;
    }
    return true;
};
