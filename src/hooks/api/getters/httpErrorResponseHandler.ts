const handleErrorResponses = async (res: Response) => {
    if (!res.ok) {
        const error = new Error('An error occurred while handling request');
        // @ts-ignore
        error.info = await res.json();
        // @ts-ignore
        error.status = res.status;
        // @ts-ignore
        error.statusText = res.statusText;
        throw error;
    }
    return res;
}

export default handleErrorResponses;
