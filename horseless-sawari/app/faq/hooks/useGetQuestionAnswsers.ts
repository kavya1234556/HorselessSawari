import { toast } from '@/components/ui/use-toast';

const useGetQuestionAnswsers = async () => {
  const response = await fetch('/api/question_answer');
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

export default useGetQuestionAnswsers;
