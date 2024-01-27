import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export interface IForgetPasswordType {
  email: string;
}
const Schema = yup.object().shape({
  email: yup.string().required('Please provide your email'),
});
const useForgetPasswordForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: yupResolver(Schema),
  });
  const { toast } = useToast();
  const submit = async (values: IForgetPasswordType) => {
    console.log('🚀 ~ submit ~ values:', values);
    try {
      const response = await fetch('/api/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
        }),
      });
      console.log(
        '🚀 ~ file: useSignupForm.ts:51 ~ submit ~ response:',
        response
      );
      if (response.status === 400) {
        toast({
          title: 'Error',
          description: 'User with this email is not registered',
        });
      }
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Email Sent Successfully',
        });
        form.reset();
        router.push('/login');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      // Handle unexpected errors, e.g., show a generic error message to the user
    }
  };
  return { form, submit };
};

export default useForgetPasswordForm;
