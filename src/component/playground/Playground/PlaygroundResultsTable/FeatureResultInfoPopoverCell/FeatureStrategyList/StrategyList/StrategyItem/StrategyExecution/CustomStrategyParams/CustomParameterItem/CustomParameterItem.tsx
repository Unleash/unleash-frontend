import { Typography, useTheme } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useStyles } from './CustomParameterItem.styles';
import StringTruncator from 'component/common/StringTruncator/StringTruncator';
import { CancelOutlined } from '@mui/icons-material';
import classnames from 'classnames';

interface ICustomParameterItem {
    text: string;
    input?: string | null;
    isRequired?: boolean;
}

export const CustomParameterItem = ({
    text,
    input = null,
    isRequired = false,
}: ICustomParameterItem) => {
    const { classes: styles } = useStyles();
    const theme = useTheme();

    const color = input === null ? 'error' : 'neutral';
    const requiredError = isRequired && input === null;

    return (
        <div className={classnames(styles.container)}>
            <Typography
                variant="subtitle1"
                color={theme.palette[color].main}
                sx={{ minWidth: 118 }}
            >
                {`${input === null ? 'no value' : input}`}
            </Typography>
            <div className={styles.column}>
                <p className={styles.paragraph}>
                    <ConditionallyRender
                        condition={Boolean(requiredError)}
                        show={
                            <>
                                <Typography
                                    component="span"
                                    color={theme.palette.error.main}
                                >
                                    {' required parameter '}
                                </Typography>
                                <StringTruncator
                                    maxWidth="300"
                                    text={text}
                                    maxLength={50}
                                />
                                <Typography
                                    component="span"
                                    color={theme.palette.error.main}
                                >
                                    {' is not set '}
                                </Typography>
                            </>
                        }
                        elseShow={
                            <>
                                <Typography
                                    component="span"
                                    color="text.disabled"
                                >
                                    {' set on parameter '}
                                </Typography>
                                <StringTruncator
                                    maxWidth="300"
                                    text={text}
                                    maxLength={50}
                                />
                            </>
                        }
                    />
                </p>
            </div>
            <ConditionallyRender
                condition={Boolean(requiredError)}
                show={<CancelOutlined color={'error'} />}
                elseShow={<div />}
            />
        </div>
    );
};
