import renderer from 'react-test-renderer';
import { FeedbackCESForm } from './FeedbackCESForm';
import { ThemeProvider } from 'themes/ThemeProvider';

test('FeedbackCESForm', () => {
    const onClose = () => {
        throw new Error('Unexpected onClose call.');
    };

    const tree = renderer.create(
        <ThemeProvider>
            <FeedbackCESForm
                onClose={onClose}
                state={{ title: 'a', text: 'b', path: '/c' }}
            />
        </ThemeProvider>
    );

    expect(tree).toMatchSnapshot();
});
