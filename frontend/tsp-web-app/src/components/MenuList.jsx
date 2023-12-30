import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const MenuList = ({ locations, handleLocationRemove }) => {
    return (
        <div>
            <h2 style={{marginBottom:'0px'}}>Entered Locations:</h2>
            <List>
                {locations.map((location, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={location} />
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleLocationRemove(index)}
                        >
                            <DeleteIcon style={{color:'white'}}/>
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default MenuList;
