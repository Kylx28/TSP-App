import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { Drawer, IconButton, Toolbar, AppBar, List, ListItemButton, ListItemText, ListSubheader, Divider} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';


const Token = "pk.eyJ1Ijoia3lseDI4IiwiYSI6ImNsbHN0M2wyZDB3d3czZG1sYzV1aWIwbG4ifQ.Hy1ju1ksgiRsSofMtplGuw";

function TSPMap(){
    const location = useLocation();
    const {data, locations} = location.state;
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [open, setOpen] = useState(true);
    const [markers, setMarkers] = useState([]);
    const [viewport, setViewport] = useState({
        latitude: 51.1375,
        longitude:  -97.78685,
        zoom: 4,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const orderedRoute = data.Route;
        const orderedLocations = orderedRoute.map((index) => locations[index]);
        const findCenter = async () => {
            try {
                const coordinates = await Promise.all(
                    orderedLocations.map((location) => {
                        return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                            location
                        )}.json?access_token=${Token}`)
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.features.length > 0) {
                                    return data.features[0].center;
                                }
                                throw new Error(`Location not found: ${location}`);
                            });
                    })
                );

                const avgLatitude = coordinates.reduce((sum, coord) => sum + coord[1], 0) / coordinates.length;
                const avgLongitude = coordinates.reduce((sum, coord) => sum + coord[0], 0) / coordinates.length;

                // const firstLoc = coordinates[0];
                // coordinates.push(firstLoc);

                setViewport({ latitude: avgLatitude, longitude: avgLongitude, zoom: 12 });
                setMarkers(coordinates);
            } catch (error) {
                console.error('Error Geocoding:', error);
            }
        };
        findCenter();
    }, []);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleHomeSubmit = () => {
        navigate('/');
    };

    const handleLocationZoom = (index) => {
        const selectedCoords = markers[index];
        setViewport({
            ...viewport,
            latitude: selectedCoords[1],
            longitude: selectedCoords[0],
            zoom: 17,
        });
    };

    const apiRoute = data.Route;
    const sortedLocations = apiRoute.map(index => locations[index]);

    useEffect(() => {
        const duration = data.Cost;
        if(duration < 60){
            setSeconds(duration);
        }
        else if(duration < 3600){
            setMinutes(Math.floor(duration / 60));
            setSeconds(Math.floor(((duration / 60) - minutes) * 60));
        }
        else{
            setHours(Math.floor(duration / 60 / 60));
            setMinutes(Math.floor(((duration / 60 / 60) - hours) * 60));
            setSeconds(Math.round(((((duration / 60 / 60) - hours) * 60) - minutes) * 60));
            
        }
    });

    return(
        <div className="wrapper">
            <AppBar position="fixed" >
                <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor:'#2d2d30'}}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                        <div>
                            <IconButton
                                color="inherit"
                                aria-label="home"
                                onClick={handleHomeSubmit}
                                edge="end"
                            >
                                <HomeIcon/>
                            </IconButton>
                        </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                PaperProps={{
                    style:{
                        width: '300px',
                        backgroundColor: '#3e3e42',
                        color:'white',
                    },
                }}
            >
                <div className="drawer-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ListSubheader
                        sx={{ textAlign: 'left', fontFamily: 'Helvetica', fontWeight:'bold', fontSize: '20px', color: '#E0C2FF', backgroundColor: '#3e3e42' }}
                    >
                        TSP Route Generator
                    </ListSubheader>
                    <div className="header-button">
                        <IconButton onClick={toggleDrawer}>
                            <MenuIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                </div>
                <div className="sidebar-content">
                    <Divider/>
                    <List
                        subheader={<ListSubheader 
                            sx={{textAlign:'left', fontWeight:'bolder', fontSize:'20px', color:'white', backgroundColor:'#3e3e42'
                                }}>
                        Duration (Travel Time)
                        </ListSubheader>}
                    >
                    </List>
                    <Divider/>
                    <List>
                        <ListSubheader sx={{textAlign:'left',fontSize:'17px', color:'white', backgroundColor:'#3e3e42'}}>
                            {hours} hours {minutes} minutes {seconds} seconds
                        </ListSubheader>
                    </List>
                    <Divider/>
                    <List 
                        subheader={<ListSubheader 
                                    sx={{textAlign:'left', fontWeight:'bolder', fontSize:'20px', color:'white', backgroundColor:'#3e3e42'
                                }}>
                        Route
                        </ListSubheader>}>
                        <Divider/>
                        {sortedLocations.map((location, index) => (
                            <ListItemButton 
                                key={index}
                                onClick={() => handleLocationZoom(index)}>
                            <ListItemText primary={location} style={{fontFamily:'Helvetica'}}/>
                            </ListItemButton>
                        ))}
                    </List>
                </div>
            </Drawer>
            <Map
            {...viewport}
            onMove={evt => setViewport(evt.viewState)}
            mapboxAccessToken={Token}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            >
                <Source id="route" type="geojson" data={{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: markers,
                    },
                }}>
                    <Layer
                        id="route"
                        type="line"
                        source="route"
                        layout={{
                            'line-join': 'round',
                            'line-cap': 'round',
                        }}
                        paint={{
                            'line-color':'#808080',
                            'line-width': 6,
                        }}
                    />
                </Source>
                {markers.map((coordinate, index) => (
                    <div key={index} className="marker-label-container">
                        {/* <div className="marker-label">{locations[index]}</div> */}
                        <Marker
                        latitude={coordinate[1]}
                        longitude={coordinate[0]}
                        color="#E0C2FF"
                        onClick={() => handleLocationZoom(index)}
                        >
                        </Marker>
                    </div>
                ))}
            </Map>
        </div>
    );
};

export default TSPMap;