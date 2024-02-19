'use client';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import main from 'public/images/main.png';

export interface IRegistrationType {
  pickUp: string;
  dropOff: string;
  pickUpTime: Date;
  dropOffTime: Date;
}

const RegisterSchema = yup.object().shape({
  pickUp: yup.string().required('username is required').min(2),
  dropOff: yup.string().required('Password is required').min(8),
  pickUpTime: yup.date(),
  dropOffTime: yup.date(),
});

const ReservationPage = () => {
  const form = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  return (
    <div
      style={{
        position: 'relative', // use the src property of the image object
        backgroundImage: `url(${main.src})`,
        // other styles
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '75vh',
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        flexDirection: 'column',
        // zIndex: 9999,
        zIndex: 40,
      }}
    >
      <div className='m-auto text-white sm:text-[33px] text-[20px] p-[27px] font-bold text-center'>
        Unlock freedom, Get on the Road-Share the Adventure.
        <div className='sm:text-[24px] text-[20px] text-white'>
          Budget Nepal Car Rental
        </div>
      </div>
      <div className='w-[90%] m-auto bg-purple'>
        <Form {...form}>
          <div className='pt-[10px] pl-[20px]'>Book a vehicle</div>
          <form>
            <div className='grid grid-cols-2 gap-[20px] p-[20px]'>
              <FormField
                control={form.control}
                name='pickUp'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Enter Pick Up location' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='pickUpTime'
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date('2024-12-20') || date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dropOff'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Enter Drop Off Location'
                        className='w-100%'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dropOff'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ReservationPage;
