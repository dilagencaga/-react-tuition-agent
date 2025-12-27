import React from 'react';

function UnpaidList({ data }) {
  console.log('📋 UnpaidList received data:', data);

  // API may return data in different formats:
  // 1. data.items (actual API format)
  // 2. data.unpaidStudents (expected format)
  // 3. data itself might be an array
  let unpaidStudents = [];

  if (data && Array.isArray(data.items)) {
    unpaidStudents = data.items;
  } else if (Array.isArray(data)) {
    unpaidStudents = data;
  } else if (data && Array.isArray(data.unpaidStudents)) {
    unpaidStudents = data.unpaidStudents;
  }

  // Filter only students with balance > 0
  const studentsWithBalance = unpaidStudents.filter(student => {
    const balance = student.balance ?? student.Balance ?? student.amount ?? student.Amount ?? 0;
    console.log('🔍 Checking student:', student, 'balance:', balance, 'balance > 0:', balance > 0);
    return balance > 0;
  });

  console.log('📋 Filtered students with balance > 0:', studentsWithBalance);

  return (
    <div className="row bot">
      <div className="card">
        <h3>Ödenmemiş Harçlar / Unpaid Tuitions</h3>
        {studentsWithBalance.length === 0 ? (
          <div className="v">Tüm harçlar ödenmiş! / All tuitions paid!</div>
        ) : (
          <div className="kv">
            {studentsWithBalance.map((student, index) => {
              const studentNo = student.studentNo || student.StudentNo || 'N/A';
              const term = student.term || student.Term || 'N/A';
              const balance = student.balance ?? student.Balance ?? student.amount ?? student.Amount ?? 0;

              return (
                <React.Fragment key={index}>
                  <div className="k">Student No:</div>
                  <div className="v">{studentNo}</div>
                  <div className="k">Term:</div>
                  <div className="v">{term}</div>
                  <div className="k">Amount:</div>
                  <div className="v">{balance} TL</div>
                  {index < studentsWithBalance.length - 1 && (
                    <div style={{ gridColumn: '1 / -1', height: '8px' }}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UnpaidList;
