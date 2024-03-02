import { toast } from '@/components/ui/use-toast';

const useGetCarByCarID = async (id: number) => {
  const response = await fetch(`/api/car/filterBycarID?id=${id}`);
  const data = await response.json();
  if (response.ok) {
    if (response.status === 200) {
      toast({
        title: 'Success',
        description: 'Car fetched successfully ',
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

export default useGetCarByCarID;
