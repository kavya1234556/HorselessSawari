import { toast } from '@/components/ui/use-toast';

const useGetUserBooking = async (id: number) => {
  const response = await fetch(`/api/my-booking?user_id=${id}`);
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

export default useGetUserBooking;
