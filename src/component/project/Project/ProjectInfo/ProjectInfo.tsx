import { Paper } from '@material-ui/core';
import { useStyles } from './ProjectInfo.styles';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import classnames from 'classnames';

import { ReactComponent as ProjectIcon } from '../../../../assets/icons/projectIcon.svg';
import { useCommonStyles } from '../../../../common.styles';

const ProjectInfo = () => {
    const commonStyles = useCommonStyles();
    const styles = useStyles();
    return (
        <aside>
            <Paper className={styles.projectInfo}>
                <div className={styles.infoSection}>
                    <p className={styles.subtitle}>Project activity</p>
                    <ProjectIcon />
                </div>

                <div className={styles.infoSection}>
                    <p className={styles.subtitle}>Overall health rating</p>
                    <p className={styles.emphazisedText}>83%</p>
                    <Link
                        className={classnames(
                            commonStyles.flexRow,
                            commonStyles.justifyCenter
                        )}
                        to=""
                    >
                        view more{' '}
                        <ArrowForwardIcon className={styles.arrowIcon} />
                    </Link>
                </div>

                <div className={styles.infoSection}>
                    <p className={styles.subtitle}>Project members</p>
                    <p className={styles.emphazisedText}>2</p>
                    <Link
                        className={classnames(
                            commonStyles.flexRow,
                            commonStyles.justifyCenter
                        )}
                        to=""
                    >
                        view more{' '}
                        <ArrowForwardIcon className={styles.arrowIcon} />
                    </Link>
                </div>

                <div className={styles.infoSection}>
                    <p className={styles.subtitle}>Feature toggles</p>
                    <p className={styles.emphazisedText}>13</p>
                </div>
            </Paper>
        </aside>
    );
};

export default ProjectInfo;
