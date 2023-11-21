import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

interface ISignUpForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const signUpSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Password must match with password'),
  username: yup.string().required('username is required'),
});

const useSignupForm = ({ handleToggleModal }) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const submit = async (values: ISignUpForm) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Registation Completed',
        });
        handleToggleModal();
        form.reset();
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

export default useSignupForm;
