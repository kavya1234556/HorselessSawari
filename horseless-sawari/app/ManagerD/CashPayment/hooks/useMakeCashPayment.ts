import { toast } from '@/components/ui/use-toast';

const useMakeCashPayment = async (values) => {
  try {
    const response = await fetch('/api/cash-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        car_booking_id: values.booked_car_id,
        user_id: values.user_id,
        total_amount: values.totalPrice,
      }),
    });
    if (response.status === 400) {
      toast({
        title: 'Error',
        description: 'Error has occurred',
      });
    }
    if (response.ok) {
      toast({
        title: 'Success',
        description: 'Cash payment is successfull',
      });
      window.location.reload();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
  } catch (e) {
    console.error('An error occurred while making payment', e);
  }
};

export default useMakeCashPayment;
