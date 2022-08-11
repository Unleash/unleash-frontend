import { styled } from '@mui/material';
import { CancelOutlined } from '@mui/icons-material';
import {
    PlaygroundConstraintSchema,
    PlaygroundRequestSchema,
} from 'component/playground/Playground/interfaces/playground.model';

const StyledConstraintErrorDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1.5),
    color: theme.palette.error.main,
}));

interface IConstraintErrorProps {
    constraint: PlaygroundConstraintSchema;
    input?: PlaygroundRequestSchema;
}

export const ConstraintError = ({
    constraint,
    input,
}: IConstraintErrorProps) => {
    const formatText = () => {
        const value = input?.context[constraint.contextName];

        if (value) {
            return `Constraint was not met because the value passed in the context: { ${value} } is not ${constraint.operator} ${constraint.contextName}`;
        }

        return `Constraint was not met because no value was specified for ${constraint.contextName}`;
    };

    return (
        <StyledConstraintErrorDiv>
            <CancelOutlined style={{ marginRight: '0.25rem' }} />
            {formatText()}
        </StyledConstraintErrorDiv>
    );
};
