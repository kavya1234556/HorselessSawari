import { toast } from '@/components/ui/use-toast';

const useGetCarByLocation = async (id: number) => {
  const response = await fetch(`/api/car/filterByLocation?id=${id}`);
  const data = await response.json();
  if (response.ok) {
    if (response.status === 200) {
      toast({
        title: 'Success',
        description: 'Location Change successfully ',
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

export default useGetCarByLocation;
