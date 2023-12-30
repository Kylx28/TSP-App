import React, {useState} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {styled} from '@mui/material/styles';

const StyledSelect = styled(Select)({
    color: 'white',
    '& fieldset':{
        borderColor:'white',
    },
    fontFamily:'Helvetica',
    fontSize:'16px',
    marginBottom:'24px',
});

const MenuMode =  ({handleModeSubmit}) => {
    const options = [
        {value: 'DRIVING', label: 'Driving'},
        {value: 'WALKING', label: 'Walking'},
        {value: 'TRANSIT', label: 'Transit'},
    ];

    const [mode, setMode] = useState(options[0].value);

    const handleModeSelect = (event) => {
        setMode(event.target.value);
        handleModeSubmit(event.target.value);
    };

    return (
        <div>
            <div>
                <label htmlFor="mode-select" style={{fontFamily:'Helvetica', fontSize:'22px', marginBottom:'12px'}}>Choose a Travel Mode</label>
            </div>
            <StyledSelect
                value={mode}
                onChange={handleModeSelect}
                labelId="mode-select"
                variant="outlined"
                renderValue={(selected) => {
                    const selectedOption = options.find(option => option.value === selected);
                    return selectedOption ? selectedOption.label : '';
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value} >
                        {option.label}
                    </MenuItem>
                ))}
            </StyledSelect>
        </div>
    )
};

export default MenuMode;