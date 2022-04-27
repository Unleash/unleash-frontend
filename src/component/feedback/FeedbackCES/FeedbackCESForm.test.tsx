import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import renderer from 'react-test-renderer';
import { FeedbackCESForm } from './FeedbackCESForm';
import mainTheme from 'themes/mainTheme';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


test('FeedbackCESForm', () => {
    const onClose = () => {
        throw new Error('Unexpected onClose call.');
    };

    const tree = renderer.create(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={mainTheme}>
                <FeedbackCESForm
                    onClose={onClose}
                    state={{ title: 'a', text: 'b', path: '/c' }}
                />
            </ThemeProvider>
        </StyledEngineProvider>
    );

    expect(tree).toMatchSnapshot();
});
