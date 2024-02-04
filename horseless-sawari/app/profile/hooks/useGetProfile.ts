import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const useGetProfileForm = async (id: number) => {
  const response = await fetch(`/api/profile?id=${id}`);
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 404) {
      toast({
        title: 'Info',
        description: 'Please update your profile ',
      });
    }
  }
  return data;
};

export default useGetProfileForm;
