import { useEffect, useState } from 'react';
import { formatApiPath } from 'utils/formatPath';

export const useSegmentValidation = (name: string): string | undefined => {
    const [error, setError] = useState<string>();

    useEffect(() => {
        setError(undefined);
        fetch(formatApiPath('api/admin/segments/validate'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        })
            .then(parseValidationResponse)
            .then(setError)
            .catch(() => setError(undefined));
    }, [name]);

    return error;
};

const parseValidationResponse = async (
    res: Response
): Promise<string | undefined> => {
    if (res.ok) {
        return;
    }

    const json = await res.json();
    return json.details[0].message;
};
