import React from 'react';

function TuitionCard({ data }) {
  return (
    <div className="row bot">
      <div className="card">
        <h3>Harç Bilgisi / Tuition Info</h3>
        <div className="kv">
          <div className="k">Student No:</div>
          <div className="v">{data.studentNo || 'N/A'}</div>
          <div className="k">Term:</div>
          <div className="v">{data.term || 'N/A'}</div>
          <div className="k">Amount:</div>
          <div className="v">{data.balance !== undefined ? `${data.balance} TL` : 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}

export default TuitionCard;
