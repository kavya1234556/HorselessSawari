import { toast } from '@/components/ui/use-toast';

const useGetCarByCategory = async (id: number) => {
  const response = await fetch(`/api/car/filterByCategoryID?id=${id}`);
  const data = await response.json();
  if (response.ok) {
    if (response.status === 200) {
      toast({
        title: 'Success',
        description: 'Category changed successfully ',
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

export default useGetCarByCategory;
