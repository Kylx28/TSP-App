import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#E0C2FF',
        }, 
    },
});

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiFormLabel-root': {
        color: 'white', // Change the default text color to white
    },
    '& .MuiOutlinedInput-input': {
        color: 'white', // Change the input text color to white
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Change the border color
    },
}));

const MenuSearch = ({handleLocationSubmit}) => {
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(location.trim() !== ''){
            handleLocationSubmit(location);
            setLocation('');
        }
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    return (
        <div>
            <div>
                <label style={{fontFamily:'Helvetica', fontSize:'22px', marginBottom:'12px'}}>Enter an Address</label>
            </div>
            <div>
                <StyledTextField 
                    label="Enter Location" 
                    variant="outlined"
                    value={location}
                    onChange={handleLocationChange}
                    style={{marginBottom:'16px'}}
                />
            </div>
            <ThemeProvider theme={theme}>
                <Button variant="contained" color="secondary" onClick={handleSubmit} style={{marginBottom:'16px'}}>
                    Add Location
                </Button>
            </ThemeProvider>
        </div>
    )
};

export default MenuSearch;