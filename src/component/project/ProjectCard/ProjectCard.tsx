import { Card, IconButton } from '@material-ui/core';
import { useStyles } from './ProjectCard.styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ReactComponent as ProjectIcon } from '../../../assets/icons/projectIcon.svg';
import ConditionallyRender from '../../common/ConditionallyRender';
import { PROJECTCARDACTIONS } from '../../common/flags';

interface IProjectCard {
    projectName: string;
    toggles: number;
    health: number;
    members: number;
    onHover: () => void;
}

const ProjectCard = ({
    projectName,
    toggles,
    health,
    members,
    onHover,
}: IProjectCard) => {
    const styles = useStyles();
    return (
        <Card className={styles.projectCard} onMouseEnter={onHover}>
            <div className={styles.header} data-loading>
                <h2 className={styles.title}>{projectName}</h2>
                <ConditionallyRender
                    condition={PROJECTCARDACTIONS}
                    show={
                        <IconButton data-loading>
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
            </div>
            <div data-loading>
                <ProjectIcon className={styles.projectIcon} />
            </div>
            <div className={styles.info}>
                <div className={styles.infoBox}>
                    <p className={styles.infoStats} data-loading>
                        {toggles}
                    </p>
                    <p data-loading>toggles</p>
                </div>
                <div className={styles.infoBox}>
                    <p className={styles.infoStats} data-loading>
                        {health}%
                    </p>
                    <p data-loading>health</p>
                </div>

                <div className={styles.infoBox}>
                    <p className={styles.infoStats} data-loading>
                        {members}
                    </p>
                    <p data-loading>members</p>
                </div>
            </div>
        </Card>
    );
};

export default ProjectCard;
