import React from 'react';

function DoctorCard({ doctor }) {
  return (
    <div className="card mb-3" data-testid="doctor-card">
      <div className="row g-0">
        <div className="col-md-2">
          <img src={doctor.photo} className="img-fluid rounded-start" alt="doctor" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title" data-testid="doctor-name">{doctor.name}</h5>
            <p className="card-text" data-testid="doctor-specialty">
              {doctor.specialities.map(spec => spec.name).join(', ')}
            </p>
            <p className="card-text" data-testid="doctor-experience">{doctor.experience}</p>
          </div>
        </div>
        <div className="col-md-2 d-flex flex-column align-items-center justify-content-center">
          <p className="text-end fw-bold" data-testid="doctor-fee">{doctor.fees}</p>
          <button className="btn btn-outline-primary">Book Appointment</button>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
