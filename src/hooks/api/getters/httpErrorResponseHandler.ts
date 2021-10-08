const handleErrorResponses = (target: string) => async (res: Response) => {
    if (!res.ok) {
        console.log(res.status);
        const error = new Error(`An error occurred while trying to get ${target}`);
        // @ts-ignore
        try {
            error.info = await res.json();
        } catch (e) {
            // Try to resolve body, but don't rethrow res.json is not a function
            error.info = {};
        }
        // @ts-ignore
        error.status = res.status;
        // @ts-ignore
        error.statusText = res.statusText;
        throw error;
    }
    return res;
}

export default handleErrorResponses;
