import { toast } from '@/components/ui/use-toast';

const useGetLocation = async () => {
  const response = await fetch('/api/car/location');
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 404) {
      toast({
        title: 'error',
        description: 'Location fetching unsuccesfully ',
      });
    }
  }
  return data;
};

export default useGetLocation;
