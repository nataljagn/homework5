import { useState } from 'react';

const NewLocation = ({ onAddNewLocation, locations }) => {
    const [newLocationName, setNewLocationName] = useState('');
    const [newLocationLatitude, setNewLocationLatitude] = useState('');
    const [newLocationLongitude, setNewLocationLongitude] = useState('');

    const handleAddClick = () => {
            if (!(newLocationName && !isNaN(newLocationLatitude) && !isNaN(newLocationLongitude))) { 
                alert('Please insert correct data!');
                return;
            }

            if(locations.filter(item => item.name === newLocationName).length) {
                alert('Location already exists');
                return;
            }

            onAddNewLocation({
                name: newLocationName,
                latitude: newLocationLatitude,
                longitude: newLocationLongitude,
            });

            setNewLocationName('');
            setNewLocationLatitude('');
            setNewLocationLongitude('');
        
    };

    return (

        <div style={{ display: 'flex', flexDirection: 'column' }} >
            
            <input
                placeholder='Name'
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
            />
          
            <input
                placeholder='Longitude'
                value={newLocationLatitude}
                onChange={(e) => setNewLocationLatitude(e.target.value)}
            />
           
            <input
                placeholder='Latitude'
                value={newLocationLongitude}
                onChange={(e) => setNewLocationLongitude(e.target.value)}
            />
            <button
                onClick={handleAddClick}
                disabled={!newLocationName || !newLocationLatitude || !newLocationLongitude ? true : false}
            >
                Add Location
            </button>
        </div>
    );
};

export default NewLocation;
