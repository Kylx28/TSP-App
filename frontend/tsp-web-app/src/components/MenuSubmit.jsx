import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#E0C2FF',
        }, 
    },
});

const MenuSubmit = ({handleMenuSubmit}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleMenuSubmit();
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    Generate Route
                </Button>
            </ThemeProvider>
        </div>
    )
};

export default MenuSubmit;
