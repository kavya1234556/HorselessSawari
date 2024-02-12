import { toast } from '@/components/ui/use-toast';
import { ICarType } from '../page';

const useAddCarForHosting = (user_id: number, role: string) => {
  const formdata = new FormData();
  const submit = async (values: ICarType) => {
    console.log(values);
    formdata.append('onwerName', values.onwerName);
    formdata.append('manufacture', values.manufacture);
    formdata.append('registration_num', String(values.registration_num));
    formdata.append('features', values.features);
    formdata.append('no_of_seats', String(values.no_of_seats));
    formdata.append('color', values.color);
    formdata.append('Total_km', String(values.Total_km));
    values.car_image.forEach((img: any) => {
      console.log(img);
      if (img.file !== null) {
        formdata.append('car_images', img.file);
      } else {
        formdata.append('image_path ', img.image_path);
      }
    });
    values.bluebook_image.forEach((img: any) => {
      if (img.file !== null) {
        formdata.append('bluebook_img', img.file);
      } else {
        formdata.append('image_path', img.image_path);
      }
    });
    values.insurance_image.forEach((img: any) => {
      if (img.file !== null) {
        formdata.append('insurance_img', img.file);
      } else {
        formdata.append('image_path', img.image_path);
      }
    });
    formdata.append('pricing_per_hour', String(values.pricing_per_hour));
    formdata.append(
      'pricing_per_four_hour',
      String(values.pricing_per_four_hour)
    );
    formdata.append(
      'pricing_per_eight_hour',
      String(values.pricing_per_eight_hour)
    );
    formdata.append('pricing_per_day', String(values.pricing_per_day));
    formdata.append('user_id', String(user_id));
    formdata.append('user_role', role);

    try {
      // console.log(formdata);
      const response = await fetch('/api/car', {
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

  return { submit };
};

export default useAddCarForHosting;
