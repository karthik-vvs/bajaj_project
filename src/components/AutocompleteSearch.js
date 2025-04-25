import React, { useState } from 'react';

function AutocompleteSearch({ filters, onFiltersChange, doctors }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    onFiltersChange({ search: value });

    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      const matches = doctors
        .filter(doc => doc.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3);
      setSuggestions(matches);
    }
  };

  const handleSuggestionClick = (name) => {
    onFiltersChange({ search: name });
    setSuggestions([]);
  };

  return (
    <div className="p-3 bg-primary">
      <input
        type="text"
        className="form-control"
        placeholder="Search Symptoms, Doctors, Specialists, Clinics"
        data-testid="autocomplete-input"
        value={filters.search}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <div className="bg-white border">
          {suggestions.map((item) => (
            <div
              key={item.id}
              className="p-2"
              style={{ cursor: 'pointer' }}
              data-testid="suggestion-item"
              onClick={() => handleSuggestionClick(item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AutocompleteSearch;
