import { Card, IconButton } from '@material-ui/core';
import { useStyles } from './ProjectCard.styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ReactComponent as ProjectIcon } from '../../../assets/icons/projectIcon.svg';

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
            <div className={styles.header}>
                <h2 className={styles.title}>{projectName}</h2>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
            <ProjectIcon className={styles.projectIcon} />
            <div className={styles.info}>
                <div className={styles.infoBox}>
                    <p className={styles.infoStats}>{toggles}</p>
                    <p>toggles</p>
                </div>
                <div className={styles.infoBox}>
                    <p className={styles.infoStats}>{health}%</p>
                    <p>health</p>
                </div>

                <div className={styles.infoBox}>
                    <p className={styles.infoStats}>{members}</p>
                    <p>members</p>
                </div>
            </div>
        </Card>
    );
};

export default ProjectCard;
