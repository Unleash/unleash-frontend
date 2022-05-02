import { FC } from 'react';
import { Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useStyles } from './FeatureNameCell.styles';
import { Highlighter } from 'component/common/Highlighter/Highlighter';

interface IFeatureNameCellProps {
    name: string;
    project: string;
    description?: string;
    search?: string;
}

export const FeatureNameCell: FC<IFeatureNameCellProps> = ({
    children,
    name,
    project,
    description,
    search,
}) => {
    const styles = useStyles();
    return (
        <>
            <Link
                component={RouterLink}
                to={`/projects/${project}/features/${name}`}
            >
                <ConditionallyRender
                    condition={Boolean(search)}
                    show={<Highlighter search={search!}>{name}</Highlighter>}
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
                                condition={Boolean(search)}
                                show={
                                    <Highlighter search={search!}>
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
