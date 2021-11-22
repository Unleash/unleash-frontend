import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Remove from '@material-ui/icons/Remove';

interface IRolloutIconProps {
    fill: string;
    className?: string;
}

const RolloutIcon = ({ fill, className }: IRolloutIconProps) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                minWidth: '50px',
                height: '100%',
            }}
        >
            <Remove
                style={{
                    position: 'absolute',
                    borderRadius: '1px',
                    height: '50px',
                    width: '50px',
                    right: 0,
                    left: 0,
                    margin: '0 auto',
                }}
                className={className}
            />
            <FiberManualRecordIcon
                style={{
                    width: '15px',
                    height: '15px',
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    borderRadius: '1px',
                    margin: '0 auto',
                    fill,
                }}
                className={className}
            />
        </div>
    );
};

export default RolloutIcon;
