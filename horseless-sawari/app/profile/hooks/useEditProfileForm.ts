import { toast } from '@/components/ui/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface IProfileType {
  profile_image: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  user_id: number;
}

const useEditProfileForm = (user_id: any) => {
  const update = async (values: IProfileType) => {
    const formdata = new FormData();
    formdata.append('profile_image', values.profile_image[0]);
    formdata.append('first_name', values.first_name);
    formdata.append('last_name', values.last_name);
    formdata.append('phone_number', values.phone_number);
    formdata.append('user_id', String(user_id));
    try {
      console.log(formdata);
      const response = await fetch('/api/account', {
        method: 'PUT',
        // headers: {
        //   'Content-Type': 'multipart/form-data;boundary=None',
        // },
        body: formdata,
      });
      console.log(response);
      if (response.status === 400) {
        toast({
          title: 'Error',
          description: 'Error has occurred',
        });
      }
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Your profile is updated successfully',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('An error occurred in your Profile', error);
    }
  };

  return { update };
};

export default useEditProfileForm;
