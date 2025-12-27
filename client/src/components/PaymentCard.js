import React, { useState } from 'react';
import { saveMessage } from '../services/firestore';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

function PaymentCard({ data, sessionId }) {
  const [loading, setLoading] = useState(false);

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

  const handleCancelPayment = async () => {
    setLoading(true);
    try {
      const cancelMsg = `Hayır, iptal / No, cancel (Student No: ${data.studentNo})`;
      await saveMessage(sessionId, cancelMsg, 'user', {});

      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: cancelMsg }),
      });

      if (!response.ok) {
        throw new Error('Backend error');
      }

      await response.json();
    } catch (error) {
      console.error('Error canceling payment:', error);
      await saveMessage(sessionId, 'Bir hata oluştu. / An error occurred.', 'bot', {});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row bot">
      <div className="card">
        <h3>Ödeme Onayı / Payment Confirmation</h3>
        <div className="kv">
          <div className="k">Student No:</div>
          <div className="v">{data.studentNo}</div>
          <div className="k">Student Name:</div>
          <div className="v">{data.studentName || 'N/A'}</div>
          <div className="k">Faculty:</div>
          <div className="v">{data.faculty || 'N/A'}</div>
          <div className="k">Amount to Pay:</div>
          <div className="v">{data.tuition ? `${data.tuition} TL` : 'N/A'}</div>
        </div>
        <div className="actions">
          <button className="btn" onClick={handleConfirmPayment} disabled={loading}>
            {loading ? 'İşleniyor... / Processing...' : 'Evet / Yes'}
          </button>
          <button className="btn" onClick={handleCancelPayment} disabled={loading}>
            Hayır / No
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentCard;
