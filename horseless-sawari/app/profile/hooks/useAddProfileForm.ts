import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface IAddProfileType {
  profile_image: any;
  first_name: string;
  last_name: string;
  phone_number: string;
}

const useAddProfileForm = () => {
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
    phone_number: yup.string().max(10).required('A phone number is required'),
  });

  const form = useForm<IAddProfileType>({
    resolver: yupResolver(Schema) as any,
    defaultValues: {
      profile_image: null,
      first_name: '',
      last_name: '',
      phone_number: '',
    },
  });

  return { form };
};

export default useAddProfileForm;
