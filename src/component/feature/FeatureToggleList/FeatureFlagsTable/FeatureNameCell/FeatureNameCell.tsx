import { FC } from 'react';
import { Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useStyles } from './FeatureNameCell.styles';
import { Highlighter } from 'component/common/Highlighter/Highlighter';

interface IFeatureNameCellProps {
    name?: string;
    project?: string;
    description?: string;
    __search?: string;
}

export const FeatureNameCell: FC<IFeatureNameCellProps> = ({
    name,
    project,
    description,
    __search,
}) => {
    const styles = useStyles();
    return (
        <>
            <Link
                component={RouterLink}
                to={`/projects/${project}/features/${name}`}
            >
                <ConditionallyRender
                    condition={Boolean(__search)}
                    show={
                        <Highlighter search={__search!}>
                            {name || ''}
                        </Highlighter>
                    }
                    elseShow={name}
                />
            </Link>

            <ConditionallyRender
                condition={Boolean(description)}
                show={
                    <>
                        <br />
                        <Typography
                            className={styles.description}
                            component="span"
                        >
                            <ConditionallyRender
                                condition={Boolean(__search)}
                                show={
                                    <Highlighter search={__search!}>
                                        {description!}
                                    </Highlighter>
                                }
                                elseShow={description}
                            />
                        </Typography>
                    </>
                }
            />
        </>
    );
};
