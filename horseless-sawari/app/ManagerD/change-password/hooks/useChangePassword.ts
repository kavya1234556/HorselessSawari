import { toast } from '@/components/ui/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface IChangePasswordType {
  OldPassword: string;
  NewPassword: string;
}
const useChangePassword = (UserId) => {
  const Schema = yup.object().shape({
    OldPassword: yup.string().required('Old Password is required').min(8),
    NewPassword: yup.string().required('New Password is required').min(8),
  });
  const form = useForm({
    resolver: yupResolver(Schema),
  });
  const submit = async (values: IChangePasswordType) => {
    try {
      console.log(UserId);
      const response = await fetch(`/api/change-password?id=${UserId}`, {
        method: 'POST',
        body: JSON.stringify({
          OldPassword: values.OldPassword,
          NewPassword: values.NewPassword,
        }),
      });
      if (response.status === 400) {
        toast({
          title: 'Error',
          description: 'Error has occurred',
        });
      }
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Password changed successfully',
        });
        form.reset();
        // router.push('/login');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('An error occurred while changing password:', error);
    }
  };
  return { submit, form };
};

export default useChangePassword;
