import { toast } from '@/components/ui/use-toast';

const useDeleteBooking = async (id: Number) => {
  try {
    console.log('Booking');
    const response = await fetch(`/api/car-booking?booking_id=${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      toast({
        title: 'Success',
        description: 'Your booking has been cancelled',
      });
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Failed to cancel booking');
    }
  } catch (error) {
    console.error('Error cancelling booking:', error);
    toast({
      title: 'Error',
      description: 'Failed to cancel booking',
    });
  }
};

export default useDeleteBooking;
