import { toast } from '@/components/ui/use-toast';

interface ICarType {
  onwerName: string;
  manufacture: string;
  registration_num: number;
  features: string;
  no_of_seats: number;
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
