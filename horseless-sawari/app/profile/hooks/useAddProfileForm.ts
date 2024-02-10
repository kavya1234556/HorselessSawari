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

const useAddProfileForm = (user_id: any) => {
  const Schema = yup.object().shape({
    profile_image: yup
      .mixed()
      .required('Please select a profile image')
      .test('empty', 'Please select a profile image', (value: any) => {
        if (value && value.length > 0) return true;
        return false;
      }),
    first_name: yup.string().required('Required'),
    last_name: yup.string().required('Required'),
    phone_number: yup.string().required('A phone number is required'),
    user_id: yup.number().required('Required'),
  });

  const form = useForm<IProfileType>({
    resolver: yupResolver(Schema) as any,
    defaultValues: {
      profile_image: null,
      first_name: '',
      last_name: '',
      phone_number: '',
      user_id: 0,
    },
  });
  const submit = async (values: IProfileType) => {
    const formdata = new FormData();
    formdata.append('profile_image', values.profile_image[0]);
    formdata.append('first_name', values.first_name);
    formdata.append('last_name', values.last_name);
    formdata.append('phone_number', values.phone_number);
    formdata.append('user_id', String(user_id));
    console.log(formdata);
    try {
      console.log(formdata);
      const response = await fetch('/api/account', {
        method: 'POST',
        body: formdata,
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
          description: 'Your profile is added successfully',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('An error occurred in your Profile', error);
    }
  };

  return { form, submit };
};

export default useAddProfileForm;
