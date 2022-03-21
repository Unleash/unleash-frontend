import { useHistory } from 'react-router-dom';
import { CreateContext } from './CreateContext';

export const CreateContextPage = () => {
    const { push, goBack } = useHistory();
    return (
        <CreateContext
            onSubmit={() => push('/context')}
            onCancel={() => goBack()}
        />
    );
};
