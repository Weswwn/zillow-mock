import React, { useState } from 'react';
import Dropdown from './dropdown';

const SearchInput = () => {
  const [items, setItems] = useState([]);
  const handleSearch = (e) => {
    if (e.target.value.length) {
      fetch('http://localhost:3002/address?' + new URLSearchParams({
        search: e.target.value
      }), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .then(res => setItems(res))
        .catch(err => console.log(err));
    } else {
      setItems([]);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <label style={{ marginBottom: '16px' }}>Apartment Search</label>
          <input placeholder="Enter an address, neighborhood, city, or ZIP code" style={{ height: '2rem', width: '32rem', paddingLeft: '1rem', paddingRight: '1rem' }} onChange={handleSearch}></input>
        </div>
        {items.length ? <Dropdown items={items} /> : null}
      </div>
    </div>
  );
};
export default SearchInput;