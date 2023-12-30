import React, {useState} from 'react';
import { Typography, IconButton} from "@mui/material";
import {styled} from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

const ThemeDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(4),
    },
  }));

const MenuHeader = () => {
    const [open, setOpen] = useState(false);

    const titleStyles = {
        fontFamily: 'system-ui',
        fontSize:'36px',
        fontWeight: 'bold',
    };

const handleInfoOpen = () => {
    setOpen(true);
};

const handleInfoClose = () => {
    setOpen(false);
}

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom style={titleStyles}>
                TSP Route Generator
            </Typography>
            <IconButton onClick={handleInfoOpen}>
                <InfoIcon style={{fontSize:'38px', marginBottom:'10px', color:'white'}}/>
            </IconButton>
            <ThemeDialog
                onClose={handleInfoClose}
                aria-labelledby='info-dialog'
                open={open}
                PaperProps={{
                    style: {
                        backgroundColor:'#2d2d30',
                    }
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleInfoClose}
                    sx={{
                        position:'absolute',
                        right:8,
                        top:8,
                        color:'white',
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent>
                    <Typography gutterBottom style={{color:'white'}}>
                        TSP Route Generator allows you to enter a set of locations you'd like to
                        visit. Then, you can select your mode of transportation and which traveling
                        salesman algorithm you would like to use. The app will return a route based
                        on your inputs. When entering addresses, try to input the address as displayed
                        on google. Some addresses may not work with Google's Distance Matrix API.
                    </Typography>
                    <Typography gutterBottom style={{marginTop:'16px', color:'white'}}>
                        For nearest neighbour and two-opt, the route will start at the inital 
                        location, visit each of the locations once, and then return to the inital
                        location. For simulated annealing, the route will not return to the starting
                        location.
                    </Typography>
                    <Typography gutterBottom style={{marginTop:'16px', color:'white'}}>
                        This website was made using Python, Javascript, Flask, Vite, and
                        Material-UI for the frontend. It also uses Google's Distance Matrix API, 
                        and several different MapBox APIs.
                    </Typography>
                    <Divider sx={{borderBottomWidth: 3, backgroundColor:'white', marginTop:'18px'}}/>
                    <Typography gutterBottom style={{marginTop:'24px',fontSize:'18px', color:'white'}}>
                        Created By:
                    </Typography>
                    <Typography gutterBottom style={{fontSize:'18px', fontWeight:'bolder', color:'white'}}>
                        Kyle Sabado - Electrical Engineering, University of Toronto
                    </Typography>
                </DialogContent>
            </ThemeDialog>
            <IconButton target="_blank" href="https://github.com/Kylx28">
                <GitHubIcon style={{fontSize:'34px', marginBottom:'10px', color:'white'}}/>
            </IconButton>
        </div>
    )
};

export default MenuHeader;