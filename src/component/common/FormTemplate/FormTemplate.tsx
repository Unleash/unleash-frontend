import { useStyles } from './FormTemplate.styles';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Codebox from '../Codebox/Codebox';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Collapse,
    Grow,
    IconButton,
    useMediaQuery,
} from '@material-ui/core';
import { FileCopy, Info } from '@material-ui/icons';
import ConditionallyRender from '../ConditionallyRender';
import Loader from '../Loader/Loader';
import copy from 'copy-to-clipboard';
import useToast from '../../../hooks/useToast';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as MobileGuidanceBG } from '../../../assets/img/mobile-guidance-bg.svg';

interface ICreateProps {
    title: string;
    description: string;
    documentationLink: string;
    loading?: boolean;
    modal?: boolean;
    formatApiCode: () => string;
}

const FormTemplate: React.FC<ICreateProps> = ({
    title,
    description,
    children,
    documentationLink,
    loading,
    modal,
    formatApiCode,
}) => {
    const { setToastData } = useToast();
    const styles = useStyles();
    const smallScreen = useMediaQuery(`(max-width:${900}px)`);
    const [open, setOpen] = useState(false);

    const copyCommand = () => {
        if (copy(formatApiCode())) {
            setToastData({
                title: 'Successfully copied the command',
                text: 'The command should now be automatically copied to your clipboard',
                autoHideDuration: 6000,
                type: 'success',
                show: true,
            });
        } else {
            setToastData({
                title: 'Could not copy the command',
                text: 'Sorry, but we could not copy the command.',
                autoHideDuration: 6000,
                type: 'error',
                show: true,
            });
        }
    };

    return (
        <section
            className={classNames(styles.container, modal && styles.modal)}
        >
            <ConditionallyRender
                condition={smallScreen}
                show={
                    <div style={{ position: 'relative' }}>
                        <MobileGuidanceBG
                            style={{
                                position: 'absolute',
                                right: '-3px',
                                top: '-3px',
                                width: '75px',
                                height: '75px',
                            }}
                        />
                        <IconButton
                            style={{
                                position: 'absolute',
                                zIndex: 400,
                                right: 0,
                                clipPath:
                                    'ellipse(50% 0, 100% 0, 100% 100%, 80% 100%, 52% 62%, 19% 45%, 0 0)',
                            }}
                            onClick={() => setOpen(prev => !prev)}
                        >
                            <Info style={{ fill: '#fff' }} />
                        </IconButton>

                        <MobileGuidance description={description} open={open} />
                    </div>
                }
            />
            <div className={styles.formContent}>
                <ConditionallyRender
                    condition={loading || false}
                    show={<Loader />}
                    elseShow={
                        <>
                            <h2 className={styles.title}>{title}</h2>
                            {children}
                        </>
                    }
                />{' '}
            </div>
            <ConditionallyRender
                condition={!smallScreen}
                show={
                    <aside className={styles.sidebar}>
                        <p className={styles.description}>{description}</p>

                        <div className={styles.linkContainer}>
                            <MenuBookIcon className={styles.linkIcon} />
                            <a
                                className={styles.documentationLink}
                                href={documentationLink}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Learn more
                            </a>
                        </div>

                        <>
                            <h3 className={styles.subtitle}>
                                API Command{' '}
                                <IconButton onClick={copyCommand}>
                                    <FileCopy className={styles.icon} />
                                </IconButton>
                            </h3>
                            <Codebox text={formatApiCode()} />
                        </>
                    </aside>
                }
            />
        </section>
    );
};

interface IMobileGuidance {
    description: string;
    open: boolean;
}

const MobileGuidance = ({ description, open }: IMobileGuidance) => {
    const styles = useStyles();

    return (
        <Collapse in={open} timeout={500}>
            <aside className={styles.sidebar}>
                <p className={styles.description}>{description}</p>

                <div className={styles.linkContainer}>
                    <MenuBookIcon className={styles.linkIcon} />
                    <a
                        className={styles.documentationLink}
                        href={'test'}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Learn more
                    </a>
                </div>
            </aside>
        </Collapse>
    );
};

export default FormTemplate;
