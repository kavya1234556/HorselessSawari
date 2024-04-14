import { toast } from '@/components/ui/use-toast';

const useDeleteQuestion = async (id: Number) => {
  try {
    const response = await fetch(`/api/question?id=${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      toast({
        title: 'Success',
        description: 'Question has been deleted',
      });
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Failed to delete question');
    }
  } catch (error) {
    console.error('Error while deleteing question:', error);
    toast({
      title: 'Error',
      description: 'Failed to  delete question ',
    });
  }
};

export default useDeleteQuestion;
