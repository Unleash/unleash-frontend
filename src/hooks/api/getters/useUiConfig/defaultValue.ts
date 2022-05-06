import { LibraryBooks } from '@mui/icons-material';

export const defaultValue = {
    name: 'Unleash',
    version: '3.x',
    environment: '',
    slogan: 'The enterprise ready feature toggle service.',
    flags: {
        P: false,
        C: false,
        E: false,
        RE: false,
        EEA: false,
        CO: false,
        SE: false,
        T: false,
    },
    links: [
        {
            value: 'Documentation',
            icon: LibraryBooks,
            href: 'https://docs.getunleash.io/docs?source=oss',
            title: 'User documentation',
        },
        {
            value: 'GitHub',
            icon: 'c_github',
            href: 'https://github.com/Unleash',
            title: 'Source code on GitHub',
        },
    ],
};
