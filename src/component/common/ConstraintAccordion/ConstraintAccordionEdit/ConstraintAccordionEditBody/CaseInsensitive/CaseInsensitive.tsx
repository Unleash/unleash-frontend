import { FormControlLabel, Checkbox, Switch } from '@material-ui/core';

interface ICaseInsensitiveProps {
    caseInsensitive: boolean;
    setCaseInsensitive: (caseInsensitive: boolean) => void;
}

export const CaseInsensitive = ({
    caseInsensitive,
    setCaseInsensitive,
}: ICaseInsensitiveProps) => {
    return (
        <>
            <h3>Should the constraint be case insensitive?</h3>
            <FormControlLabel
                style={{ display: 'block' }}
                control={
                    <Switch
                        checked={caseInsensitive}
                        onChange={() => setCaseInsensitive(!caseInsensitive)}
                        color="primary"
                    />
                }
                label={'Case insensitive'}
            />
        </>
    );
};
