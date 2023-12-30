import React, {useState} from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/MenuItem';
import MenuItem from '@mui/material/MenuItem';
import {styled} from '@mui/material/styles';


const StyledSelect = styled(Select)({
    color: 'white',
    '& fieldset':{
        borderColor:'white',
    },
    fontFamily:'Helvetica',
    fontSize:'16px',
    marginBottom:'18px',
});

const MenuAlgorithm =  ({handleAlgorithmSubmit}) => {
    const options = [
        { value: 'nearest-neighbour', label: 'Nearest Neighbour' },
        { value: 'two-opt', label: 'Two Opt' },
        { value: 'simulated-annealing', label: 'Simulated Annealing' },
    ];

    const [algorithm, setAlgorithm] = useState(options[0].value);

    const handleAlgoSelect = (event) => {
        setAlgorithm(event.target.value);
        handleAlgorithmSubmit(event.target.value);
    };

    return (
        <div>
            <div>
                <label htmlFor="algorithm-select" style={{fontFamily:'Helvetica', fontSize:'22px', marginBottom:'10px', marginTop:'0px'}}>Choose an Algorithm</label>
            </div>
            <StyledSelect
                value={algorithm}
                onChange={handleAlgoSelect}
                labelId="algorithm-select"
                variant="outlined"
                renderValue={(selected) => {
                    const selectedOption = options.find(option => option.value === selected);
                    return selectedOption ? selectedOption.label : '';
                }}            
                >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </StyledSelect>
        </div>
    )
};

export default MenuAlgorithm;