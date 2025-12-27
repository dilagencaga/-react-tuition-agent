import React, { useState } from 'react';
import { saveMessage } from '../services/firestore';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

function PaymentCard({ data, sessionId }) {
  const [loading, setLoading] = useState(false);
  const isPaid = data.amount === 0;

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      const confirmMsg = `Evet, ödeme yap / Yes, pay (Student No: ${data.studentNo})`;
      await saveMessage(sessionId, confirmMsg, 'user', {});

      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: confirmMsg }),
      });

      if (!response.ok) {
        throw new Error('Backend error');
      }

      await response.json();
    } catch (error) {
      console.error('Error confirming payment:', error);
      await saveMessage(sessionId, 'Bir hata oluştu. / An error occurred.', 'bot', {});
    } finally {
      setLoading(false);
    }
  };

  if (isPaid) {
    return (
      <div className="row bot">
        <div className="card">
          <h3>Ödeme Durumu / Payment Status</h3>
          <div className="kv">
            <div className="k">Student No:</div>
            <div className="v">{data.studentNo || 'N/A'}</div>
            <div className="k">Term:</div>
            <div className="v">{data.term || 'N/A'}</div>
          </div>
          <div style={{ padding: '15px', textAlign: 'center', color: '#4caf50', fontWeight: 'bold' }}>
            ✅ Bu harç zaten ödenmiş / This tuition has already been paid
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row bot">
      <div className="card">
        <h3>Ödeme Onayı / Payment Confirmation</h3>
        <div className="kv">
          <div className="k">Student No:</div>
          <div className="v">{data.studentNo || 'N/A'}</div>
          <div className="k">Term:</div>
          <div className="v">{data.term || 'N/A'}</div>
          <div className="k">Amount to Pay:</div>
          <div className="v">{data.amount !== undefined ? `${data.amount} TL` : 'N/A'}</div>
        </div>
        <div className="actions">
          <button className="btn" onClick={handleConfirmPayment} disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentCard;
