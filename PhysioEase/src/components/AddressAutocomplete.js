import React, { useState, useEffect, useRef } from 'react';
import { searchAddress } from '../services/apiService';
import debounce from 'lodash.debounce';

function AddressAutocomplete({ onSelect, countryCode }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const debouncedSearchRef = useRef();

  useEffect(() => {
    debouncedSearchRef.current = debounce(async (input) => {
      if (!input) return;
      try {
        const data = await searchAddress(input, countryCode);
        setResults(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch suggestions');
      }
    }, 500);

    return () => {
      debouncedSearchRef.current.cancel();
    };
  }, [countryCode]);

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    debouncedSearchRef.current(input);
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setResults([]);
    if (onSelect) onSelect(place);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Start typing an address..."
        style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #0000FF' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {results.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              style={{
                cursor: 'pointer',
                padding: '6px',
                borderBottom: '1px solid #ccc',
                color: '#000',
                backgroundColor: '#f9f9f9'
              }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AddressAutocomplete;