import { toast } from '@/components/ui/use-toast';

const useGetAllBooking = async () => {
  const response = await fetch('/api/cash-payment');
  const data = await response.json();
  if (response.ok) {
    if (response.status === 200) {
      toast({
        title: 'Success',
      });
    }
  } else {
    toast({
      title: 'Error',
      description: 'Something went wrong',
    });
  }
  return data;
};

export default useGetAllBooking;
