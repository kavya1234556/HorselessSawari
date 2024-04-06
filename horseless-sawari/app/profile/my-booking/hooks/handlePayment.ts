import React from 'react';

const handlePayment = async (paymentData) => {
  try {
    const response = await fetch('https://khalti.com/api/v2/payment/verify/', {
      method: 'POST',
      headers: {
        Authorization: 'test_secret_key_a4ee6888db1c42a88025a62b0d7b46ed',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    console.log('response', response);

    if (!response.ok) {
      throw new Error('Failed to process payment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

export default handlePayment;
