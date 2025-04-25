import React from 'react';

const specialtiesList = [
  "General Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist",
  "ENT", "Diabetologist", "Cardiologist", "Physiotherapist", "Endocrinologist",
  "Orthopaedic", "Ophthalmologist", "Gastroenterologist", "Pulmonologist",
  "Psychiatrist", "Urologist", "Dietitian/Nutritionist", "Psychologist", "Sexologist",
  "Nephrologist", "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
];

function Filters({ filters, onFiltersChange }) {

  const handleModeChange = (e) => {
    onFiltersChange({ consultationMode: e.target.value });
  };

  const handleSpecialtyChange = (e) => {
    const specialty = e.target.value;
    let updatedSpecialties = [...filters.specialties];
    if (e.target.checked) {
      updatedSpecialties.push(specialty);
    } else {
      updatedSpecialties = updatedSpecialties.filter(spec => spec !== specialty);
    }
    onFiltersChange({ specialties: updatedSpecialties });
  };

  const handleSortChange = (e) => {
    onFiltersChange({ sortBy: e.target.value });
  };

  return (
    <div className="p-3 border bg-white">
      <div>
        <h6 data-testid="filter-header-sort">Sort by</h6>
        <div>
          <input type="radio" id="sort-fees" value="fees" checked={filters.sortBy === 'fees'} onChange={handleSortChange} data-testid="sort-fees" /> Price: Low-High
        </div>
        <div>
          <input type="radio" id="sort-experience" value="experience" checked={filters.sortBy === 'experience'} onChange={handleSortChange} data-testid="sort-experience" /> Experience- Most Experienced
        </div>
      </div>

      <hr />

      <div>
        <h6 data-testid="filter-header-speciality">Specialities</h6>
        {specialtiesList.map((spec) => (
          <div key={spec}>
            <input
              type="checkbox"
              value={spec}
              checked={filters.specialties.includes(spec)}
              onChange={handleSpecialtyChange}
              data-testid={`filter-specialty-${spec.replaceAll(' ', '-').replace('/', '-')}`}
            /> {spec}
          </div>
        ))}
      </div>

      <hr />

      <div>
        <h6 data-testid="filter-header-moc">Mode of Consultation</h6>
        <div>
          <input type="radio" value="video" checked={filters.consultationMode === 'video'} onChange={handleModeChange} data-testid="filter-video-consult" /> Video Consultation
        </div>
        <div>
          <input type="radio" value="clinic" checked={filters.consultationMode === 'clinic'} onChange={handleModeChange} data-testid="filter-in-clinic" /> In-clinic Consultation
        </div>
      </div>
    </div>
  );
}

export default Filters;
