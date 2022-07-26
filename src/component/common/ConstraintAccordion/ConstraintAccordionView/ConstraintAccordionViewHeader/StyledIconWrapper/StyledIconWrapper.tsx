import { styled } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { FC } from 'react';

export const StyledIconWrapperBase = styled('div')<{
    prefix?: boolean;
}>(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    width: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    color: theme.palette.primary.main,
    marginRight: '1rem',
    borderRadius: theme.shape.borderRadius,
}));

const StyledPrefixIconWrapper = styled(StyledIconWrapperBase)(() => ({
    marginRight: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
}));

export const StyledIconWrapper: FC<{ isPrefix?: boolean }> = ({
    isPrefix,
    ...props
}) => (
    <ConditionallyRender
        condition={Boolean(isPrefix)}
        show={() => <StyledPrefixIconWrapper {...props} />}
        elseShow={() => <StyledIconWrapperBase {...props} />}
    />
);
