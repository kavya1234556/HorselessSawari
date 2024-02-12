import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export interface IloginType {
  username: string;
  password: string;
}
const loginSchema = yup.object().shape({
  username: yup.string().required('username is required').min(2),
  password: yup.string().required('Password is required').min(8),
});
const getUserEmail = async () => {
  const response = await fetch('/api/auth/session');
  const data = await response.json();
  console.log('🚀 ~ useGetProfileForm ~ data:', data);
  return data;
};
const getUserID = async (email: string) => {
  const response = await fetch(`/api/user?email=${email}`);
  const data = await response.json();
  return data;
};

const useLoginForm = () => {
  const form = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { toast } = useToast();
  const router = useRouter();
  const submit = async (values: IloginType) => {
    // console.log('🚀 ~ file: page.tsx:43 ~ submit ~ values:', values);
    try {
      const loginData = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (loginData?.error) {
        toast({
          title: 'Error',
          description: 'Invalid username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Logged In successfully',
        });
        router.refresh();
        router.push('/?url=login');

        getUserEmail().then((data) => {
          localStorage.setItem('email', data.user.email);
          localStorage.setItem('role', data.user.role);
          getUserID(data.user.email).then((data) => {
            localStorage.setItem('user_id', data.existingUserByEmail.id);
          });
        });
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  return { submit, form };
};

export default useLoginForm;
