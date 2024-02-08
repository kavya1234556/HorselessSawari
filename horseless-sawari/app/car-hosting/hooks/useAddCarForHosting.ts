import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
enum FuelType {
  DISEL = 'DISEL',
  GAS = 'GAS',
  ELECTRIC = 'ELECTRIC',
}
type optionType = {
  value: string | number;
  label: string;
};
import * as yup from 'yup';
interface ICarType {
  onwerName: string;
  manufacture: string;
  registration_num: number;
  features: optionType[];
  no_of_seats: number;
  fuel_Type: FuelType;
  color: string;
  Total_km: number;
  car_image: string[];
  bluebook_image: string[];
  insurance_image: string[];
  insurance_valid_date: Date;
  pricing_per_hour: number;
  pricing_per_four_hour: number;
  pricing_per_eight_hour: number;
  pricing_per_day: number;
  is_booked: boolean;
  is_verified: boolean;
  user_id: number;
}

const useAddCarForHosting = () => {
  const carSchema = yup.object().shape({
    onwerName: yup.string().required(),
    manufacture: yup.string().required(),
    registration_num: yup.number().required(),
    features: yup
      .mixed()
      .required('Please select a feature')
      .test('empty', 'Please select atleast a feature', (value: any) => {
        if (Number(value.length) > 0) return true;
        return false;
      }),
    no_of_seats: yup.number().required(),
    color: yup.string().required(),
    Total_km: yup.number().required(),
    car_image: yup.array().of(yup.mixed().required()).required(),
    bluebook_image: yup.array().of(yup.mixed().required()).required(),
    insurance_image: yup.array().of(yup.mixed().required()).required(),
    insurance_valid_date: yup.date().required(),
    pricing_per_hour: yup.number().required(),
    pricing_per_four_hour: yup.number().required(),
    pricing_per_eight_hour: yup.number().required(),
    pricing_per_day: yup.number().required(),
    is_booked: yup.bool().required(),
    is_verified: yup.bool().required(),
    fuel_Type: yup.mixed<FuelType>().oneOf(Object.values(FuelType)).required(),
    user_id: yup.number().required(),
  });
  const form = useForm<ICarType>({
    resolver: yupResolver(carSchema) as any,
  });

  return { form };
};

export default useAddCarForHosting;
