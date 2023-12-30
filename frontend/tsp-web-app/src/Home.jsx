import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {StyledMenuHeader, StyledMenuSelect, StyledMenuSearch, StyledMenuLocations, StyledMenuSubmit} from './components/MenuSection';
import './App.css';
import MenuHeader from './components/MenuHeader';
import MenuSearch from './components/MenuSearch';
import MenuAlgorithm from './components/MenuAlgorithm';
import MenuMode from './components/MenuMode';
import MenuList from './components/MenuList';
import MenuSubmit from './components/MenuSubmit';
import { StyledContainer } from './components/StyledContainer';

function Home() {
  const [route, setRoute] = useState([]);
  const [locations, setLocations] = useState([]);
  const [enteredMode, setMode] = useState('DRIVING')
  const [enteredAlgorithm, setAlgorithm] = useState('nearest-neighbour')

  const navigate = useNavigate();

  const handleLocationSubmit = (location) => {
    setLocations((prevLocations) => [...prevLocations, location]);
    console.log("Locations:", locations);
  };

  const handleLocationRemove = (index) => {
    setLocations((prevLocations) =>
      prevLocations.filter((_, i) => i !== index)
    );
  };

  const handleModeSubmit = (mode) => {
    setMode(mode);
    console.log('Mode:', mode);
  };

  const handleAlgorithmSubmit = (algorithm) => {
    setAlgorithm(algorithm);
    console.log('Algorithm:', algorithm);
  };

  const handleMenuSubmit = async () => {
    try {
      const response = await fetch('/api/main_algorithm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          algorithm: enteredAlgorithm,
          mode: enteredMode,
          locations: locations,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('API Call Successful');
        console.log('API Response:', data);
        setRoute(data);

        navigate('/map', {state: {data, locations}});

      } else {
        console.error('API Call Failed');
      }
    } catch (error) {
      console.error('Error Calling API:', error);
    }
  };

  return (
    <div>
      <div className="column">
        <StyledMenuHeader>
          <MenuHeader />
        </StyledMenuHeader>
        <StyledMenuSelect>
          <MenuAlgorithm handleAlgorithmSubmit={handleAlgorithmSubmit}/>
          <MenuMode handleModeSubmit={handleModeSubmit}/>
        </StyledMenuSelect>
        <StyledMenuSearch>
          <MenuSearch handleLocationSubmit={handleLocationSubmit} />
        </StyledMenuSearch>
        <StyledMenuLocations>
            <StyledContainer className="location-container">
                <MenuList locations={locations} handleLocationRemove={handleLocationRemove} />
            </StyledContainer>
        </StyledMenuLocations>
        <StyledMenuSubmit>
            <MenuSubmit handleMenuSubmit={handleMenuSubmit}/>
        </StyledMenuSubmit>
      </div>
    </div>
  );
};

export default Home;

