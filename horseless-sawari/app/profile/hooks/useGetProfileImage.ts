import { toast } from '@/components/ui/use-toast';

const useGetProfileImage = async (id: number) => {
  const response = await fetch(`/api/profile_image?id=${id}`);
  const data = await response.blob();
  console.log('🚀 ~ useGetProfileImage ~ response:', response);
  if (!response.ok) {
    if (response.status === 404) {
      toast({
        title: 'Info',
        description: 'Sorry could not find your profile image',
      });
    }
  }
  return data;
};

export default useGetProfileImage;
