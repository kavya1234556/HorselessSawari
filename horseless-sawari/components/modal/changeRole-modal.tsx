import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/dropdown';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import Modal from '../ui/modal';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useEditUserRole from '@/app/dashboard/users/hooks/useEditUserRole';

const Role = ['MANAGER', 'USER'];

interface IChangeRole {
  role: string;
}

const ChangeRoleScheme = yup.object().shape({
  role: yup.string(),
});
const ChangeRoleModal = ({ handleToggleModal, open, item }) => {
  const form = useForm({
    resolver: yupResolver(ChangeRoleScheme),
    defaultValues: {
      role: 'USER',
    },
  });
  const handleCLose = () => {
    handleToggleModal();
    window.location.reload();
  };
  const { submit } = useEditUserRole(item.id);

  return (
    <Modal
      title='Change User Role'
      className='font-bold max-w-[300px] h-[50%]'
      isOpen={open}
      onClose={handleCLose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className='p-[16px] flex flex-col gap-8'>
            <div>
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className='w-[180px] bg-white1 h-[40px]'>
                            <SelectValue placeholder='Select Role' />
                          </SelectTrigger>
                          <SelectContent>
                            {Role?.map((item: any, index) => (
                              <SelectItem key={index} value={`${item}`}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className='flex justify-center'>
              <Button type='submit'>Change Role</Button>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ChangeRoleModal;
