import React from 'react';

function UnpaidList({ data }) {
  const unpaidStudents = data.unpaidStudents || [];

  return (
    <div className="row bot">
      <div className="card">
        <h3>Ödenmemiş Harçlar / Unpaid Tuitions</h3>
        {unpaidStudents.length === 0 ? (
          <div className="v">Tüm harçlar ödenmiş! / All tuitions paid!</div>
        ) : (
          <div className="kv">
            {unpaidStudents.map((student, index) => (
              <React.Fragment key={index}>
                <div className="k">Student No:</div>
                <div className="v">{student.studentNo}</div>
                <div className="k">Student Name:</div>
                <div className="v">{student.studentName || 'N/A'}</div>
                <div className="k">Faculty:</div>
                <div className="v">{student.faculty || 'N/A'}</div>
                <div className="k">Amount:</div>
                <div className="v">{student.tuition ? `${student.tuition} TL` : 'N/A'}</div>
                {index < unpaidStudents.length - 1 && (
                  <div style={{ gridColumn: '1 / -1', height: '8px' }}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UnpaidList;
