export const parseQueryParams = (searchParams) => {
    return {
      search: searchParams.get('search') || '',
      consultationMode: searchParams.get('consultation') || '',
      specialties: searchParams.getAll('specialty'),
      sortBy: searchParams.get('sort') || '',
    };
  };
  
  export const generateQueryParams = (filters) => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.consultationMode) params.set('consultation', filters.consultationMode);
    if (filters.sortBy) params.set('sort', filters.sortBy);
    filters.specialties.forEach(spec => params.append('specialty', spec));
    return params;
  };
  
  export const filterDoctors = (doctors, filters) => {
    let result = [...doctors];
  
    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      result = result.filter(doc => doc.name.toLowerCase().includes(lowerSearch));
    }
  
    if (filters.consultationMode === 'video') {
      result = result.filter(doc => doc.video_consult);
    } else if (filters.consultationMode === 'clinic') {
      result = result.filter(doc => doc.in_clinic);
    }
  
    if (filters.specialties.length > 0) {
      result = result.filter(doc => 
        doc.specialities.some(spec => filters.specialties.includes(spec.name))
      );
    }
  
    if (filters.sortBy === 'fees') {
      result.sort((a, b) => parseInt(a.fees.replace(/\D/g, '')) - parseInt(b.fees.replace(/\D/g, '')));
    } else if (filters.sortBy === 'experience') {
      result.sort((a, b) => {
        const expA = parseInt(a.experience);
        const expB = parseInt(b.experience);
        return expB - expA;
      });
    }
  
    return result;
  };
  