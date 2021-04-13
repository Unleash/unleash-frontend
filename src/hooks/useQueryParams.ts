import { useLocation } from 'react-router';

const useQueryParams = () => {
    console.log(useLocation().search);
    return new URLSearchParams(useLocation().search);
};

export default useQueryParams;
