import { toast } from '@/components/ui/use-toast';

const useGetCatagory = async () => {
  const response = await fetch('/api/car/category');
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 404) {
      toast({
        title: 'error',
        description: 'Categories fetching unsuccesfully ',
      });
    }
  }
  return data;
};

export default useGetCatagory;
