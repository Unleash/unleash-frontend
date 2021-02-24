const ConditionallyRender = ({ condition, show, elseShow }) => {
    if (condition && show) {
        if (typeof show === 'function') {
            const result = show();
            if (!result) {
                /* eslint-disable-next-line */
                console.warn(
                    'Nothing was returned from your render function. Verify that you are returning a valid react component'
                );
                return null;
            }
            return result;
        }

        return show;
    }
    if (!condition && elseShow) return elseShow;
    return null;
};

export default ConditionallyRender;
