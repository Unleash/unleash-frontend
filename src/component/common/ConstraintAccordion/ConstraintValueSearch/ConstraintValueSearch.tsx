import { TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

interface IConstraintValueSearchProps {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const ConstraintValueSearch = ({
    filter,
    setFilter,
}: IConstraintValueSearchProps) => {
    return (
        <div style={{ width: '300px' }}>
            <TextField
                label="Search"
                name="search"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Filter values"
                style={{
                    width: '100%',
                    margin: '1rem 0',
                }}
                variant="outlined"
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};
