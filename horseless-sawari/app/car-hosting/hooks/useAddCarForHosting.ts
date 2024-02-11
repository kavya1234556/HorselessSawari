import { toast } from '@/components/ui/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

// type optionType = {
//   value: string | number;
//   label: string;
// };
import * as yup from 'yup';
interface ICarType {
  onwerName: string;
  manufacture: string;
  registration_num: number;
  features: string;
  no_of_seats: number;
  // fuel_Type: FuelType;
  color: string;
  Total_km: number;
  car_image: [];
  bluebook_image: [];
  insurance_image: [];
  pricing_per_hour: number;
  pricing_per_four_hour: number;
  pricing_per_eight_hour: number;
  pricing_per_day: number;
  is_booked: boolean;
  is_verified: boolean;
  user_id: number;
  user_role: string;
}

const useAddCarForHosting = (user_id: number) => {
  // const carSchema = yup.object().shape({
  //   onwerName: yup.string().required(),
  //   manufacture: yup.string().required(),
  //   registration_num: yup.number().required('Registration number is required'),
  //   features: yup.string().required(),
  //   no_of_seats: yup.number().required(),
  //   color: yup.string().required(),
  //   Total_km: yup.number().required(),
  //   car_image: yup
  //     .mixed()
  //     .required('Please select car images')
  //     .test('empty', 'Please select atleast 5 image', (value: any) => {
  //       if (Number(value.length) > 0) return true;
  //       return false;
  //     }),
  //   bluebook_image: yup
  //     .mixed()
  //     .required('Please select bluebook image')
  //     .test('empty', 'Please select atleast 2 image', (value: any) => {
  //       if (Number(value.length) > 0) return true;
  //       return false;
  //     }),
  //   insurance_image: yup
  //     .mixed()
  //     .required('Please select insurance image')
  //     .test('empty', 'Please select insurance image', (value: any) => {
  //       if (Number(value.length) > 0) return true;
  //       return false;
  //     }),
  //   pricing_per_hour: yup.number().required(),
  //   pricing_per_four_hour: yup.number().required(),
  //   pricing_per_eight_hour: yup.number().required(),
  //   pricing_per_day: yup.number().required(),
  //   is_booked: yup.bool().required(),
  //   is_verified: yup.bool().required(),
  //   fuel_Type: yup
  //     .mixed<FuelType>()
  //     .oneOf(Object.values(FuelType))
  //     .required('Fuel Type'),
  //   user_id: yup.number().required(),
  //   user_role: yup.string().required(),
  // });

  const submit = async (values: ICarType) => {
    console.log(values);
    try {
      // console.log(formdata);
      const response = await fetch('/api/car', {
        method: 'POST',
        // body: formdata,
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

  return { submit };
};

export default useAddCarForHosting;
