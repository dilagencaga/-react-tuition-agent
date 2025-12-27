import React from 'react';

function TuitionCard({ data }) {
  return (
    <div className="row bot">
      <div className="card">
        <h3>Harç Bilgisi / Tuition Info</h3>
        <div className="kv">
          <div className="k">Student No:</div>
          <div className="v">{data.studentNo}</div>
          <div className="k">Student Name:</div>
          <div className="v">{data.studentName || 'N/A'}</div>
          <div className="k">Faculty:</div>
          <div className="v">{data.faculty || 'N/A'}</div>
          <div className="k">Tuition Amount:</div>
          <div className="v">{data.tuition ? `${data.tuition} TL` : 'N/A'}</div>
          <div className="k">Last Payment Date:</div>
          <div className="v">{data.lastPaymentDate || 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}

export default TuitionCard;
