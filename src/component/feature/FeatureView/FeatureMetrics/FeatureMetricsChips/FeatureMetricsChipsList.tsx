import { styled } from '@material-ui/core';
import { ReactNode } from 'react';

interface IFeatureMetricsChipsProps {
    title: string;
    children: ReactNode;
}

export const FeatureMetricsChipsList = ({
    title,
    children,
}: IFeatureMetricsChipsProps) => {
    return (
        <div>
            <Title>{title}</Title>
            <List>{children}</List>
        </div>
    );
};

const Title = styled('h3')(({ theme }) => ({
    margin: 0,
    marginBottom: '.5rem',
    fontSize: theme.fontSizes.smallerBody,
    fontWeight: theme.fontWeight.thin,
    color: theme.palette.grey[600],
}));

const List = styled('ul')({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '.5rem',
    listStyleType: 'none',
    padding: 0,
    minHeight: '100%',
});
