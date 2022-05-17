import { Button } from '@mui/material';
import { FC } from 'react';

const href = `mailto:elise@getunleash.ai?subject=Continue with Unleash&body=Hi Unleash,%0D%0A%0D%0A
I would like to continue with Unleash.%0D%0A%0D%0A%0D%0A%0D%0A

Billing information:%0D%0A%0D%0A

1. Company name (legal name): [add your information here]%0D%0A%0D%0A
2. Email address (where we will send the invoice): [add your information here]%0D%0A%0D%0A
3. Address: [add your information here]%0D%0A%0D%0A
4. Country: [add your information here]%0D%0A%0D%0A
5. VAT ID (optional - only European countries): [add your information here]%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A



-- Thank you for signing up. We will upgrade your trial as quick as possible and we will grant you access to the application again. --`;

export const BillingInfoButton: FC = ({ children }) => {
    return (
        <Button
            href={href}
            variant="contained"
            sx={{
                width: '100%',
                marginBottom: '12px',
            }}
        >
            {children}
        </Button>
    );
};
