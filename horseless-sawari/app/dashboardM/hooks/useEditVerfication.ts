import { toast } from '@/components/ui/use-toast';

const useEditVerfication = async (id: number) => {
  try {
    console.log('Verification');
    const response = await fetch(`/api/dashboardM?id=${id}`, {
      method: 'PATCH',
    });
    if (response.ok) {
      toast({
        title: 'Success',
        description: 'The hosted Car is Verfifed',
      }),
        window.location.reload();
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Failed to verify');
    }
  } catch (error) {
    console.error('Error while verifying:', error);
    toast({
      title: 'Error',
      description: 'Failed to  verify',
    });
  }
};

export default useEditVerfication;
