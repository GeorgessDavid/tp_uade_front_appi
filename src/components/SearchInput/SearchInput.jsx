import { Button } from '@mui/material';
import './SearchInput.css';

const SearchInput = ({ placeholder, onChange, value, onSearch }) => {
    return (
        <div className="search-input">
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
            <Button onClick={onSearch} variant='outlined' color="success" >Buscar</Button>
        </div>
    );
};

export default SearchInput;