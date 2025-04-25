import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AutocompleteSearch from './components/AutocompleteSearch';
import Filters from './components/Filters';
import DoctorCard from './components/DoctorCard';
import { fetchDoctors } from './api';
import { filterDoctors, parseQueryParams, generateQueryParams } from './utils';


function App() {
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: '',
    consultationMode: '',
    specialties: [],
    sortBy: '',
  });

  useEffect(() => {
    fetchDoctors().then(data => setAllDoctors(data));
  }, []);

  useEffect(() => {
    const queryFilters = parseQueryParams(searchParams);
    setFilters(prev => ({ ...prev, ...queryFilters }));
  }, [searchParams]);

  useEffect(() => {
    const result = filterDoctors(allDoctors, filters);
    setFilteredDoctors(result);
    setSearchParams(generateQueryParams(filters));
  }, [filters, allDoctors]);

  const handleFiltersChange = (updatedFilters) => {
    setFilters(prev => ({ ...prev, ...updatedFilters }));
  };

  return (
    <div className="container-fluid">
      <AutocompleteSearch filters={filters} onFiltersChange={handleFiltersChange} doctors={allDoctors} />
      <div className="row mt-3">
        <div className="col-md-3">
          <Filters filters={filters} onFiltersChange={handleFiltersChange} />
        </div>
        <div className="col-md-9">
          {filteredDoctors.map(doc => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
